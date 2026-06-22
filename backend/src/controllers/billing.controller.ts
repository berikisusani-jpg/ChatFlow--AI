import { Request, Response } from 'express';
import Stripe from 'stripe';
import { prisma } from '../config/db';
import { PlanTier } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { priceId } = req.body;
  const user = (req as any).user;

  try {
    const org = await prisma.organization.findUnique({
        where: { id: user.organizationId },
        include: { subscription: true }
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/dashboard/billing?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard/billing?canceled=true`,
      customer: org?.subscription?.stripeId || undefined,
      client_reference_id: user.organizationId
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(400).json({ message: 'Stripe session creation failed' });
  }
};

export const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_WEBHOOK_SECRET || '');
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await prisma.subscription.update({
        where: { organizationId: session.client_reference_id as string },
        data: {
            stripeId: session.customer as string,
            status: 'ACTIVE',
            plan: PlanTier.PRO // Example
        }
    });
  }

  res.json({ received: true });
};

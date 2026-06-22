import { Router } from 'express';
import { createCheckoutSession, handleWebhook } from '../controllers/billing.controller';
import { authMiddleware } from '../middleware/auth';
import { tenantMiddleware } from '../middleware/tenant';
import { requirePermission } from '../middleware/rbac';
import express from 'express';

const router = Router();

// Webhook needs raw body
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

router.post('/checkout', authMiddleware, tenantMiddleware, requirePermission('manage_billing'), createCheckoutSession);

export default router;

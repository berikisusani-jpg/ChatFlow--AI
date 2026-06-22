import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db';
import { config } from '../config';

export const signup = async (req: Request, res: Response) => {
  const { email, password, name, organizationName } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.$transaction(async (tx) => {
      const org = await tx.organization.create({
        data: {
          name: organizationName || `${name}'s Organization`,
          subscription: {
            create: { plan: 'free' }
          }
        }
      });

      return tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          organizationId: org.id
        }
      });
    });

    const token = jwt.sign({ id: user.id, organizationId: user.organizationId }, config.jwtSecret);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: 'User already exists or invalid data' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, organizationId: user.organizationId }, config.jwtSecret);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

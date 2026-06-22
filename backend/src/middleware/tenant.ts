import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    organizationId: string;
    role: string;
  };
}

export const tenantMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  if (!user || !user.organizationId) {
    return res.status(403).json({ message: 'No organization context found' });
  }

  // Inject organization filter helper into request
  (req as any).tenantFilter = { organizationId: user.organizationId };

  next();
};

export const validateOwnership = (model: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = (req as any).user;

    try {
      const resource = await model.findFirst({
        where: {
          id,
          organizationId: user.organizationId
        }
      });

      if (!resource) {
        return res.status(404).json({ message: 'Resource not found or unauthorized' });
      }

      (req as any).resource = resource;
      next();
    } catch (error) {
      res.status(500).json({ message: 'Server error during ownership validation' });
    }
  };
};

import { Router } from 'express';
import { getDashboardAnalytics } from '../controllers/analytics.controller';
import { authMiddleware } from '../middleware/auth';
import { tenantMiddleware } from '../middleware/tenant';
import { requirePermission } from '../middleware/rbac';

const router = Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

router.get('/dashboard', requirePermission('view_analytics'), getDashboardAnalytics);

export default router;

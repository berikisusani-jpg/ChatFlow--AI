import { Router } from 'express';
import { getOrg, updateOrg } from '../controllers/org.controller';
import { authMiddleware } from '../middleware/auth';
import { tenantMiddleware } from '../middleware/tenant';
import { requirePermission } from '../middleware/rbac';

const router = Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

router.get('/', requirePermission('view_analytics'), getOrg);
router.put('/', requirePermission('manage_workspace'), updateOrg);

export default router;

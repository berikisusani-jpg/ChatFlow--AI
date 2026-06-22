import { Router } from 'express';
import { createApiKey, listApiKeys } from '../controllers/dev.controller';
import { authMiddleware } from '../middleware/auth';
import { tenantMiddleware } from '../middleware/tenant';
import { requirePermission } from '../middleware/rbac';

const router = Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

router.post('/keys', requirePermission('manage_workspace'), createApiKey);
router.get('/keys', requirePermission('manage_workspace'), listApiKeys);

export default router;

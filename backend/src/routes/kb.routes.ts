import { Router } from 'express';
import { uploadKB, listKB, deleteKB } from '../controllers/kb.controller';
import { authMiddleware } from '../middleware/auth';
import { tenantMiddleware } from '../middleware/tenant';
import { requirePermission } from '../middleware/rbac';

const router = Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

router.post('/', requirePermission('manage_kb'), uploadKB);
router.get('/', requirePermission('manage_kb'), listKB);
router.delete('/:id', requirePermission('manage_kb'), deleteKB);

export default router;

import { Router } from 'express';
import { listConversations, getConversationMessages } from '../controllers/inbox.controller';
import { authMiddleware } from '../middleware/auth';
import { tenantMiddleware } from '../middleware/tenant';
import { requirePermission } from '../middleware/rbac';

const router = Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

router.get('/conversations', requirePermission('view_analytics'), listConversations);
router.get('/conversations/:id', requirePermission('view_analytics'), getConversationMessages);

export default router;

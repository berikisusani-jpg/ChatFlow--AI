import { Router } from 'express';
import { createAgent, listAgents, getAgent, updateAgent, deleteAgent } from '../controllers/agent.controller';
import { logAuditAction } from '../middleware/audit';
import { authMiddleware } from '../middleware/auth';
import { tenantMiddleware } from '../middleware/tenant';
import { requirePermission } from '../middleware/rbac';
import { checkUsageLimit } from '../middleware/usage';

const router = Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

router.post('/', requirePermission('create_agent'), checkUsageLimit('agents'), logAuditAction('CREATE_AGENT'), createAgent);
router.get('/', requirePermission('view_analytics'), listAgents);
router.get('/:id', requirePermission('view_analytics'), getAgent);
router.put('/:id', requirePermission('create_agent'), updateAgent);
router.delete('/:id', requirePermission('delete_agent'), logAuditAction('DELETE_AGENT'), deleteAgent);

export default router;

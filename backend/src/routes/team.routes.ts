import { Router } from 'express';
import { inviteUser, listMembers, removeMember, updateMemberRole } from '../controllers/team.controller';
import { authMiddleware } from '../middleware/auth';
import { tenantMiddleware } from '../middleware/tenant';
import { requirePermission } from '../middleware/rbac';

const router = Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

router.get('/members', requirePermission('manage_users'), listMembers);
router.post('/invite', requirePermission('manage_users'), inviteUser);
router.delete('/members/:id', requirePermission('manage_users'), removeMember);
router.put('/members/:id/role', requirePermission('manage_users'), updateMemberRole);

export default router;

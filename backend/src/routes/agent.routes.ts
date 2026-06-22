import { Router } from 'express';
import { createAgent, listAgents } from '../controllers/agent.controller';
import { authMiddleware } from '../middleware/auth';
const router = Router();

router.use(authMiddleware);
router.post('/', createAgent);
router.get('/', listAgents);

export default router;

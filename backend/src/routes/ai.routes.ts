import { Router } from 'express';
import { handleChat, handleSuggestions, handleSummary, handleLeadAnalysis } from '../controllers/ai.controller';
import { checkUsageLimit } from '../middleware/usage';
import { authMiddleware } from '../middleware/auth';
const router = Router();

router.use(authMiddleware);
router.post('/chat', checkUsageLimit('messages'), handleChat);
router.post('/suggestions', handleSuggestions);
router.post('/summary', handleSummary);
router.post('/lead-analysis', handleLeadAnalysis);

export default router;

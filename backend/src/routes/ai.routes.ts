import { Router } from 'express';
import { handleChat, handleSuggestions, handleSummary, handleLeadAnalysis } from '../controllers/ai.controller';
import { authMiddleware } from '../middleware/auth';
const router = Router();

router.use(authMiddleware);
router.post('/chat', handleChat);
router.post('/suggestions', handleSuggestions);
router.post('/summary', handleSummary);
router.post('/lead-analysis', handleLeadAnalysis);

export default router;

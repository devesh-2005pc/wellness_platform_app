import express from 'express';
import {
  getPublicSessions,
  getUserSessions,
  getSessionById,
  saveDraft,
  publishSession,
  getSessionStats // ✅ ADD THIS
} from '../controllers/sessionController.js';


import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/sessions', getPublicSessions);
router.get('/my-sessions', authMiddleware, getUserSessions);
router.get('/my-sessions/:id', authMiddleware, getSessionById);
router.post('/my-sessions/save-draft', authMiddleware, saveDraft);
router.post('/my-sessions/publish', authMiddleware, publishSession);
router.get('/sessions/stats', authMiddleware, getSessionStats);

export default router;

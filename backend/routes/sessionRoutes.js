import express from 'express';
const router = express.Router();

import {
  getPublicSessions,
  getUserSessions,
  getSessionById,
  saveDraft,
  publishSession,
  getSessionStats
} from '../controllers/sessionController.js';

import authMiddleware from '../middleware/authMiddleware.js';

// Public sessions
router.get('/public', getPublicSessions);

// User-specific (authenticated) sessions
router.get('/user', authMiddleware, getUserSessions);
router.get('/stats', authMiddleware, getSessionStats);
router.get('/:id', authMiddleware, getSessionById);
router.post('/save', authMiddleware, saveDraft);
router.post('/publish', authMiddleware, publishSession);

export default router;

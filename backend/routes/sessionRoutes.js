const express = require('express');
const {
  getPublicSessions,
  getUserSessions,
  getSessionById,
  saveDraft,
  publishSession,
  getSessionStats,
} = require('../controllers/sessionController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/sessions', getPublicSessions);
router.get('/my-sessions', authMiddleware, getUserSessions);
router.get('/my-sessions/:id', authMiddleware, getSessionById);
router.post('/my-sessions/save-draft', authMiddleware, saveDraft);
router.post('/my-sessions/publish', authMiddleware, publishSession);
router.get('/sessions/stats', authMiddleware, getSessionStats);

module.exports = router;

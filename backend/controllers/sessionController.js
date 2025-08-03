import Session from '../models/Session.js';

// Get all public (published) sessions
export const getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'published' });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch public sessions' });
  }
};

// Get all sessions of the authenticated user
export const getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user.id });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user sessions' });
  }
};

// Get a specific session by ID (only if belongs to user)
export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching session' });
  }
};

// Save or update a draft session
export const saveDraft = async (req, res) => {
  try {
    const { title, tags, json_file_url, _id } = req.body;
    const update = {
      title,
      tags,
      json_file_url,
      updated_at: new Date(),
      status: 'draft',
      user_id: req.user.id
    };

    let session;
    if (_id) {
      session = await Session.findOneAndUpdate({ _id, user_id: req.user.id }, update, { new: true });
    } else {
      session = await Session.create(update);
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save draft' });
  }
};

// Publish a draft session
export const publishSession = async (req, res) => {
  try {
    const { _id } = req.body;
    const session = await Session.findOneAndUpdate(
      { _id, user_id: req.user.id },
      { status: 'published', updated_at: new Date() },
      { new: true }
    );
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Failed to publish session' });
  }
};
export const getSessionStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const total = await Session.countDocuments({ user_id: userId });
    const drafts = await Session.countDocuments({ user_id: userId, status: 'draft' });
    const published = await Session.countDocuments({ user_id: userId, status: 'published' });

    res.json({ total, drafts, published });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch session stats' });
  }
};import express from 'express';



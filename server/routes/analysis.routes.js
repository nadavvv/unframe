const express = require('express');
const router = express.Router();
const analysisService = require('../services/analysis.service');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { query, emails } = req.body;
    const analysis = await analysisService.analyzeEmails(query, emails);
    res.json({ analysis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
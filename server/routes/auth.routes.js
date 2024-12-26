const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');

router.get('/google', async (req, res) => {
  try {
    const user = await authService.authenticateGoogle();
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

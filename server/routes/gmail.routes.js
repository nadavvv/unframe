const express = require('express');
const router = express.Router();
const gmailService = require('../services/gmail.service');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const emails = await gmailService.listEmails(req.user?.id, req.query);    
    res.json({
        emails,
        nextPageToken: emails[0].page
    });  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const email = await gmailService.getEmail(req.user?.id, req.params.id);
    res.json(email);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await gmailService.deleteEmail(req.user.id, req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
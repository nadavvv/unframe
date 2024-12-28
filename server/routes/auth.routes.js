const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');

router.get('/google', async (req, res) => {
    try {
        const authUrl = await authService.authenticateGoogle();
        res.redirect(authUrl);
    } catch (error) {
        console.log(error);
        res.redirect('http://localhost:5173/login');
    }
});

router.get('/callback', async (req, res) => {
    try {
        const { code } = req.query;
        const user = await authService.handleCallback(code);
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        res.redirect(`http://localhost:5173/?token=${token}`);
    } catch (error) {
        console.log(error);
        res.redirect('http://localhost:5173/login');
    }
});

module.exports = router;
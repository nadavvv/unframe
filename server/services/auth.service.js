const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const User = require('../models/user');


class AuthService {
    async authenticateGoogle() {
        const oauth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI  // Update with your backend callback URL
        );

        // Generate the url that will be used for authorization
        const authorizeUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/gmail.modify',
                'https://www.googleapis.com/auth/userinfo.email',
                'openid',
                'email'
            ],
            prompt: 'consent'
        });

        return authorizeUrl;
    }

    async handleCallback(code) {
        const oauth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI  // Same as above
        );

        // Get tokens using the code
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // Get user info
        const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
        const userInfo = await oauth2.userinfo.get();

        // Check if user exists
        let user = await User.findOne({ where: { email: userInfo.data.email } });

        if (!user) {
            user = await User.create({
                email: userInfo.data.email,
                googleTokens: tokens
            });
        } else {
            user.googleTokens = tokens;
            await user.save();
        }

        return user;
    }
}

module.exports = new AuthService();
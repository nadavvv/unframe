const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const path = require('path');
const User = require('../models/user');

class AuthService {
    async authenticateGoogle() {
        const auth = await authenticate({
          keyfilePath: path.join(__dirname, '../../credentials.json'),
          scopes: [
            'https://www.googleapis.com/auth/gmail.modify',
            'https://www.googleapis.com/auth/userinfo.email'
          ],
          port: 3001
        });
    
        // Get user email using OAuth2
        const oauth2Client = google.oauth2({ version: 'v2', auth });
        const userInfo = await oauth2Client.userinfo.get();
        
        // Check if user exists
        let user = await User.findOne({ where: { email: userInfo.data.email } });
        
        if (!user) {
          user = await User.create({
            email: userInfo.data.email,
            googleTokens: auth.credentials
          });
        } else {
          // Update existing user's tokens
          user.googleTokens = auth.credentials;
          await user.save();
        }
    
        return user;
      }

  async getUser(userId) {
    return User.findByPk(userId);
  }
}

module.exports = new AuthService();

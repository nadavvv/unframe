const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');
const path = require('path');
const User = require('../models/user');

class GmailService {
    async getGmailClient(userId) {
        const user = await User.findByPk(userId);
        if (!user || !user.googleTokens) {
            throw new Error('User not authenticated');
        }
        const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];

           const auth = await authenticate({
               keyfilePath: path.join(__dirname, 'credentials.json'),
               scopes: SCOPES,
               port: 3001 
             });

            return google.gmail({ version: 'v1', auth });
          }

    async listEmails(userId, params = {}) {
        const gmail = await this.getGmailClient(userId);
        const response = await gmail.users.messages.list({
            userId: 'me',
            ...params
        });

        return Promise.all(response.data.messages.map(async (message) => {
            const email = await gmail.users.messages.get({
                userId: 'me',
                id: message.id,
                format: 'metadata',
                metadataHeaders: ['From', 'Subject', 'Date']
            });

            return {
                id: email.data.id,
                sender: email.data.payload.headers.find(h => h.name === 'From')?.value,
                subject: email.data.payload.headers.find(h => h.name === 'Subject')?.value,
                date: email.data.payload.headers.find(h => h.name === 'Date')?.value,
                size: email.data.sizeEstimate,
                page: response.data.nextPageToken
            };
        }));
    }

    async getEmail(userId, emailId) {
        const gmail = await this.getGmailClient(userId);
        const email = await gmail.users.messages.get({
            userId: 'me',
            id: emailId,
            format: 'full'
        });


        let body = '';
        if (email.data.payload.parts) {
            body = email.data.payload.parts.find(part => part.mimeType === 'text/plain')?.body?.data;
        } else if (email.data.payload.body?.data) {
            body = email.data.payload.body.data;
        }

        return {
            id: email.data.id,
            body: body ? Buffer.from(body, 'base64').toString() : '',
            headers: email.data.payload.headers
        };
    }

    async deleteEmail(userId, emailId) {
        const gmail = await this.getGmailClient(userId);
        await gmail.users.messages.trash({
            userId: 'me',
            id: emailId
        });
        return { success: true };
    }
}

module.exports = new GmailService();
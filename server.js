// require('dotenv').config();
// const express = require('express');
// const { google } = require('googleapis');
// const { authenticate } = require('@google-cloud/local-auth');
// const OpenAI = require('openai');
// const path = require('path');
// const cors = require('cors');  

// const app = express();
// app.use(cors({
//   origin: 'http://localhost:5173', // This is Vite's default port
//   credentials: true
// }));
// app.use(express.json());

//   const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // Authentication middleware
// async function getGmailClient() {
//   const auth = await authenticate({
//     keyfilePath: path.join(__dirname, 'credentials.json'),
//     scopes: SCOPES,
//     port: 3001 
//   });
//   return google.gmail({ version: 'v1', auth });
// }

// // Email fetching with metadata
// app.get('/api/emails', async (req, res) => {  
//   try {    
//     const gmail = await getGmailClient();
//     const { after, maxResults = 10, pageToken } = req.query;
    
    
//     let query = '';
//     if (after) {
//       query = `after:${after}`;
//     }

//     const response = await gmail.users.messages.list({
//       userId: 'me',
//       q: query,
//       maxResults,
//       pageToken
//     });

//     const emails = await Promise.all(response.data.messages.map(async (message) => {
//       const email = await gmail.users.messages.get({
//         userId: 'me',
//         id: message.id,
//         format: 'metadata',
//         metadataHeaders: ['From', 'Subject', 'Date']
//       });
      
//       return {
//         id: email.data.id,
//         sender: email.data.payload.headers.find(h => h.name === 'From')?.value,
//         subject: email.data.payload.headers.find(h => h.name === 'Subject')?.value,
//         date: email.data.payload.headers.find(h => h.name === 'Date')?.value,
//         size: email.data.sizeEstimate
//       };
//     }));

//     res.json({
//       emails,
//       nextPageToken: response.data.nextPageToken
//     });
//   } catch (error) {
//     console.log(error);
    
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get single email with body
// app.get('/api/emails/:id', async (req, res) => {
//   try {
//     const gmail = await getGmailClient();
//     const email = await gmail.users.messages.get({
//       userId: 'me',
//       id: req.params.id,
//       format: 'full'
//     });
    
//     const body = Buffer.from(email.data.payload.body.data, 'base64').toString();
//     res.json({
//       id: email.data.id,
//       body,
//       headers: email.data.payload.headers
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Delete email
// app.delete('/api/emails/:id', async (req, res) => {
//   try {
//     const gmail = await getGmailClient();
//     await gmail.users.messages.trash({
//       userId: 'me',
//       id: req.params.id
//     });
//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // AI analysis endpoint
// app.post('/api/analyze', async (req, res) => {
//   try {
//     const { query, emails } = req.body;
    
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4-turbo-preview",
//       messages: [
//         {
//           role: "system",
//           content: "Analyze the provided email data and answer the user's query."
//         },
//         {
//           role: "user",
//           content: `Given these emails: ${JSON.stringify(emails)}\n\nQuery: ${query}`
//         }
//       ]
//     });

//     res.json({ analysis: completion.choices[0].message.content });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
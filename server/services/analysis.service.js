const OpenAI = require('openai');

class AnalysisService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async analyzeEmails(query, emails) {
    const completion = await this.openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "Analyze the provided email data and answer the user's query."
        },
        {
          role: "user",
          content: `Given these emails: ${JSON.stringify(emails)}\n\nQuery: ${query}`
        }
      ]
    });

    return completion.choices[0].message.content;
  }
}

module.exports = new AnalysisService();
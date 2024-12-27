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
                    content: `You are an email analytics assistant that provides clear, well-formatted responses.
                    Guidelines for your responses:
                    - Format numbers naturally (e.g., "11 emails" instead of just "11")
                    - Remove email addresses and technical IDs from the response
                    - Use proper paragraphs with line breaks for readability 
                    - For statistics, present them in a clear narrative form
                    - When listing items, format them cleanly:
                    - "YouTube sent 11 emails"
                    - "LinkedIn sent 8 emails"
                    - Use clear transitions between different points
                    - For comparisons, use natural language like "followed by" or "after that"
                    - Round percentages to one decimal point
                    - Avoid technical jargon unless specifically asked
                    Always structure your response as a proper analysis that a non-technical person would understand.`
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
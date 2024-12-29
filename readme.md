# Email Dashboard

A modern web application built with Vue.js and Node.js that allows users to manage their Gmail inbox, including viewing, analyzing, and deleting emails. The application features Google OAuth authentication, email analytics powered by GPT-4, and a responsive user interface.

## Features

- 🔐 Google OAuth Authentication
- 📧 Gmail Integration
- 📊 AI-Powered Email Analytics
- 🗑️ Email Management (view, delete)
- 📅 Date-based Filtering
- 🎨 Modern UI with Tailwind CSS
- 🔔 Toast Notifications

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- PostgreSQL (v12.0 or higher)

You'll also need:
- A Google Cloud Platform account with Gmail API enabled
- An OpenAI API key for the analytics feature

## Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
FRONTEND_URL=http://localhost:5173

# Database Configuration
attached in the email

# Authentication
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
```

## Project Setup

1. Clone the repository:
```bash
git clone https://github.com/nadavvv/unframe.git
cd unframe
```

2. Install dependencies:
```bash
npm install
```


## Running the Application

1. Start the backend server:
```bash
npm run server
```

2. In a new terminal, start the frontend development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`
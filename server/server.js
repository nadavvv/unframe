require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const gmailRoutes = require('./routes/gmail.routes');
const authMiddleware = require('./middleware/auth.middleware');


const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/emails', authMiddleware, gmailRoutes);

sequelize.sync().then(() => {
  console.log('Database synchronized');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
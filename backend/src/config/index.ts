import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'super-secret-key',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  databaseUrl: process.env.DATABASE_URL || '',
};

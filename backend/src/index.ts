import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from './config';
import { initSentry, sentryErrorHandler } from './config/sentry';
import authRoutes from './routes/auth.routes';
import aiRoutes from './routes/ai.routes';
import agentRoutes from './routes/agent.routes';
import kbRoutes from './routes/kb.routes';
import orgRoutes from './routes/org.routes';
import teamRoutes from './routes/team.routes';
import billingRoutes from './routes/billing.routes';
import analyticsRoutes from './routes/analytics.routes';
import inboxRoutes from './routes/inbox.routes';
import devRoutes from './routes/dev.routes';
import { apiKeyMiddleware } from './middleware/apikey';
import { prisma } from './config/db';
import { connectRedis } from './config/redis';

const app = express();
initSentry(app);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }
});

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https://api.dicebear.com"],
            connectSrc: ["'self'", "https://api.openai.com", "https://generativelanguage.googleapis.com"]
        }
    }
}));
app.use(cors());

app.use((req, res, next) => {
  if (req.originalUrl === '/api/billing/webhook') {
    next();
  } else {
    express.json({ limit: '10mb' })(req, res, next);
  }
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);
app.use('/api/', apiKeyMiddleware);

app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/kb', kbRoutes);
app.use('/api/org', orgRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/inbox', inboxRoutes);
app.use('/api/dev', devRoutes);

sentryErrorHandler(app);

io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => socket.join(roomId));
  socket.on('send-message', async (data) => {
    const { roomId, text, role } = data;
    try {
      await prisma.message.create({
        data: { text, role, conversationId: roomId }
      });
      io.to(roomId).emit('new-message', data);
    } catch (e) {
      console.error('Socket persistence error', e);
    }
  });
});

const start = async () => {
    try {
        await connectRedis();
        httpServer.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    } catch (error) {
        console.error('Startup failed', error);
    }
};

start();

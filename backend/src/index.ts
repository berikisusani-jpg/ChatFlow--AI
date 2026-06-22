import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from './config';
import authRoutes from './routes/auth.routes';
import aiRoutes from './routes/ai.routes';
import agentRoutes from './routes/agent.routes';
import { prisma } from './config/db';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }
});

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/agents', agentRoutes);

// Real-time logic
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

httpServer.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

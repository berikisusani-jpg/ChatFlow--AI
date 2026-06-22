import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class SocketService {
  socket: any;

  connect() {
    this.socket = io(SOCKET_URL);
  }

  on(event: string, callback: any) {
    this.socket.on(event, callback);
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  disconnect() {
    if (this.socket) this.socket.disconnect();
  }
}

export const socketService = new SocketService();

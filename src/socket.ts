import { Server, Socket } from 'socket.io';
import { ChatMessage, TypingStatus } from './types';

// Define the Map for chat messages
const chatMessages = new Map<string, ChatMessage>();

const connectedClients = new Map<string, Socket>();

const handleSocketConnection = (socket: Socket, io: Server) => {
  console.log('A user connected');

  connectedClients.set(socket.id, socket);

  socket.on('join', (room: string) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('message', (data: ChatMessage) => {
    console.log('Received message:', data);
    chatMessages.set(data.id, data);
    broadcastMessage(data, io);
  });

  socket.on('typing', (typingStatus: TypingStatus) => {
    console.log('Typing status:', typingStatus);
    broadcastTypingStatus(typingStatus, io);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    connectedClients.delete(socket.id);
  });
};

const broadcastMessage = (message: ChatMessage, io: Server) => {
  io.emit('message', message);
};

const broadcastTypingStatus = (typingStatus: TypingStatus, io: Server) => {
  io.emit('typing', typingStatus);
};

export { handleSocketConnection };

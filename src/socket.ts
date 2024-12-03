import { Server, Socket } from 'socket.io';
import { ChatMessage, TypingStatus } from './types';

export interface ChatMessage {
  id: string;
  text: string;
  room: string; // Add this property
  sender: string;
  timestamp: string;
  image?: string; // Optional property for image
}

export interface TypingStatus {
  room: string; // Add this property
  user: string;
  typing: boolean;
}


// Define the Map for chat messages
const chatMessages = new Map<string, ChatMessage>();

const connectedClients = new Map<string, Socket>();

const isAllowedRoom = (room: string): boolean => {
  return room === "hari1209";
};

const handleSocketConnection = (socket: Socket, io: Server) => {
  console.log('A user connected');

  connectedClients.set(socket.id, socket);

  socket.on('join', (room: string) => {
    if (isAllowedRoom(room)) {
      socket.join(room);
      console.log(`User joined room: ${room}`);
    } else {
      console.log(`Access denied for room: ${room}`);
      socket.disconnect(); // Optionally disconnect unauthorized users
    }
  });

  socket.on('message', (data: ChatMessage) => {
    if (isAllowedRoom(data.room)) {
      chatMessages.set(data.id, data);
      broadcastMessage(data, io);
    } else {
      console.log(`Message not sent: Unauthorized room ${data.room}`);
    }
  });

  socket.on('typing', (typingStatus: TypingStatus) => {
    if (isAllowedRoom(typingStatus.room)) {
      broadcastTypingStatus(typingStatus, io);
    }
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

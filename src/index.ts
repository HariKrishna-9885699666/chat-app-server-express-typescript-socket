import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { handleSocketConnection } from "./socket";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://chat-app-ui-react-vite-ts-socket.vercel.app'], // Add the client URLs
    methods: ['GET', 'POST'],
  },
});

io.on("connection", (socket: Socket) => handleSocketConnection(socket, io));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

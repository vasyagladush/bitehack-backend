import { Server } from "socket.io";
let io;
export default {
  init: (server) => {
    io = new Server(server,{
      cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
      },
      allowEIO3: true

    });
    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};

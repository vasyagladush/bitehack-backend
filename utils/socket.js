import { Server } from "socket.io";
let io;
export default {
  init: (server) => {
    io = new Server(server);
    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};

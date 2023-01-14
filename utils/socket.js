import {Server} from "socket.io";

export default {
    init: server =>{
        const io=new Server(server); 
        return io;
    },
    getIo: ()=>{
        if(!io){
            throw new Error("Socket.io not initialized!");
        }
        return io;
    }
}
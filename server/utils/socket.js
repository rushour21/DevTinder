const socket = require("socket.io");

const initializeSocket = (server) =>{
    const io = socket(server, {
        cors:{
            origin: "http://localhost:5173",
        }
    });

    io.on("connection", (socket) => {
        //hndle event
        socket.on("joinChat",({userId, targetedId})=>{
            console.log({userId, targetedId})
            const room = [userId, targetedId].sort().join("_");
            console.log(`User ${userId} joined room: ${room}`);
            socket.join(room);
        })

        socket.on("sendMessage",()=>{
            
        })

        socket.on("disconnect",()=>{
            
        })
    });
}

module.exports = initializeSocket;
const socket = require("socket.io");
const Chat = require("../models/chat");

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

        socket.on("sendMessage", async ({firstName, userId, targetedId, text})=>{
            //save message to database
            try {
                console.log(firstName + " "  + text);
                const roomId = [userId, targetedId].sort().join("_");
                console.log(typeof roomId, roomId);

                let chat = await Chat.findOne({
                    participants:{$all:[userId, targetedId]}
                }); 
                if(!chat){
                    chat = new Chat({
                        participants:[userId, targetedId],
                        messages:[]
                    })
                };
                chat.messages.push({
                    senderId: userId,
                    text
                });
                await chat.save()
                io.to(roomId).emit("receiveMessage", {from:firstName, text});
            } catch (error) {
                console.error("Error saving message:", error);
            }
            
        })

        socket.on("disconnect",()=>{
            console.log(`User ${socket.id} disconnected`);
        })
    });
} 

module.exports = initializeSocket;
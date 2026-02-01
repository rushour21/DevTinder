const socket = require("socket.io");
const Chat = require("../models/chat");
const Group = require("../models/group");

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
        }
    });

    io.on("connection", (socket) => {
        // Handle join event
        socket.on("joinChat", ({ userId, targetedId, type }) => {
            // type can be 'group' or 'individual' (default)
            let room;
            if (type === 'group') {
                room = `group_${targetedId}`;
            } else {
                room = [userId, targetedId].sort().join("_");
            }
            console.log(`User ${userId} joining room: ${room}`);
            socket.join(room);
        })

        socket.on("sendMessage", async ({ firstName, userId, targetedId, text, type }) => {
            try {
                let room;
                if (type === 'group') {
                    // Group Chat Logic
                    room = `group_${targetedId}`;
                    const group = await Group.findById(targetedId);
                    if (group) {
                        group.messages.push({
                            senderId: userId,
                            text
                        });
                        await group.save();
                        io.to(room).emit("receiveMessage", { from: firstName, text, senderId: userId });
                    }
                } else {
                    // Individual Chat Logic
                    room = [userId, targetedId].sort().join("_");
                    let chat = await Chat.findOne({
                        participants: { $all: [userId, targetedId] }
                    });
                    if (!chat) {
                        chat = new Chat({
                            participants: [userId, targetedId],
                            messages: []
                        })
                    };
                    chat.messages.push({
                        senderId: userId,
                        text
                    });
                    await chat.save()
                    io.to(room).emit("receiveMessage", { from: firstName, text, senderId: userId });
                }
            } catch (error) {
                console.error("Error saving message:", error);
            }

        })

        socket.on("disconnect", () => {
            console.log(`User ${socket.id} disconnected`);
        })
    });
}

module.exports = initializeSocket;
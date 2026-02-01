const express = require("express");
const auth = require("../middlewares/auth");
const Chat = require("../models/chat");
const router = express.Router();

router.get("/chat/recent", auth, async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch 1-1 Chats
        const chats = await Chat.find({
            participants: userId
        }).populate("participants", "firstName lastName photoUrl");

        const formattedChats = chats.map(chat => {
            const otherUser = chat.participants.find(p => !p._id.equals(userId));
            const lastMsg = chat.messages[chat.messages.length - 1];
            return {
                _id: otherUser._id, // Use UserID as ID for 1-1 to match connection logic
                chatId: chat._id,
                type: 'individual',
                firstName: otherUser.firstName,
                lastName: otherUser.lastName,
                photoUrl: otherUser.photoUrl,
                lastMessage: lastMsg ? { text: lastMsg.text, createdAt: lastMsg.createdAt, senderId: lastMsg.senderId, readBy: lastMsg.readBy } : null,
                updatedAt: chat.updatedAt
            };
        });

        // Fetch Groups
        // Need to require Group model here or pass it if circular dep issue
        // Assuming Group model is available or require it
        const Group = require("../models/group");
        const groups = await Group.find({ members: userId })
            .populate("admin", "firstName lastName")
            .populate("members", "firstName lastName photoUrl"); // Needed for details

        const formattedGroups = groups.map(group => {
            const lastMsg = group.messages[group.messages.length - 1];
            return {
                _id: group._id,
                type: 'group',
                name: group.name,
                description: group.description,
                photoUrl: group.photoUrl,
                admin: group.admin,
                members: group.members,
                lastMessage: lastMsg ? { text: lastMsg.text, createdAt: lastMsg.createdAt, senderId: lastMsg.senderId, readBy: lastMsg.readBy } : null,
                updatedAt: group.updatedAt
            };
        });

        // Combine and Sort
        const allChats = [...formattedChats, ...formattedGroups].sort((a, b) => {
            const dateA = a.lastMessage ? new Date(a.lastMessage.createdAt) : new Date(a.updatedAt);
            const dateB = b.lastMessage ? new Date(b.lastMessage.createdAt) : new Date(b.updatedAt);
            return dateB - dateA;
        });

        res.json({ chats: allChats });

    } catch (err) {
        console.error("Error fetching recent chats:", err);
        res.status(500).json({ message: "Error fetching recent chats" });
    }
});

router.get("/chat/:targetedId", auth, async (req, res) => {
    const { targetedId } = req.params;
    const userId = req.user._id;
    try {
        let chat = await Chat.findOne({
            participants: { $all: [userId, targetedId] }
        }).populate({
            path: "messages.senderId",
            select: "firstName lastName"
        })

        if (!chat) {
            chat = new Chat({
                participants: [userId, targetedId],
                messages: []
            })
        }
        await chat.save();
        res.status(200).json(chat)
    } catch (err) {

    }

})

module.exports = router;
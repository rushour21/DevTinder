const express = require("express");
const auth = require("../middlewares/auth");
const Chat = require("../models/chat");
const router = express.Router();

router.get("/chat/:targetedId", auth, async (req, res)=>{
    const {targetedId} = req.params;
    const userId = req.user._id;
    try {
        let chat = await Chat.findOne({
            participants: { $all:[userId, targetedId]}
        }).populate({
            path:"messages.senderId",
            select: "firstName lastName"
        })

        if(!chat){
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
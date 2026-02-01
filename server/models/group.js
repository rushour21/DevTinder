const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    description: {
        type: String,
        maxlength: 200,
        default: ""
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    photoUrl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QjA0l7_EaW84iZ7Z_8Z8Z8Z8Z8Z8Z8Z8Z8Z8&s" // Generic group placeholder
    },
    messages: [messageSchema]
}, { timestamps: true });

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;

const express = require("express");
const auth = require("../middlewares/auth");
const Group = require("../models/group");
const User = require("../models/user");
const router = express.Router();

// Create a new group
router.post("/group/create", auth, async (req, res) => {
    try {
        const { name, description, photoUrl } = req.body;
        const userId = req.user._id;

        if (!name) {
            return res.status(400).json({ message: "Group name is required" });
        }

        const newGroup = new Group({
            name,
            description,
            photoUrl,
            admin: userId,
            members: [userId] // Creator is the first member
        });

        await newGroup.save();
        res.status(201).json({ message: "Group created successfully", group: newGroup });
    } catch (err) {
        res.status(500).json({ message: "Error creating group", error: err.message });
    }
});

// Get user's groups
router.get("/group/my-groups", auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const groups = await Group.find({ members: userId })
            .populate("admin", "firstName lastName photoUrl")
            .populate("members", "firstName lastName photoUrl")
            .sort({ updatedAt: -1 });

        res.status(200).json({ groups });
    } catch (err) {
        res.status(500).json({ message: "Error fetching groups", error: err.message });
    }
});

// Get specific group details with messages
router.get("/group/:groupId", auth, async (req, res) => {
    try {
        const { groupId } = req.params;
        const userId = req.user._id;

        const group = await Group.findById(groupId)
            .populate("members", "firstName lastName photoUrl")
            .populate("messages.senderId", "firstName lastName");

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        if (!group.members.some(member => member._id.equals(userId))) {
            return res.status(403).json({ message: "Not a member of this group" });
        }

        res.status(200).json({ group });
    } catch (err) {
        res.status(500).json({ message: "Error fetching group details", error: err.message });
    }
});

// Add member to group (Admin only)
router.post("/group/add-member", auth, async (req, res) => {
    try {
        const { groupId, userIdToAdd } = req.body;
        const requesterId = req.user._id;

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        if (!group.admin.equals(requesterId)) {
            return res.status(403).json({ message: "Only admin can add members" });
        }

        if (group.members.includes(userIdToAdd)) {
            return res.status(400).json({ message: "User is already a member" });
        }

        group.members.push(userIdToAdd);
        await group.save();

        const updatedGroup = await Group.findById(groupId).populate("members", "firstName lastName photoUrl");

        res.status(200).json({ message: "Member added successfully", group: updatedGroup });

    } catch (err) {
        res.status(500).json({ message: "Error adding member", error: err.message });
    }
});

module.exports = router;

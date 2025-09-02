const express = require('express')
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/user');
const user = require('../models/user');

router.get('/profile/view', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            user: user
        })
    } catch (error) {
        res.status(404).json({
            message: error.message 
        })
    }
})

router.patch('/profile/update', auth, async(req, res)=>{
    try {
        const {firstName, lastName, age, gender, photoUrl, about} = req.body;
        const userId = req.user._id;

        const updatedUser = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            age,
            gender,
            photoUrl,
            about
        },
        { new: true }
        )
        
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            user: updatedUser,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
})


module.exports = router
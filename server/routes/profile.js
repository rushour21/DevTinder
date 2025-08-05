const express = require('express')
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/user');

router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) throw new Error("User not found.");
        res.status(200).json({
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                age: user.age,
            }
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})

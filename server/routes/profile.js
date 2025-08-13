const express = require('express')
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/user');

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


module.exports = router
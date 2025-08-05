const Jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Authentication required.' });
        }
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
}

module.exports = auth;
const express = require('express');
const router = express.Router();
const {isvalidSignUp} = require("../utils/validation")
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

router.post('/signup', async (req, res)=>{
    try {
        isvalidSignUp(req);
        console.log(req.body);
        const {firstName, lastName, email, password, age, gender } = req.body;
        const existingUser = await User.findOne({ email: email});
        if(existingUser) throw new Error("User already exists.");

        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashpassword,
            age,
            gender
        })
        await newUser.save();
        const token = await newUser.getJWT();
        res.cookie('token', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        })
        res.status(201).json({
            message: 'User created successfully',
            user: {
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            },
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

router.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email: email});
        if(!user) throw new Error("Invalid credentials.");

        const isMatch =  await bcrypt.compare(password, user.password);
        if(isMatch) {
            const token = await user.getJWT();
            res.cookie('token', token,{
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            })
            res.status(200).json({
                message: 'Login successful',
                user
            })
        }else{
            throw new Error("Invalid credentials.");
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

router.post('/logout', async (req, res)=>{
    res.cookie('token', null, {
        expires: new Date(Date.now()),
    })
    res.status(200).json({
        message: "Logout successful"
    })
})

module.exports = router;
const express = require('express');
const router = express.Router();
const {isvalidSignUp} = require("../utils/validation")
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');


router.get("/profile",auth, async (req, res) =>{
    try {
        const user = req.user;
        if(!user) throw new Error("User not found.");
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

/*router.post('/signup', async (req, res)=>{
    try {
        isvalidSignUp(req);
        const {firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({ email: email});
        if(existingUser) throw new Error("User already exists.");

        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashpassword
        })
        await newUser.save();
        const token = await newUser.getJWT();

        res.status(201).json({
            message: 'User created successfully',
            user: {
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            },
            cookies: {
                token: token    
            }
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})*/
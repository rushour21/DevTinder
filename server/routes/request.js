const express = require('express');
const router = express.Router();
const Request = require('../models/request');
const User = require('../models/user');
const auth = require('../middlewares/auth');
const mongoose = require('mongoose');


router.post(
    '/request/send/:status/:toUserId',
    auth,
    async (req, res) =>{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedStatuses = ['ignored', 'interested']       

        if(!fromUserId || !toUserId || !status) {
            return res.status(400).json({ message: 'Invalid request parameters.' });
        }
        if(!allowedStatuses.includes(status)){
            return res.status(400).json({ message: 'Invalid status.' });
        }
        if (!mongoose.Types.ObjectId.isValid(toUserId)) {
            return res.status(400).json({ message: 'Invalid User ID format.' });
        }
        if(fromUserId.equals(toUserId)) {
            return res.status(400).json({ message: 'You cannot send a request to yourself.' });
        }
        const toUser = await User.findById(toUserId);
        if(!toUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        const existingRequest =  await Request.findOne({
                    $or:[
                        { fromUserId, toUserId },
                        { fromUserId: toUserId, toUserId: fromUserId }
                    ]
                });

        if(existingRequest){
            return res.status(409).json({ message: 'Request already exists.' });
        }

        try {
            const newRequest = new Request({
                fromUserId,
                toUserId,
                status
            })
            await newRequest.save();
            res.status(201).json({
                message: 'Request sent successfully',
                request: {
                    _id: newRequest._id,
                    fromUserId: newRequest.fromUserId,
                    toUserId: newRequest.toUserId,
                    status: newRequest.status
                }
            });
        } catch (error) {
            console.error('Error sending request:', error);
            res.status(500).json({ message: 'Internal server error' });
        } 
})

router.post(
    '/request/review/:status/:requestId',
    auth,
    async (req, res)=>{
        const toUserId = req.user._id;
        const {status, requestId} =  req.params;
        
        const allowedStatuses = ['accepted', 'rejected'];
        
        if(!toUserId || !status || !requestId){
            return res.status(400).json({message:'invalid req parameter'})
        }

        if(!allowedStatuses.includes(status)){
            return res.status(400).json({
                message:"Invalid status"
            })
        }
        if(!mongoose.Types.ObjectId.isValid(requestId)){
            return res.status(400).json({
                message:"Invalid requestId"
            })
        }

        try {
            const connectionRequest = await Request.findOneAndUpdate({
                _id: requestId,
                toUserId,
                status:'interested'
            },{
                status:status
            },
            {new:true}  // This will return the updated document
        )
        if (!connectionRequest) {
            return res.status(404).json({
                message: 'Request not found or already processed',
            });
        }
        await connectionRequest.save();
        res.status(201).json({
            message:'Request reviewed successfully',
            request: connectionRequest
        })
        } catch (error) {
            console.error('Error sending request:', error);
            res.status(500).json({ message: 'Internal server error' });
        }

    }
)

module.exports = router;
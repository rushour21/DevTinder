const express = require('express');
const router = express.Router();
const Request = require('../models/request');
const User = require('../models/user');
const auth = require('../middlewares/auth');
const user = require('../models/user');

const SAFE_DATA= "firstName lastName skills age gender photoUrl";

router.get(
    '/user/request/received',
    auth,
    async (req, res)=>{
        try {
            const loggedUser = req.user;

            const connectionRequests = await Request.find({
                toUserId:loggedUser._id,
                status:'interested'
            }).populate('fromUserId', SAFE_DATA)
        res.json({
            message: 'fetched succesfully',
            data:connectionRequests 
        })
        } catch (error) {
            return res.status(400).send('error' + error.message);
        }

    })

router.get('/user/connections',
    auth,
    async (req,res)=>{
        try {
            const loggedUser = req.user;
            const connections = await Request.find({
                $or:[
                    {fromUserId:loggedUser._id, status:'accepted'},
                    {toUserId:loggedUser._id, status:'accepted'},
                ]
            })
            .populate('fromUserId', SAFE_DATA)
            .populate('toUserId', SAFE_DATA);
            
            const data = connections.map((doc)=>{
                if (doc.fromUserId._id.toString() === loggedUser._id.toString()) {

                    return doc.toUserId;
                }else{
                    return doc.fromUserId;
                }
            })
            res.json({data})
        } catch (error) {
            res.status(400).send({
                message: error
            })
        }
    }
)

router.get('/feed', auth, async (req,res)=>{
    try {
        const loggedUser = req.user;
        const page= parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit>50 ? 50 : limit;
        const skip = (page-1)*limit;

        const connectionRequests = await Request.find({
            $or:[
                {fromUserId: loggedUser._id.toString()},
                {toUserId: loggedUser._id.toString()}
            ]
        }).select("fromUserId toUserId")

        console.log(connectionRequests);

        const hideuser = new Set();
        connectionRequests.forEach((req)=>{
            hideuser.add(req.fromUserId.toString());
            hideuser.add(req.toUserId.toString());
        })

        const users = await User.find({
            $and:[
                {_id:{$nin: Array.from(hideuser)}},
                {_id: {$ne: loggedUser._id}}
            ]
        })
        .select(SAFE_DATA)
        .skip(skip)
        .limit(limit)

        console.log(users);

        res.send(users);
    } catch (error) {
        res.status(400).send({message: error}); 
    }
})

module.exports = router;
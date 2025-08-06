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
            console.log(req.user);
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
            console.log(loggedUser)

            const connections = await Request.find({
                $or:[
                    {fromUserId:loggedUser._id, status:'accepted'},
                    {toUserId:loggedUser._id, status:'accepted'},
                ]
            })
            .populate('fromUserId', SAFE_DATA)
            .populate('toUserId', SAFE_DATA);
            console.log(connections)
            
            const data = connections.map((doc)=>{
                if (doc.fromUserId._id.toString() === loggedUser._id.toString()) {

                    return doc.toUserId;
                }else{
                    return doc.fromUserId;
                }
            })
            console.log({data})
            res.json({data})
        } catch (error) {
            res.status(400).send({
                message: error
            })
        }
    }
)

module.exports = router;
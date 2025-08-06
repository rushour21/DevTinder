const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
        type: String,
        required: true,
        enum:{
            values: ['ignored', 'interested', 'accepted', 'rejected'],
            message: '{VALUE} is not a valid status'
        }
    }
    },{timestamps: true}
)

module.exports = mongoose.model('Request', requestSchema)

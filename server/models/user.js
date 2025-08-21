const mongoose = require('mongoose');
const validator = require('validator');
const Jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator: validator.isStrongPassword,
            message: '6+ characters, with at least 1 letter and 1 number.'
        }
    },
    age:{
        type: Number,
        min: 18,
        max: 40,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    skills:{
        type: [String],
        maxlength: 15,
    },
    about:{
        type: String,
        minlength: 10,
        maxlength: 500
    },
    photoUrl:{
        type: String,
        default: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
    }
}, { timestamps: true })

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await Jwt.sign({id: user._id}, process.env.VITE_JWT_SECRET, { expiresIn: '7d' });
    return token;
}

userSchema.methods.validatePassword = async function (inputPassword){
    const user = this;
    const hashpassword = user.password;
    const isvalid =  await bcrypt.compare(
        inputPassword, 
        hashpassword
    )
    return isvalid;
}

module.exports = mongoose.model('User', userSchema);
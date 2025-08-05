const validator = require('validator');

const isvalidSignUp= (req)=>{
    const{ firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName || !email || !password){
        throw new Error('All fields are required');
    } else if(!validator.isEmail(email)){
        throw new Error('Email is not valid');
    } else if(!validator.isStrongPassword(password)){
        throw new Error('Pleasse enter a strong password');
    }
}

module.exports = {
    isvalidSignUp
}
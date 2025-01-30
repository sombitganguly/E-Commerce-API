import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone_no:{
        type: Number,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    profile_picture:{
        type: String,
        default: ""
    },
    role:{
        type: String,
        enum: ['GOD', 'ADMIN', 'USER'],
        default: 'USER'
    }
})

const User = new mongoose.model('User', userSchema)
export default User
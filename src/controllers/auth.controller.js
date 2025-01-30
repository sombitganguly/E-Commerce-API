import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) =>{
    try{
        const {name, email, password, phone_no, address, role} = req.body

        if(!name || !email || !password || !address){
            res.status(400).json({message:"Fill all the mandatory fields"})
            return
        }

        const existingEmail = await User.findOne({email})
        if(existingEmail){
            res.status(409).json({message:"Email taken"})
            return
        }

        const existingPhoneNo = await User.findOne({phone_no})
        if(existingPhoneNo){
            res.status(409).json({message:"Phone no taken"})
            return
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            phone_no,
            address,
            role
        })

        await newUser.save()

        res.status(201).json({message:"User created successfully"})
    }
    catch(err){
        next(err)
    }
}



export const login = async (req,res,next)=>{
    try{
        const {email,password} = req.body
    
        if(!email || !password){
            res.status(400).json({message:"Fill both the mandatory fields"})
            return
        }

        const validUser = await User.findOne({email})
        if(!validUser){
            res.status(404).json({message:"User not found"})
            return
        }

        const validPassword = await bcryptjs.compare(password, validUser.password)
        if(!validPassword){
            res.status(404).json({message:"Incorrect credentials"})
            return
        }

        const id = validUser._id
        const token = jwt.sign({id}, process.env.JWT_SECRET)

        const { password:pass, ...rest } = validUser._doc
    
        res.cookie('access_token', token, {httpOnly:true}).status(200).json(rest)
    }
    catch(err){
        next(err)
    }
}
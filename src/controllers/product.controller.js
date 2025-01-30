import Product from '../models/product.model.js'
import User from '../models/user.model.js'

export const addProduct = async (req, res, next)=>{
    try{

        const isAdmin = await User.findById(req.user.id)
        if(isAdmin.role !== 'ADMIN'){
            res.status(403).json({message:"Unauthorised"})
            return
        }

        const {name, description, quantity, seller, price, category, imageUrls}= req.body
        if(!name || !description || !seller || !price || !category || !imageUrls){
            res.status(400).json({message:"All fields required"})
            return
        }

        if(quantity && !Number.isInteger(quantity)){
            res.status(400).json({message:"Invalid quantity"})
            return
        }
        
        const newProduct = new Product({
            name,
            description,
            seller,
            price,
            category,
            quantity,
            imageUrls
        })

        await newProduct.save()
        res.status(201).json({message:"Product has been added successfully"})

    }
    catch(err){
        next(err)
    }
}
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

export const updateProduct= async(req, res, next)=>{
    try{
        const isAdmin = await User.findById(req.user.id)
        if(isAdmin.role !== 'ADMIN'){
            res.status(403).json({message:"Unauthorised"})
            return
        }
        
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json({message:"Updated Successfully", data:updatedProduct})
    }
    catch(err){
        next(err)
    }
}

export const deleteProduct = async (req, res, next) =>{
    try{
        const isAdmin = await User.findById(req.user.id)
        if(isAdmin.role !== 'ADMIN'){
            res.status(403).json({message:"Unauthorised"})
            return
        }

        const {name, seller} = req.body
        const deletedProduct = await Product.findOneAndDelete({name,seller})

        if(!deletedProduct){
            res.status(404).json({message:"Product not found"})
            return
        }

        res.status(200).json({message:"Product Deleted Successfully"})
    }
    catch(err){
        next(err)
    }
}

export const getProduct = async (req,res,next) =>{
    try{
        const name = req.query.name || null
        const category = req.query.category || null

        if(!name && !category){
            res.status(400).json({message:"No search query received"})
            return
        }

        let searchResults

        if(name && !category){
            searchResults = await Product.find({
                name:{ $regex: name, $options: 'i'}
            })
        }

        else if(!name && category){
            searchResults = await Product.find({category})
        }

        else{
            searchResults = await Product.find({
                name: { $regex: name, $options: 'i'},
                category
            })
        }

        if(!searchResults.length){
            res.status(200).json({message:"No result matches ur search"})
            return
        }

        res.status(200).json(searchResults)

    }
    catch(err){
        next(err)
    }
}
import CartItem from '../models/cart.model.js'
import Product from '../models/product.model.js'

export const addToCart = async (req, res, next) =>{
    try{
        const userId = req.params.id
        const { name, seller, quantity=1 } = req.body
        const productId = await Product.findOne({name,seller})
        
        if(!productId){
            res.status(404).json({message:"Product not found"})
            return
        }

        const existingItem = await CartItem.findOne({userId, productId: productId._id})
        if(existingItem){
            const newQuantity = existingItem.quantity + quantity
            await CartItem.findByIdAndUpdate(existingItem._id, {quantity:newQuantity})
            res.status(200).json({message:"Quantity updated"})
        }
        else{
            const newCartItem = new CartItem({
            userId,
            productId: productId._id,
            quantity
            })
            await newCartItem.save()
            res.status(201).json({message:"Item has been added to cart"})
        }
    }
    catch(err){
        next(err)
    }
}

export const getCart = async(req, res, next) =>{
    try{
        const userId = req.params.id
        const cartItems = await CartItem.find({userId})
        if(!cartItems){
            res.status(404).json({message:"Cart is empty"})
            return
        }

        const productData = []
        let totalPrice=0

        for(let cartItem of cartItems){
            let product = await Product.findById(cartItem.productId)
            let price = product.price * cartItem.quantity
            console.log(cartItem.quantity)
            totalPrice+= price
            productData.push({name: product.name, seller: product.seller, price: product.price, quantity: cartItem.quantity})
        }

        const data = {productData, total: totalPrice}
        res.status(200).json(data)
    }
    catch(e){
        next(e)
    }
}
import mongoose from "mongoose";
import Product from "./product.model.js";
import User from "./user.model.js";

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity:{
        type: Number,
        default: 1
    }
})

const CartItem = new mongoose.model('CartItem', cartSchema)
export default CartItem
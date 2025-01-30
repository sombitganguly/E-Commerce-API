import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        default: 1
    },
    category:{
        type: String,
        enum:['FOOD', 'ELECTRONICS', 'COSMETICS', 'SANITARIES', 'STATIONERIES'],
        required: true
    },
    seller:{
        type: String,
        required: true
    },
    imageUrls:{
        type: Array,
        required: true
    }
})

const Product = new mongoose.model('Product', productSchema)
export default Product
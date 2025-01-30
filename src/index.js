import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/auth.route.js'
import productRouter from './routes/product.route.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser())
app.use(express.json())
dotenv.config()

const mongo = process.env.MONGO
mongoose.connect(mongo).then(()=> console.log("Connected to DB")).catch(e => console.log(e))

const port = process.env.PORT
app.listen(port, ()=> console.log(`Listening at port ${port}`))

app.use('/auth', authRouter)
app.use('/product', productRouter)

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
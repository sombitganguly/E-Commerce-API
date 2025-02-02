import express from 'express'
import { addToCart, getCart } from '../controllers/cart.controller.js'

const router = express.Router()

router.post('/add/:id', addToCart)
router.get('/get/:id', getCart)

export default router
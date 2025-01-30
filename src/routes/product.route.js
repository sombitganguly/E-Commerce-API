import express from 'express'
import { addProduct } from '../controllers/product.controller.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'

const router = express.Router()

router.post('/create',verifyAdmin, addProduct)

export default router
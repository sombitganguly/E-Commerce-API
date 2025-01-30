import express from 'express'
import { addProduct, deleteProduct } from '../controllers/product.controller.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'

const router = express.Router()

router.post('/create',verifyAdmin, addProduct)
router.delete('/delete', verifyAdmin, deleteProduct)

export default router
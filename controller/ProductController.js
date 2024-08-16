import express from 'express'
import { products} from '../model/index.js'
import { verifyToken} from '../middleware/AuthenticateUser.js'
import bodyParser from 'body-parser'

const productRouter = express.Router()
productRouter.use(bodyParser.json())

// getting all products
productRouter.get('/', verifyToken, (req, res) => {
    products.fetchProducts(req, res)
})

// recent products
productRouter.get('/recent', (req, res) => {
    products.recentProducts(req, res)
})

// getting one product
productRouter.get('/:id', verifyToken, (req, res) => {
    products.fetchProduct(req, res)
})

// add a new product
productRouter.post('/add', verifyToken, (req, res) => {
    products.addProduct(req, res)
})

// update product
productRouter.patch('/:id', verifyToken, (req, res) => {
    products.updateProduct(req, res)
})

// delete product
productRouter.delete('/:id', verifyToken, (req, res) => {
    products.deleteProduct(req, res)
})

export{
    express,
    productRouter,
}
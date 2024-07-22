const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

router.post('/cart/',ProductController.insertCartData); 
router.post('/addproduct',ProductController.addNewProduct); 
router.delete('/cart',ProductController.deleteCartByCarId);
router.get('/cart/:id',ProductController.selectCartByCarId);
router.get('/cart',ProductController.getAllCart);
router.get('/category',ProductController.getAllCategory);
router.get('/category/:id',ProductController.selectProductByCategory);
router.get('/',ProductController.selectAllProduct);
router.delete('/:id',ProductController.deleteProductById);
module.exports = router;

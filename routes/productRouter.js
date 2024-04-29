const express = require('express');
const router = express.Router();
const productContoller = require('../controller/productController');
const authMiddle = require('../authMiddle');
const { upload, compressImage } = require('../utils/imageUtils');



// Routes
router.get('/getall', productContoller.getAllProducts);
router.get('/getbyid/:productId',  productContoller.getProductById)
router.post('/add',  authMiddle.authenticateToken,upload.single('image'), compressImage, productContoller.addProduct);
router.post('/update/:productId', authMiddle.authenticateToken,upload.single('image'),compressImage, productContoller.updateProduct);
router.put('/delete',productContoller.deleteProduct);

module.exports = router;

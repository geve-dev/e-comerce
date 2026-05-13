const express = require('express');
const router = express.Router();

const { authRequired } = require("../middlewares/auth.middleware");
const { modOrAdminRequired } = require("../middlewares/admin.middleware");

const productController = require('../controllers/productController');

router.post('/', authRequired, modOrAdminRequired, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', authRequired, modOrAdminRequired, productController.updateProduct);
router.delete('/:id', authRequired, modOrAdminRequired, productController.deleteProduct);

module.exports = router;
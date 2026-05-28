const express = require('express');
const router = express.Router();

const { authRequired } = require('../middlewares/auth.middleware');

const itemController = require('../controllers/itemController');


router.post('/', authRequired, itemController.createItem);
router.get('/', authRequired, itemController.getItemsByPurchase);
router.patch('/', authRequired, itemController.removeItemQuantity);
router.delete('/', authRequired, itemController.deleteItem);

module.exports = router;

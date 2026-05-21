const express = require('express');
const router = express.Router();

const { authRequired } = require('../middlewares/auth.middleware');

const purchaseController = require('../controllers/purchaseController');

router.post('/', authRequired, purchaseController.createPurchase);

module.exports = router;
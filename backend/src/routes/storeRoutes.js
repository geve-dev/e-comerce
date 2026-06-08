const express = require('express');
const router = express.Router();

const { authRequired } = require('../middlewares/auth.middleware');

const storeController = require('../controllers/storeController');

router.post('/', authRequired, storeController.postStore);

module.exports = router;
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const { errorHandler } = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/product', productRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/purchase', purchaseRoutes);

app.use(errorHandler);

module.exports = app;
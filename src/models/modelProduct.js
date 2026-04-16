const db = require('../config/db');

async function createProduct(name, description, price, stock, image) {
    const query = `INSERT INTO products (name, description, price, stock, image) VALUES (?, ?, ?, ?, ?)`
    const [result] = await db.query(query, [name, description, price, stock, image]);
    return result;
}

async function getAllProducts() {
    const query = `SELECT * FROM products`
    const [rows] = await db.query(query);
    return rows;
}

async function getProductById(id) {
    const query = `SELECT * FROM products WHERE id = ?`
    const [rows] = await db.query(query, [id]);
    return rows;
}

async function updateProduct(id, name, description, price, stock, image) {
    const query = `UPDATE products SET name = ?, description = ?, price = ?, stock = ?, image = ? WHERE id = ?`
    const [result] = await db.query(query, [name, description, price, stock, image, id]);
    return result;
}

async function deleteProduct(id) {
    const query = `DELETE FROM products WHERE id = ?`
    const [result] = await db.query(query, [id]);
    return result;
}

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
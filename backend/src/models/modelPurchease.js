const db = require('../config/db');

async function findOpenPurchaseByUserId(id_user) {
    const query = `SELECT * FROM purchase WHERE id_user = ? AND status = 'aberto'`;
    const [rows] = await db.query(query, [id_user]);
    return rows[0];
}

async function createPurchase(id_user, all_price) {
    const query = `INSERT INTO purchase (id_user, status, all_price) VALUES (?, 'aberto', ?)`
    const [result] = await db.query(query, [id_user, all_price]);
    return { id: result.insertId, id_user, status: 'aberto', all_price };
}

async function findItemByPurchaseAndProduct(id_purchase, id_product) {
    const query = `SELECT * FROM items WHERE id_purchase = ? AND id_product = ?`;
    const [rows] = await db.query(query, [id_purchase, id_product]);
    return rows[0];
}

async function addItemQuantity(id_item, quantity) {
    const query = `UPDATE items SET quantity = ? WHERE id = ?`;
    const [result] = await db.query(query, [quantity, id_item]);
    return result;
}

async function AllPrice(id_purchase) {
    const query = `
      SELECT SUM(quantity * unit_value) AS total_value
      FROM ecommerce.items
      WHERE id_purchase = ?;
`;
    const [result] = await db.query(query, [quantity, id_item]);
    return result;
}

module.exports = { findOpenPurchaseByUserId, createPurchase, findItemByPurchaseAndProduct, addItemQuantity, AllPrice }
const db = require('../config/db');

async function findOpenPurchaseByUserId(id_user) {
    const query = `SELECT * FROM purchase WHERE id_user = ? AND status = 'aberto'`;
    const [rows] = await db.query(query, [id_user]);
    return rows[0];
}

async function createPurchase(id_user) {
    const query = `INSERT INTO purchase (id_user, status, all_price) VALUES (?, 'aberto', 0)`
    const [result] = await db.query(query, [id_user]);
    return { id: result.insertId, id_user, status: 'aberto', all_price: 0 };
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


module.exports = { findOpenPurchaseByUserId, createPurchase, findItemByPurchaseAndProduct, addItemQuantity }
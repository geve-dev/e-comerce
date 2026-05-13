const db = require('../config/db');

async function findOpenPurchaseByUserId(id_user) {
    const query = `SELECT * FROM purchase WHERE id_user = ? AND status = 'aberto'`;
    const [rows] = await db.query(query, [id_user]);
    return rows[0];
}

async function createPurchase(id_user) {
    const query = `INSERT INTO purchase (id_user, status, all_price) VALUES (?, 'aberto', 0)`
    const [result] = await db.query(query, [id_user]);
    return result[0];
}

async function createItem(id_product, id_purchase, quantity) {
    const query = `INSERT INTO items (id_product, id_purchase, quantity) VALUES(?, ?, ?)`
    const [result] = await db.query(query, [id_product, id_purchase, quantity])

    return result;
}

module.exports = { findOpenPurchaseByUserId, createPurchase, createItem }
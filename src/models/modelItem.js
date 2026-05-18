const db = require('../config/db');

async function findItemByPurchaseAndProduct(id_purchase, id_product) {
    const query = `SELECT * FROM items WHERE id_purchase = ? AND id_product = ?`
    const [result] = await db.query(query, [id_purchase, id_product])
    return result.length > 0 ? result[0] : null;
}

async function createItem(id_product, id_purchase, quantity) {
    const query = `INSERT INTO items (id_product, id_purchase, quantity) values (?, ?, ?)`
    const [result] = await db.query(query, [id_product, id_purchase, quantity])
    return { id: result.insertId, id_product, id_purchase, quantity };

}

async function addItemQuantity(id_purchase, id_product, quantity) {
    const query = `UPDATE items SET quantity = quantity + ? WHERE id_purchase = ? AND id_product = ?`;
    const [result] = await db.query(query, [quantity, id_purchase, id_product]);
    return { id: result.insertId, id_product, id_purchase, quantity };
}

async function removeItemQuantity(id_purchase, id_product, quantity) {
    const query = `UPDATE items SET quantity = quantity - ? WHERE id_purchase = ? AND id_product = ?`;
    const [result] = await db.query(query, [quantity, id_purchase, id_product]);
    return { id: result.insertId, id_product, id_purchase, quantity };
}

async function deleteItem(id_purchase, id_product) {
    const query = `DELETE FROM items WHERE id_purchase = ? AND id_product = ?`;
    const [result] = await db.query(query, [id_purchase, id_product]);
    return { id: result.insertId, id_product, id_purchase };
}


module.exports = { createItem, addItemQuantity, removeItemQuantity, findItemByPurchaseAndProduct, deleteItem }
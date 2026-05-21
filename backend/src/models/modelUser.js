const db = require('../config/db');

async function findUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = ?`
    const [rows] = await db.query(query, [email]);
    return rows[0];
}

async function createUser(name, email, password, role) {
    const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`
    const [result] = await db.query(query, [name, email, password, role]);
    return result;
}

async function getAllUsers() {
    const query = `SELECT * FROM users`;
    const [rows] = await db.query(query);
    return rows;
}

async function getUserById(id) {
    const query = `SELECT * FROM users WHERE id = ?`
    const [rows] = await db.query(query, [id]);
    return rows[0];
}

async function updateUser(id, name, email, password, role) {
    const query = `UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?`
    const [result] = await db.query(query, [name, email, password, role, id]);
    return result;
}

async function deleteUser(id) {
    const query = `DELETE FROM users WHERE id = ?`;
    const [result] = await db.query(query, [id]);
    return result;
}

module.exports = { findUserByEmail, createUser, getAllUsers, getUserById, updateUser, deleteUser }
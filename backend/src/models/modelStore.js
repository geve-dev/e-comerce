const db = require('../config/db');

async function postStore (id_ownerOrObj, store_name, slug, niche) {
  // Accept either (id_owner, name, slug, niche) or a single object { id_owner, name, slug, niche }
  let id_owner = id_ownerOrObj;
  if (id_ownerOrObj && typeof id_ownerOrObj === 'object') {
    ({ id_owner, name, slug, niche } = id_ownerOrObj);
  }
  const query = `INSERT INTO stores (id_owner, store_name, slug, niche, status) VALUES ( ?, ?, ?, ?, 'pending')`;
  const values = [id_owner, store_name, slug, niche];
  await db.query(query, values);
};

async function getAllStore() {
  const query = `SELECT * FROM stores`;
  const [stores] = await db.query(query);
  return stores;
};

async function getStoreById(id) {
  const query = `SELECT * FROM stores WHERE id = ?`;
  const [store] = await db.query(query, [id]);
  return store;
};

async function getStorePending() {
  const query = `SELECT * FROM stores WHERE status = 'pending'`;
  const [stores] = await db.query(query);
  return stores;
};

async function findStoreBySlug(slug) {  
  const query = `SELECT * FROM stores WHERE slug = ?`;
  const [store] = await db.query(query, [slug]);
  return store;
};

async function approveStore(id) {
  const query = `UPDATE stores SET status = 'approved' WHERE id = ?`;
  const [result] = await db.query(query, [id]);
  return result;
};

async function getStoreActive() {
  const query = `SELECT * FROM stores WHERE status = 'active'`;
  const [stores] = await db.query(query);
  return stores;
};

async function getProductsByStore() {
  const query = `
    SELECT p.*, s.store_name
      FROM products p
         , stores s
     where s.id = p.id_store;
     `;
  const [products] = await db.query(query);
  return products;
};

module.exports = { postStore, getAllStore, getStoreById, getStorePending, getStoreActive, findStoreBySlug, approveStore, getProductsByStore };
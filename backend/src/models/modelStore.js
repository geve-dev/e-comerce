const db = require('../config/db');

async function postStore (id, id_owner, name, slug, niche) {
  const query = `INSERT INTO stores (id, id_owner, name, slug, niche, status) VALUES (?, ?, ?, ?, ?, 'pending')`;
  const values = [id, id_owner, name, slug, niche];
  await db.query(query, values);
};

module.exports = { postStore };

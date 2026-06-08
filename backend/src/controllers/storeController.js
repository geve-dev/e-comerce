const repo = require('../models/modelStore')

const postStore = async (req, res) => {
  try {
    const { id_owner, name, slug, niche } = req.body;

    if (!id_owner || !name || !slug || !niche) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    const store = await repo.postStore({ id_owner, name, slug, niche });
    
    return res.status(201).json({ store: store, message: "Store pendente, aguarde aprovação" });
  } catch (e) {
      next(e);
  }
};

module.exports = { postStore };

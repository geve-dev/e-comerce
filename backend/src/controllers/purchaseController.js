const repo = require('../models/modelPurchease');
const ItemRepo = require('../models/modelItem');

async function createPurchase(req, res, next) {
    try {
        const id_user = req.user.id;
        
        const existingPurchase = await repo.findOpenPurchaseByUserId(id_user);

        if (existingPurchase) {
            return res.status(400).json({ purchase: existingPurchase, message: 'Você já tem um carrinho aberto, continue usando ele.'});
        }

        const all_price = await repo.AllPrice()

        const result = await repo.createPurchase(id_user);

        return res.status(201).json({ purchase: result, message: 'Pedido criado com sucesso' });

    } catch (e) {
        next(e)
    }
}


module.exports = { createPurchase }
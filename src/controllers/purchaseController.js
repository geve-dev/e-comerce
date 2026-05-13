const repo = require('../models/modelPurchease');

async function createPurchase(req, res, next) {
    try {
        const id_user = req.user.id; 
        
        const existingPurchase = await repo.findOpenPurchaseByUserId(id_user);

        if (existingPurchase) {
            return res.status(400).json({ purchase: existingPurchase, message: 'Você já tem um carrinho aberto, continue usando ele.'});
        }
        
        const result = await repo.createPurchase(id_user);

        return res.status(201).json({ purchase: result, message: 'Pedido criado com sucesso' });

    } catch (e) {
        next(e)
    }
}

async function createItem(req, res, next) {
    try {
        const { id_product, id_purchase, quantity } = req.body;

        return res.status(200).json({ message: 'Produto adicionado ao carrinho', id_product, id_purchase, quantity });
    } catch (e) {
        next(e)
    }
}

module.exports = { createPurchase, createItem }
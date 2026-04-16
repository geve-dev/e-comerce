const repo = require('../models/modelProduct.js');

async function createProduct(req, res, next) {
    try {
        const { name, description, price, stock, image } = req.body;

        if (!name || typeof name !== 'string' || !description || typeof description !== 'string' || !price || typeof price !== 'number' || !stock || typeof stock !== 'number' || !image || typeof image !== 'string') {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        if (req.user.role !== 1) {
            return res.status(403).json({ message: "Você não tem permissão para criar produtos" });
        }

        const result = await repo.createProduct(name, description, price, stock, image);

        return res.status(201).json({product: result, messagem: "Produto criado com sucesso" });
        } catch (e) {
       next(e);
    }
}

async function getAllProducts(req, res, next) {
    try {
        const products = await repo.getAllProducts();
        return res.status(200).json(products);
    } catch (e) {
        next(e);
    }
}

async function getProductById(req, res, next) {
    try {
        const { id } = req.params;
        const product = await repo.getProductById(id);
        return res.status(200).json(product);
    } catch (e) {
        next(e);
    }
}

async function updateProduct(req, res, next) {
    try {
        const { id } = req.params;
        const { name, description, price, stock, image } = req.body;

        if (!name || typeof name !== 'string' || !description || typeof description !== 'string' || !price || typeof price !== 'number' || !stock || typeof stock !== 'number' || !image || typeof image !== 'string') {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        if (req.user.role !== 1) {
            return res.status(403).json({ message: "Você não tem permissão para atualizar produtos" });
        }

        const result = await repo.updateProduct(id, name, description, price, stock, image);

        return res.status(200).json({product: result, messagem: "Produto atualizado com sucesso" });
    } catch (e) {
        next(e);
    }
}

async function deleteProduct(req, res, next) {
    try {
        const { id } = req.params;
        const result = await repo.deleteProduct(id);

        if (req.user.role !== 1) {
            return res.status(403).json({ message: "Você não tem permissão para deletar produtos" });
        }   

        return res.status(200).json({product: result, messagem: "Produto deletado com sucesso" });
    } catch (e) {
        next(e);
    }
}

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };

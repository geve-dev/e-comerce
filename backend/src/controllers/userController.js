const repo = require('../models/modelUser.js');
const bcrypt = require('bcrypt');

async function getAllUsers(req, res, next) {
    try {
        const users = await repo.getAllUsers();
        return res.status(200).json(users);
    } catch (e) {
        next(e);
    }
}

async function getUserById(req, res, next) {
    try {
        const user = await repo.getUserById(req.params.id);
        return res.status(200).json(user);
    } catch (e) {
        next(e);
    }
}

async function updateUser(req, res, next) {
    try {
        const idDaUrl = req.params.id;
        const eu = req.user;

        // 1. Busca o usuário que será alterado para verificar o cargo dele
        const usuarioAlvo = await repo.getUserById(idDaUrl);
        if (!usuarioAlvo) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        // 2. Regra 1: Um cliente comum ('user') só altera o próprio perfil
        if (eu.id != idDaUrl && eu.role !== 'adm' && eu.role !== 'mod') {
            return res.status(403).json({ message: "Você não tem permissão para editar outros usuários." });
        }

        // 3. Regra da Hierarquia: Moderador ('mod') não pode alterar Administrador ('adm')
        if (eu.role === 'mod' && usuarioAlvo.role === 'adm') {
            return res.status(403).json({ message: "Um moderador não pode alterar os dados de um administrador!" });
        }



        // Pega os dados enviados no corpo da requisição ou mantém os dados atuais do banco
        const name = req.body.name || usuarioAlvo.name;
        const email = req.body.email || usuarioAlvo.email;
        let password = usuarioAlvo.password;

        // Se uma nova senha for fornecida, fazemos o hash antes de salvar
        if (req.body.password) {
            password = await bcrypt.hash(req.body.password, 10);
        }

        // Regra Especial: Apenas o Admin ('adm') pode alterar cargos. Se for Mod/User, o cargo não muda.
        let role = usuarioAlvo.role;
        if (eu.role === 'adm' && req.body.role !== undefined) {
            role = req.body.role;
        }

        const existUser = await repo.findUserByEmail(email);
        if (existUser && existUser.id != idDaUrl) return res.status(409).json({ message: "E-mail já cadastrado" });

        // Executa a atualização no banco de dados usando a função do repositório
        await repo.updateUser(idDaUrl, name, email, password, role);

        return res.status(200).json({
            message: "Usuário atualizado com sucesso!",
            user: { id: idDaUrl, name, email, role }
        });
    } catch (e) {
        next(e);
    }
}

async function deleteUser(req, res, next) {
    try {
        const idDaUrl = req.params.id;
        const eu = req.user;

        const usuarioAlvo = await repo.getUserById(idDaUrl);
        if (!usuarioAlvo) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        if (eu.id != idDaUrl && eu.role !== 'adm' && eu.role !== 'mod') {
            return res.status(403).json({ message: "Você não tem permissão para deletar outros usuários." });
        }

        if (eu.role === 'mod' && usuarioAlvo.role === 'adm') {
            return res.status(403).json({ message: "Um moderador não pode deletar um administrador!" });
        }

        await repo.deleteUser(idDaUrl);
        return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (e) {
        next(e);
    }
}


module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
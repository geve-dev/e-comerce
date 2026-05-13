function adminRequired(req, res, next) {
    if (req.user.role !== 'adm') {
        return res.status(403).json({ message: "Apenas administradores podem acessar aqui!" });
    }
    next();
}

function modOrAdminRequired(req, res, next) {
    if (req.user.role !== 'adm' && req.user.role !== 'mod') {
        return res.status(403).json({ message: "Recurso exclusivo para administradores ou moderadores." });
    }
    next();
}

module.exports = { adminRequired, modOrAdminRequired };

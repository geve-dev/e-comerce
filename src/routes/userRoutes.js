const express = require('express');
const router = express.Router();

const { authRequired } = require("../middlewares/auth.middleware")
const userController = require("../controllers/userController")

router.get("/", authRequired, userController.getAllUsers);
router.get("/:id", authRequired, userController.getUserById);
router.put("/:id", authRequired, userController.updateUser);
router.delete("/:id", authRequired, userController.deleteUser);

module.exports = router;
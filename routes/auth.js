const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Ruta para registrar un nuevo usuario
router.post('/register', authController.register);

// Ruta para iniciar sesión
router.post('/login', authController.login);

module.exports = router;

const express = require('express');
const { loginController } = require('./auth.controller');

const router = express.Router();

// Login route
router.post('/login', loginController);

module.exports = router;

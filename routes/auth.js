const express = require('express');
const { body } = require('express-validator/check');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/auth', authController.getAuth);

module.exports = router;
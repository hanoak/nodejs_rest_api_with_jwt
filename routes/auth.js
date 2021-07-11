const express = require('express');
const { body } = require('express-validator/check');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/auth', [
    body('email')
        .isEmail().withMessage('Provide a valid email!')
        .normalizeEmail(),
    body('password', 'Provide a valid password!')
        .isLength({ min: 6})
        .isAlphanumeric()
        .trim()
    ] , authController.getAuth);

module.exports = router;
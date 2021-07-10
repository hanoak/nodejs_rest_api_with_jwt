const express = require('express');
const { body } = require('express-validator/check');
const crudController = require('../controllers/crud');

const router = express.Router();

router.get('/get', crudController.getAllBooks);

router.get('/get/:bid', crudController.getSingleBook);

router.post('/post', crudController.postBook);

router.put('/put/:bid', crudController.putBook);

router.delete('/delete/:bid', crudController.deleteBook);

module.exports = router;
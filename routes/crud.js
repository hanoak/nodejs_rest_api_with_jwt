const express = require('express');
const { body } = require('express-validator/check');
const crudController = require('../controllers/crud');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/get', isAuth, crudController.getAllBooks);

router.get('/get/:bid', isAuth, crudController.getSingleBook);

router.post('/post', isAuth, [
    body('name',"Provide a valid book's name")
        .isString()
        .isLength({ min: 4})
        .trim(),
    body('author', "Provide a valid author's name")
        .isString()
        .isLength({ min: 4})
        .trim(),
    body('price', "Provide a valid book's price")
        .isNumeric()
        .trim()
], crudController.postBook);

router.put('/put/:bid', isAuth, [
    body('name',"Provide a valid book's name")
        .isString()
        .isLength({ min: 4})
        .trim(),
    body('author', "Provide a valid author's name")
        .isString()
        .isLength({ min: 4})
        .trim(),
    body('price', "Provide a valid book's price")
        .isNumeric()
        .trim()
], crudController.putBook);

router.delete('/delete/:bid', isAuth, crudController.deleteBook);

module.exports = router;
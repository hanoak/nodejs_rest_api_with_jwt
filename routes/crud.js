const express = require('express');
const { body } = require('express-validator/check');
const crudController = require('../controllers/crud');

const router = express.Router();

router.get('/get', crudController.getAllStudents);

router.get('/get/:sid', crudController.getSingleStudent);

router.post('/post', crudController.postStudent);

router.put('/put/:sid', crudController.putStudent);

router.delete('/delete/:sid', crudController.deleteStudent);

module.exports = router;
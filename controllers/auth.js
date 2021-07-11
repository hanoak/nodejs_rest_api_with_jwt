const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.getAuth = (req, res, next) => {

    const errors = validationResult(req);
    if(! errors.isEmpty()) {
        const err = new Error('Validation failed.');
        err.statusCode = 422;
        err.data = errors.array();
        throw err;
    }

    const email = req.body.email;
    const password = req.body.password;
    let dbuser;

    User.findOne({email: email})
        .then(user => {

            if(! user) {
                const err = new Error('Email not found!');
                err.statusCode = 401;
                err.data = {email: email, password: password};
                throw err;
            }
            dbuser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {

            if(! isEqual) {
                const err = new Error('Wrong password!');
                err.statusCode = 401;
                err.data = {email: email, password: password};
                throw err;
            }

            const token = jwt.sign({
                uid: dbuser._id.toString(),                
            }, 'YourSecretKeyGoesHere123', {
                expiresIn: '1h'
            });

            res.status(500).json({token: token, uid: dbuser._id.toString()});
        })
        .catch(err => {
            if(! err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
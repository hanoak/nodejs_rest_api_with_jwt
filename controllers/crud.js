const { validationResult } = require('express-validator/check');

const Book = require('../models/book');

exports.getAllBooks = (req, res, next) => {

    Book.find()
        .then(books => {
            res.status(200).json({
                message: "successfully fetched books",
                books: books
            });
        })
        .catch(err => {
            if(! err.statusCode) {
                err.statusCode = 500;
                next(err);
            }
        });
};

exports.getSingleBook = (req, res, next) => {

    const bid = req.params.bid;
    Book.findById(bid)
    .then(book => {

        if(! book) {
            const error = new Error('Could not find book.');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: "successfully fetched book",
            book: book
        });
    })
    .catch(err => {
        if(! err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    });
};


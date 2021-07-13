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

exports.postBook = (req, res, next) => {

    const errors = validationResult(req);

    if(! errors.isEmpty()) {
        const error = new Error('Validation failed, provided data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        price: req.body.price
    });

    book.save()
        .then(result => {
            res.status(201).json({
                message: 'Book successfully created!',
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

exports.putBook = (req, res, next) => {

    const errors = validationResult(req);

    if(! errors.isEmpty()) {
        const error = new Error('Validation failed, provided data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const bid = req.params.bid;

    Book.findById(bid)
        .then(book => {

            if(! book) {
                const error = new Error('Could not find book.');
                error.statusCode = 404;
                throw error;
            }

            book.name = req.body.name;
            book.author = req.body.author;
            book.price = req.body.price;

            return book.save();

        })
        .then(result => {
            res.status(200).json({ message: 'Book updated!', book: result });
        })
        .catch(err => {
            if(! err.statusCode) {
                err.statusCode = 500;
                next(err);
            }
        });
};

exports.deleteBook = (req, res, next) => {

    const bid = req.params.bid;
    Book.findById(bid)
    .then(book => {

        if(! book) {
            const error = new Error('Could not find book.');
            error.statusCode = 404;
            throw error;
        }

        return Book.findByIdAndRemove(bid);
    })
    .then(result => {
        res.status(200).json({ message: 'Book deleted.' });
    })
    .catch(err => {
        if(! err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    });
};
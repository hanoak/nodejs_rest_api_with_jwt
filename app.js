const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const crudRoutes = require('./routes/crud');

const app = express();
const MONGODBURL = "<your mongodb's cluster url here>";
app.use(express.json());

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(authRoutes);
app.use(crudRoutes);

app.use((error, req, res, next) => {

    console.log(error);
    res.status(error.statusCode || 500).json({
        message: error.message,
        data: error.data
    });

});

mongoose.connect(MONGODBURL)
    .then(result => {        
        app.listen(3000);
    })
    .catch(error => {
        console.log(error);
    });

const express = require('express');

const app = express();


app.use('/', (req, res, next) => {
    console.log('getting started.');
});


app.listen(3000);
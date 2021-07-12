const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const authHeader = req.get('Authorization');

    if(!authHeader) {
        const err = new Error("You're not authenticated");
        err.statusCode = 401;
        throw err;
    }

    const token = authHeader.split(' ')[1];
    let dtoken;
    try{
        dtoken = jwt.verify(token, 'YourSecretKeyGoesHere123');
    } catch(err) {
        err.statusCode = 500;
        throw err;
    }

    if(! dtoken) {
        const err = new Error("You're not authenticated");
        err.statusCode = 401;
        throw err;
    }
    
    next();

};
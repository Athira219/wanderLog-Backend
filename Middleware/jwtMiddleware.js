//import jwt

const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log('jwt middleware');

    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);

    try {
        const jwtResponse = jwt.verify(token, 'jwtkey')
        console.log('jwtResponse=', jwtResponse);
        
        req.payload = jwtResponse.userId
        console.log('userId=', req.payload);
        next()
    }
    catch (err) {
        res.status(401).json('Authorization failed... Please login')
    }




}

module.exports = jwtMiddleware
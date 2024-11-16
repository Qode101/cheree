const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).send('Access Denied: No Token Provided');
    }

    try {
        const verified = jwt.verify(token, 'secretKey'); // Replace 'secretKey' with your env variable in production
        req.user = verified; // Attach user info to the request object
        next();
    } catch (error) {
        res.status(401).send('Access Denied: Invalid Token');
    }
};

module.exports = authenticate;
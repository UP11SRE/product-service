const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET; 

module.exports = {

  async authenticateToken(req, res, next) {
    try {
        // Gather the jwt access token from the request header
        const auth = req.headers.authorization && req.headers.authorization.split(" ");
        console.log("---token", auth[1], secretKey);

        if (!auth || !auth[1]) {
            return res.status(401).json({ message: 'Authentication token is required' });
        }

        // Verify the token
        const decoded = jwt.verify(auth[1], secretKey);

        req.user = decoded;
        next(); // Pass the request to the next middleware
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(403).json({ message: 'Invalid token' });
    }
}

};

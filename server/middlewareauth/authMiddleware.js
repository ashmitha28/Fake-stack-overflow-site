const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'default_secret_key';

const verifyToken = (req, res, next) => {
    const userToken = req.session.token;

    if (!userToken) {
        return res.status(401).json({ message: 'Unauthorized - Token missing' });
    }

    try {
        // Verify the token
        const decodedToken = jwt.verify(userToken, secretKey); 
        req.userId = decodedToken.userId; 
        next(); 
        
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Unauthorized - Token invalid or expired' });
    }
};

module.exports = verifyToken;

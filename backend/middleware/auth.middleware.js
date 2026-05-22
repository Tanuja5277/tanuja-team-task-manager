const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {

    try {

        // Get token from headers
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({
                message: 'Access denied. No token provided'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {

        res.status(401).json({
            message: 'Invalid token'
        });

    }

};
const jwt = require('jsonwebtoken');


// Middleware to verify the authentication token
exports.verifyToken = (req, res, next )=>{

    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
         // Verify the token
        const decode = jwt.verify( token, process.env.JWT_SECRET);
        req.userId = decode.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    
  }
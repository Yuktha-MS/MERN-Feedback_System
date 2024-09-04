const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'BMSCE@2501';

const protect = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Assuming token is sent as 'Bearer TOKEN'

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add user data to request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { protect };

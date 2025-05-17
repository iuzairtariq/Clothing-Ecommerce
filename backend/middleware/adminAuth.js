import jwt from 'jsonwebtoken';
import { tokenBlacklist } from '../controllers/userController.js';

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Authorization header missing',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token missing in header',
      });
    }

    // 🧹 Clean expired tokens
    const now = Date.now();
    for (let i = tokenBlacklist.length - 1; i >= 0; i--) {
      if (tokenBlacklist[i].expiresAt < now) {
        tokenBlacklist.splice(i, 1);
      }
    }

    // ❌ Check blacklist
    const isBlacklisted = tokenBlacklist.some((item) => item.token === token);
    if (isBlacklisted) {
      return res.json({
        success: false,
        message: 'Session expired. Please login again.',
      });
    }

    // ✅ Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.json({
        success: false,
        message: 'Invalid or expired token. Please login again.',
      });
    }

    // 🛡️ Admin identity check (only check email)
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: 'Access denied. Not an admin.',
      });
    }

    // ✅ Proceed to next
    next();
  } catch (error) {
    console.error('Admin Auth Error:', error.message);
    res.json({
      success: false,
      message: 'Server error in authentication',
    });
  }
};

export default adminAuth;

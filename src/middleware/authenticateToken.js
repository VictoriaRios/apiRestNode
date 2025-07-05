import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const authenticateToken = (req, res, next) => {
    const authenticateHeader = req.headers['authorization'];
    const token = authenticateHeader && authenticateHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}
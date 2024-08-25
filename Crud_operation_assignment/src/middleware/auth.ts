import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../entity/User';

interface JwtPayload {
    userId: number;
    role: UserRole; // Use the UserRole enum
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret') as JwtPayload;
        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

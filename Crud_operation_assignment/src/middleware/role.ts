import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../entity/User';

interface JwtPayload {
    userId: number;
    role: UserRole;
}

export const checkRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, 'your_jwt_secret') as JwtPayload;

            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            req.user = decoded; // Attaching user info to request object
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
};

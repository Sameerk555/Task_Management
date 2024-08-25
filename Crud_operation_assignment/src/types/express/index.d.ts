import { Request } from 'express';
import { UserRole } from '../../entity/User';

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            userId: number;
            role: UserRole;
        };
    }
}

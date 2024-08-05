import { getUserById } from '@/services/userService';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '@/types/user';
import { Nullable } from '@/types';

export interface IAuthRequest extends Request {
    user?: Nullable<IUser>;
}

const JWT_SECRET = process.env.JWT_SECRET ?? 'your_jwt_secret';

export const authenticateJWT = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        const userId = payload.userId as number;
        const user = await getUserById(userId);
        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Unauthorized' });
    }
};

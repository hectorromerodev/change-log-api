import { sign as jwtSign, verify as jwtVerify} from 'jsonwebtoken';
import { compare as bcryptCompare, hash as bcryptHash } from 'bcrypt';

import { User } from '../interfaces/user.interface';
import type  { NextFunction, Request, Response } from 'express';

const JWT_SECRET =  process.env.JWT_SECRET || 'secret';

export const comparePassword = (password: string, hash: string) => {
    return bcryptCompare(password, hash);
};

export const hashPassword = (password: string) => {
    return bcryptHash(password, 10);
}

export const createJWT = (user: User) => {
    const { id, username } = user;
    const token = jwtSign({ id, username }, JWT_SECRET, { expiresIn: '1h' });
    return token;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const [, token] = bearer.split(' ');
    if(!token) {
        return res.status(401).json({ message: 'Not valid token' });
    }

    try {
        const user = jwtVerify(token, JWT_SECRET);
        req.body.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Not valid token' });
    }

}
import e from 'express';
import prisma from '../db';
import { hashPassword, createJWT, comparePassword } from '../modules/auth';
import type { NextFunction, Request, Response } from 'express';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.create({
            data: {
                username,
                password: await hashPassword(password),
            },
        });
        const token = createJWT(user);
        res.status(201).json({ token });
    }catch(err: any) {
        err.type = 'input';
        next(err);
    }
}

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });
        
        const token = createJWT(user);
        res.status(200).json({ token });
    } catch(err: any){
        err.type = 'input';
        next(err);
    }
}
import { NextFunction, Request, Response } from 'express'
import prisma from '../db'

export const getUpdates = async (req: Request, res: Response, next: NextFunction) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.body.user.id
        },
        include: {
            updates: true
        }
    });
    const updates = products.map(product => product.updates).flat();
    res.status(200).json({ data: updates });
}

export const getOneUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const update = await prisma.update.findFirst({
        where: {
            id
        }
    });
    res.status(200).json({ data: update });
}

export const createUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const {  productId, user, ...rest } = req.body;
    
    const product = await prisma.product.findUnique({
        where: {
            id: productId,
        }
    });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    const update = await prisma.update.create({
        data: {
            ...rest,
            product: {
                connect: {
                    id: product.id
                }
            }
        }
    });
    
    res.status(200).json({ data: update });
}

export const updateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { productId, user, ...rest } = req.body;
    
    const product = await prisma.product.findUnique({
        where: {
            id: productId,
        }
    });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    const update = await prisma.update.update({
        where: {
            id
        },
        data: {
            ...rest,
            product: {
                connect: {
                    id: product.id
                }
            }
        }
    });
    
    res.status(200).json({ data: update });
}

export const deleteUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    
    const product = await prisma.product.findFirst({
        where: {
            belongsToId: req.body.user.id,
            updates: {
                some: {
                    id
                }
            }
        }, 
        // include: {
        //     updates: true
        // }
    });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    const update = await prisma.update.delete({
        where: {
            id
        }
    });
    res.status(200).json({ data: update });
}
import { NextFunction, Request, Response } from "express";
import prisma from "../db";

// GET ALL PRODUCTS
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body.user;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                products: true,
            }
        });
        res.status(200);
        res.json({
            data: user?.products
        })
    } catch (error) {
        next(error);
    }
};

// GET ONE PRODUCT
export const getOneProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.body.id;
    try {
        const product = await prisma.product.findFirst({
            where: {
                id,
                belongsToId: userId,
            }
        });
        res.status(200);
        res.json({
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// CREATE PRODUCT
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const userId = req.body.user.id;
    try {
        const product = await prisma.product.create({
            data: {
                name,
                belongsToId: userId,
            }
        });
        res.status(200);
        res.json({
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE PRODUCT
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.body.user.id;
    try {
        const product = await prisma.product.update({
            where: {
                id_belongsToId: {
                    id,
                    belongsToId: userId
                }
            },
            data: {
                name,
            }
        });
        res.status(200);
        res.json({
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// DELETE PRODUCT
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.body.user.id;
    try {
        const product = await prisma.product.delete({
            where: {
                id_belongsToId: {
                    id,
                    belongsToId: userId
                }
            }
        });
        res.status(200);
        res.json({
            data: product
        });
    } catch (error) {
        next(error);
    }
};


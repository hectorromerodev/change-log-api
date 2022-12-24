import { Request, Response, NextFunction } from "express";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    switch (err.type) {
        case 'auth':
            res.status(401).json({message: 'Unauthorized'});
            break;
        case 'input':
            res.status(400).json({message: 'Bad Input Request'});
            break;
        default:
            res.status(500).json({message: 'Internal Server Error'});
            break;
    }

}
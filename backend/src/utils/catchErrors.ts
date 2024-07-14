import { Request, NextFunction, Response } from "express";

type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<any>;


const catchErrors = (controller: AsyncController):AsyncController => async (req, res, next) =>{
    try {
        await controller(req, res, next);
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

export default catchErrors;
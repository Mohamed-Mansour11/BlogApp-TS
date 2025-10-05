import { NextFunction, Request, Response } from "express";

export const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((error: Error) => {
            return next(new Error(error.message, { cause: error.cause || 500 }))
        })
    }
}

export const globalErrorHandling = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        return res.status(Number(error.cause) || 500).json({ message: error.message })
    }
}
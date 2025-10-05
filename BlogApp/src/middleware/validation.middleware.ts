import { NextFunction, Request, Response } from "express";
import { AnySchema } from "joi";

export const validation = (schema: AnySchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        
        const dataToValidate: { [key: string]: any } = {};
        const validationKeys = ['body', 'params', 'query'];
        
        validationKeys.forEach(key => {
            if (req[key as keyof Request] && Object.keys(req[key as keyof Request]).length) {
                dataToValidate[key] = req[key as keyof Request];
            }
        });

        const { error } = schema.validate(dataToValidate, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(err => err.message);
            return res.status(400).json({ messages: errorMessages });
        }
        next();
    }
}
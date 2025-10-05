import { Response } from "express";

export const successResponse = (res: Response, message = "Done", status = 200, data = {}) => {
    return res.status(status).json({ message, data });
};
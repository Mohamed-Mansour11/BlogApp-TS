import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/response/error.response";
import { verify } from "jsonwebtoken";
import UserModel from "../DB/model/user.model";
import { Roles } from "../modules/user/user.dto";

export interface IAuthReq extends Request {
    user?: any;
}

export const auth = (accessRoles: Roles[] = []) => {
    return asyncHandler(async (req: IAuthReq, res: Response, next: NextFunction) => {
        const [bearer, token] = req.headers.authorization?.split(" ") || [];
        if (bearer !== 'Bearer' || !token) {
            return next(new Error('Invalid token', { cause: 401 }));
        }

        const decoded = verify(token, process.env.TOKEN_SIGNATURE as string) as { id: string, type: string };
        if (!decoded?.id || decoded.type !== 'access') {
            return next(new Error("Invalid token payload", { cause: 401 }));
        }

        const user = await UserModel.findById(decoded.id);
        if (!user) {
            return next(new Error("User not found", { cause: 404 }));
        }

        if (accessRoles.length && !accessRoles.includes(user.role as Roles)) {
            return next(new Error('Not authorized account', { cause: 403 }));
        }
        
        req.user = user;
        next();
    })
}
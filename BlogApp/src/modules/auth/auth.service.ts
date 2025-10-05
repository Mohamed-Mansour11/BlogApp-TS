import { NextFunction, Request, Response } from "express";
import { ISignup, ILogin } from "./auth.dto";
import UserModel from "../../../DB/model/user.model";
import { sendEmail } from "../../utils/email/send.email";
import { sign, verify } from "jsonwebtoken";
import { compareHash, generateHash } from "../../utils/security/hash.security";
import { successResponse } from "../../utils/response/success.response";
import { Types } from "mongoose";

class AuthenticationService {
    constructor(private model = UserModel) { }

    private generateToken(payload: { id: Types.ObjectId, type: string }): string {
        const expiresIn = payload.type === 'refresh' ? '7d' : '1h';
        const token = sign(payload, process.env.TOKEN_SIGNATURE as string, { expiresIn });
        return token;
    }

    public signup = async (req: Request, res: Response, next: NextFunction) => {
        const { username, email, password } = req.body as ISignup;
        const checkUser = await this.model.findOne({ email });
        if (checkUser) {
            return next(new Error('Email exist', { cause: 409 }))
        }
        const hashedPassword = generateHash(password!, parseInt(process.env.SALT as string))
        const user = await this.model.create({ username, email, password: hashedPassword });

        await sendEmail({ to: user.email, subject: 'Confirm Your Email', text: 'Welcome!', html: '<h1>Welcome!</h1>' });
        return successResponse(res, "User created successfully", 201, { user });
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body as ILogin;
        const user = await this.model.findOne({ email });
        if (!user || !compareHash(password, user.password!)) {
            return next(new Error('Invalid credentials', { cause: 400 }))
        }

        const accessToken = this.generateToken({ id: user._id, type: 'access' });
        const refreshToken = this.generateToken({ id: user._id, type: 'refresh' });
        
        return successResponse(res, "Login successful", 200, { accessToken, refreshToken });
    }

    public refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        const { refreshToken } = req.body;
        const decoded = verify(refreshToken, process.env.TOKEN_SIGNATURE as string) as { id: string, type: string };
        
        if (!decoded?.id || decoded.type !== 'refresh') {
            return next(new Error("Invalid refresh token", { cause: 400 }));
        }

        const user = await this.model.findById(decoded.id);
        if (!user) {
            return next(new Error("User not found", { cause: 404 }));
        }

        const newAccessToken = this.generateToken({ id: user._id, type: 'access' });
        return successResponse(res, "Access token refreshed successfully", 200, { accessToken: newAccessToken });
    }
}
export default new AuthenticationService();
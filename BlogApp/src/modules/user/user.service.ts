import { IAuthReq } from "../../middleware/auth.middleware";
import { successResponse } from "../../utils/response/success.response";
import { Response } from "express";

class UserService {
    public profile = (req: IAuthReq, res: Response) => {
        return successResponse(res, "User profile data", 200, { user: req.user });
    }
}

export default new UserService();
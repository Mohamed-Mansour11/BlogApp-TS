import { Router } from "express";
import authService from "./auth.service";
import { asyncHandler } from "../../utils/response/error.response";
import { validation } from "../../middleware/validation.middleware";
import * as validators from './auth.validation'

const router = Router();
router.post('/signup', validation(validators.signup), asyncHandler(authService.signup));
router.post('/login', validation(validators.login), asyncHandler(authService.login));
router.post(
    '/refresh-token',
    validation(validators.refreshToken),
    asyncHandler(authService.refreshToken)
);

export default router;
import { Router } from "express";
import userService from './user.service';
import { auth } from "../../middleware/auth.middleware";
import { Roles } from "./user.dto";
const router = Router();

router.get('/profile', auth([Roles.User, Roles.Admin]), userService.profile)

export default router;
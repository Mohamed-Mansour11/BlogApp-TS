import { Router } from "express";
import { auth } from "../../middleware/auth.middleware";
import blogService from "./blog.service";
import { validation } from "../../middleware/validation.middleware";
import * as validators from './blog.validation';

const router = Router();

router.post('/', auth(), validation(validators.createBlog), blogService.create);
router.get('/', blogService.list);
router.put('/:id', auth(), validation(validators.updateBlog), blogService.update);
router.delete('/:id', auth(), validation(validators.deleteBlog), blogService.delete);

export default router;
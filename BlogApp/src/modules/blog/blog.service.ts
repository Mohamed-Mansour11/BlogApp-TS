import { NextFunction, Response } from "express";
import { IAuthReq } from "../../middleware/auth.middleware";
import BlogModel from "../../../DB/model/blog.model";
import { successResponse } from "../../utils/response/success.response";

class BlogService {
    constructor(private blogModel = BlogModel) { }

    public create = async (req: IAuthReq, res: Response) => {
        const { title, description } = req.body;
        const blog = await this.blogModel.create({ title, description, createdBy: req.user._id });
        return successResponse(res, "Blog created", 201, { blog });
    }

    public list = async (req: IAuthReq, res: Response) => {
        const blogs = await this.blogModel.find({}).populate({
            path: 'createdBy',
            select: 'username -_id'
        });
        return successResponse(res, "Blogs list", 200, { blogs });
    }

    public update = async (req: IAuthReq, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { title, description } = req.body;
        const blog = await this.blogModel.findOneAndUpdate(
            { _id: id, createdBy: req.user._id }, 
            { title, description },
            { new: true }
        );
        if (!blog) {
            return next(new Error("Blog not found or you are not authorized to edit it", { cause: 404 }));
        }
        return successResponse(res, "Blog updated successfully", 200, { blog });
    }

    public delete = async (req: IAuthReq, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const blog = await this.blogModel.findOneAndDelete({ _id: id, createdBy: req.user._id });
        if (!blog) {
            return next(new Error("Blog not found or you are not authorized to delete it", { cause: 404 }));
        }
        return successResponse(res, "Blog deleted successfully", 200);
    }
}

export default new BlogService();
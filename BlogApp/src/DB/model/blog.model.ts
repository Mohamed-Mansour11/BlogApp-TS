import { Schema, Types, model } from "mongoose";

interface IBlog {
    title: string;
    description: string;
    createdBy: Types.ObjectId;
}

const blogSchema = new Schema<IBlog>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});

const BlogModel = model<IBlog>('Blog', blogSchema);
export default BlogModel;
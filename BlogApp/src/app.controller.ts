import express from 'express';
import { globalErrorHandling } from './utils/response/error.response';
import authController from './modules/auth/auth.controller';
import userController from './modules/user/user.controller';
import blogController from './modules/blog/blog.controller';
import connectDB from './DB/connect';

export const bootstrap = (app: express.Application) => {
    connectDB();
    app.use(express.json());
    app.use('/auth', authController);
    app.use('/user', userController);
    app.use('/blog', blogController);
    app.use(globalErrorHandling);
}
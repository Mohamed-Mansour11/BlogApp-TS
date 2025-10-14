import Joi from "joi";

export const createBlog = Joi.object({
    body: Joi.object({
        title: Joi.string().min(2).max(100).required(),
        description: Joi.string().min(10).required()
    }),
    params: Joi.any(),
    query: Joi.any()
});

export const updateBlog = Joi.object({
    body: Joi.object({
        title: Joi.string().min(2).max(100),
        description: Joi.string().min(10)
    }).or('title', 'description'),
    params: Joi.object({
        id: Joi.string().hex().length(24).required()
    }),
    query: Joi.any()
});


export const deleteBlog = Joi.object({
    params: Joi.object({
        id: Joi.string().hex().length(24).required()
    }),
    body: Joi.any(),
    query: Joi.any()
});
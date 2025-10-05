import Joi from "joi";

export const signup = Joi.object({
    body: Joi.object({
        username: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    }),
    params: Joi.any(),
    query: Joi.any()
});

export const login = Joi.object({
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }),
    params: Joi.any(),
    query: Joi.any()
});

export const refreshToken = Joi.object({
    body: Joi.object({
        refreshToken: Joi.string().required()
    }),
    params: Joi.any(),
    query: Joi.any()
});
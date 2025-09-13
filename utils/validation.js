import Joi from "joi";

export const employeeSchema = Joi.object({
    department_id: Joi.number().integer().positive().required(),
    name: Joi.string().trim().min(3).max(255).required(),
    dob: Joi.date().iso().less("now").required(),
    phone: Joi.string()
        .trim()
        .pattern(/^[0-9]{10,15}$/)
        .required()
        .messages({
            "string.pattern.base":
                "Phone number must be between 10 and 15 digits.",
        }),
    email: Joi.string().trim().email().required(),
    salary: Joi.number().positive().required(),
    status: Joi.string().valid("active", "inactive").default("active"),
    photo: Joi.string().uri().allow(null, ""),
});

export const employeeUpdateSchema = Joi.object({
    department_id: Joi.number().integer().positive(),
    name: Joi.string().trim().min(3).max(255),
    dob: Joi.date().iso().less("now"),
    phone: Joi.string()
        .trim()
        .pattern(/^[0-9]{10,15}$/)
        .messages({
            "string.pattern.base":
                "Phone number must be between 10 and 15 digits.",
        }),
    email: Joi.string().trim().email(),
    salary: Joi.number().positive(),
    status: Joi.string().valid("active", "inactive"),
    photo: Joi.string().uri().allow(null, ""),
}).min(1);

export const validateData = (schema, data) => {
    const { error } = schema.validate(data);
    if (error) {
        return {
            isValid: false,
            message: error.details[0].message,
        };
    }
    return { isValid: true, message: null };
};

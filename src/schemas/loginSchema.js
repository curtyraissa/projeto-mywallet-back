import joi from joi;

// Schema
const loginSchema = joi.object({
    email: joi.string().email().required(),
    senha: joi.string().min(3).required(),
});
export default loginSchema
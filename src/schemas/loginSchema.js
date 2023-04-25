import joi from joi;

// Schema
const loginSchema = joi.object({
    email: joi.string().email().required(),
    senha: joi.string().required(),
});
export default loginSchema
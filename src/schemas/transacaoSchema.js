import joi from joi;

// Schema
const loginSchema = joi.object({
    valor: joi.number().positive().precision(2).required(),
    descricao: joi.string().required(),
});
export default loginSchema
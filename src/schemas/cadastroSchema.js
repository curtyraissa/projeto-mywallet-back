import joi from "joi";

// Schemas
const cadastroSchema = joi.object({
  nome: joi.string().min(3).required(),
  email: joi.string().email().required(),
  senha: joi.string().min(3).required(),
});
export default cadastroSchema;

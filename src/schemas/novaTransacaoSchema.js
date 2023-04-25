import joi from joi;

// Schema
const novaTransacaoSchema = joi.object({
    valor: joi.number().positive().precision(2).required(),
    descricao: joi.string().required(),
    // tipo: joi.string().valid("credito", "debito")
});
export default novaTransacaoSchema
import novaTransacaoSchema from "../schemas/novaTransacaoSchema.js";

export const novaTransacaoMiddle = (req, res, next) => {
  const { valor, descricao } = req.body;

  if (
    novaTransacaoSchema.validate({ Valor: valor, Descricao: descricao })
      .error !== undefined
  ) {
    if (
      novaTransacaoSchema.validate({ Valor: valor, Descricao: descricao }).error
        .message === "Valor maior que 0"
    ) {
        return res.sendStatus(422);
    }
    if (
      novaTransacaoSchema.validate({ Valor: valor, Descricao: descricao }).error
        .message === "Valor inválido"
    ) {
        return res.sendStatus(422);
    }
    if (
      novaTransacaoSchema.validate({ Valor: valor, Descricao: descricao }).error
        .message === "Descrição invalida"
    ) {
        return res.sendStatus(422);
    }

    return res
      .status(422)
      .send(
        novaTransacaoSchema.validate({ Valor: valor, Descricao: descricao })
          .error.message
      );
  }

  next();
}

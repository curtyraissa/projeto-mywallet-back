import cadastroSchema from "../schemas/cadastroSchema.js";

export const cadastroMiddle = (req, res, next) => {
  const { nome, email, senha } = req.body;

  if (
    cadastroSchema.validate({ Nome: nome, Email: email, Senha: senha })
      .error !== undefined
  ) {
    if (
      cadastroSchema.validate({ Nome: nome, Email: email, Senha: senha })
        .error.message === "Nome obrigatório"
    ) {
        return res.sendStatus(422);
    }
    if (
      cadastroSchema.validate({ Nome: nome, Email: email, Senha: senha })
        .error.message === "E-mail obrigatório"
    ) {
        return res.sendStatus(422);
    }
    if (
      cadastroSchema.validate({ Nome: nome, Email: email, Senha: senha })
        .error.message === "Senha obrigatória"
    ) {
        return res.sendStatus(422);
    }
    if (
      cadastroSchema.validate({ Nome: nome, Email: email, Senha: senha })
        .error.message ===
        "Senha minima 3 caracteres"
    ) {
        return res.sendStatus(422);
    }

    return res
      .status(422)
      .send(
        cadastroSchema.validate({ Nome: nome, Email: email, Senha: senha })
          .error.message
      );
  }
  next();
}
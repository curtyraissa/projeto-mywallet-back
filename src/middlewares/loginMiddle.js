import loginSchema from "../schemas/loginSchema.js";

export const LoginMiddle = (req, res, next) => {
  const { email, senha } = req.body;

  if (
    loginSchema.validate({ Email: email, Senha: senha }).error !== undefined
  ) {
    if (
      loginSchema.validate({ Email: email, Senha: senha }).error.message ===
      "E-mail obrigatório"
    ) {
      return res.sendStatus(422);
    }
    if (
      loginSchema.validate({ Email: email, Senha: senha }).error.message ===
      "E-mail inválido"
    ) {
      return res.sendStatus(422);
    }
    if (
      loginSchema.validate({ Email: email, Senha: senha }).error.message ===
      "Senha obrigatória"
    ) {
      return res.sendStatus(422);
    }

    return res
      .status(422)
      .send(loginSchema.validate({ Email: email, Senha: senha }).error.message);
  }

  next();
};

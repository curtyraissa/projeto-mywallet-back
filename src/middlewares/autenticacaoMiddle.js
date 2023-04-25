export const autenticacaoMiddle = (req, res, next) => {
  // o cliente envia um header de authorization com o token
  const { authorization } = req.headers;

  // pegar o token sem a palavra Bearer
  const token = authorization?.replace("Bearer ", "");

  // se nao houver token, nao ha autozicao para continuar
  if (!token) res.status(422).send("Token inexistente");

  try {
    //caso o token exista, descobrir se é valido
    const sessao = db.collection("sessoes").findOne({ token: token });
    if (!sessao) return res.status(401).send("Token inválido");
  } catch (err) {
    return res.status(422).send(err);
  }

  next();
};

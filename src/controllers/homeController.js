import { db } from "../database/database.js";

export async function getHome(req, res) {
  // o cliente envia um header de authorization com o token
  const { authorization } = req.headers;

  // pegar o token sem a palavra Bearer
  const token = authorization?.replace("Bearer ", "");

  // se nao houver token, nao ha autozicao para continuar
  if (!token) res.status(401).send("Token inexistente");

  try {
    //caso o token exista, descobrir se é valido
    const sessao = await db.collection("sessoes").findOne({ token });
    if (!sessao) return res.status(401).send("Token inválido");
    const operacao = await db
      .collection("transacoes")
      .find({ usuario: sessao.idUsuario });
    res.status(200).send(operacao);
  } catch (err) {
    return res.sendStatus(500);
  }
}

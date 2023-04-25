import db from "../database/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function getNovaTransacao(req, res) {
  // o cliente envia um header de authorization com o token
  const { valor, descricao, tipo } = req.body;

  const novaTransacao = {
    valor: valor,
    descricao: descricao,
    tipo: tipo,
    data: dayjs().format("DD/MM"),
  };

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

    const usuario = await db
      .collection("usuarios")
      .findOne({ _id: new ObjectId(sessao.idUsuario) });
    if (!usuario) return res.status(401).send("Usuario inválido");

    await db
      .collection("transacoes")
      .insertOne({ novaTransacao, usuario: sessao.idUsuario });
    res.status(200).send("Transação realizada");
  } catch (err) {
    res.sendStatus(500);
  }
}

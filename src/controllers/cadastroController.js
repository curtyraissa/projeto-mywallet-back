import { db } from "../database/database.js";
import bcrypt from "bcrypt";
import cadastroSchema from "../schemas/cadastroSchema.js"

export async function getCadastro(req, res) {
  const { nome, email, senha } = req.body;

  const validation = cadastroSchema.validate(req.body, { aboutEarly: false });
  if (validation.error) {
    res
      .status(422)
      .send(validation.error.details.map((detail) => detail.message));
  }
  res.sendStatus(201);

  try {
    //verificar se esse e-mail ja foi cadastrado
    const usuario = await db.collection("usuarios").findOne({ email });
    if (usuario) return res.status(409).send("E-mail já cadastrado");

    //criptografar senha
    const hash = bcrypt.hashSync(senha, 10);

    //criar conta e guardar senha encriptografada no bd
    await db.collection("usuarios").insertOne({ nome, email, senha: hash });
    res.status(201).send("Conta criada com sucesso!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

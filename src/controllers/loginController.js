import db from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import loginSchema from "../schemas/loginSchema.js"

export async function getLogin(req, res) {
    const { email, senha } = req.body;
  
    const validation = loginSchema.validate(req.body, { aboutEarly: false });
    if (validation.error) {
      res
        .status(422)
        .send(validation.error.details.map((detail) => detail.message));
    }
    res.sendStatus(201);
  
    try {
      //verificar se o e-mail esta cadastrado
      const usuario = await db.collection("usuarios").findOne({ email });
      if (!usuario) return res.status(404).send("E-mail não cadastrado");
  
      //verificar se a senha digitada corresponde com a criptografada
      const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);
      if (!senhaCorreta) return res.status(401).send("Senha Incorreta");
  
      //se deu tudo certo, criar um token para enviar ao usuario
      const token = uuid();
  
      //guardar o token e o id do usuario para saber que ele esta logado
      await db.collection("sessoes").insertOne({ idUsuario: usuario._id, token });
  
      //finalizar com status de sucesso e enviar token para o cliente
      res.status(200).send(token);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
import express from "express";
import cors from "cors";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import dayjs from "dayjs"

// Criação do servidor
const app = express();

// Configurações
app.use(cors());
app.use(express.json());
dotenv.config();

// Endpoints
app.post("/cadastro", async (req, res) => {
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
});

// rotas
app.post("/", getLogin);
app.post("/nova-transacao/:tipo", getNovaTransacao);
app.get("/home", getHome);

//funcoes
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

export async function getNovaTransacao(req, res) {

}

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

    // guardar o token e o id, tendo o id, procurar dados
    const usuario = await db
      .collection("usuarios")
      .findOne({ _id: new ObjectId(sessao.idUsuario) });

  //   // o usuario possui _id, nome e senha, mas nao podemos enviar a senha
  //   delete usuario.senha;

  //   //enviar resposta
  //   res.send(usuario);
  // } catch (err) {
  //   res.status(500).send(err.message);
  // }

  //caso o usuario exista, descobrir se ja tem cadastro
  if (!usuario) {
    return res.status(404).send("Usuario inexistente");
  }
} catch (err) {
  return res.status(501).send(err);
}

try {
  const lista = await db
  .collection("transacao")
  .find({idUsuario: sessao.idUsuario })
  const data = {usuario: usuario.nome, lista}
  return res.status(200).send(data)
} catch(err){
  return res.status(500).send(err)
}

// Deixa o app escutando, à espera de requisições
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

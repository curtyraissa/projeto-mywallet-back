import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Rotas
import { cadastro } from "./routers/cadastroRouter.js";
import { login } from "./routers/loginRouter.js";
import { novaTransacao } from "./routers/novaTransacaoRouter.js";
import { home } from "./routers/homeRouter.js";

// Criação do servidor
const app = express();

// Configurações
app.use(cors());
app.use(express.json());
dotenv.config();

// Endpoints
app.post("/cadastro", cadastro);
app.post("/", login);
app.post("/nova-transacao/:tipo", novaTransacao);
app.get("/home", home);

// Deixa o app escutando, à espera de requisições
app.listen(process.env.PORT, () =>
  console.log("Servidor rodando na porta" + process.env.PORT)
);

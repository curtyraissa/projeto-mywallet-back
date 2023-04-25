import express from "express";

import { cadastroMiddle } from "../middlewares/cadastroMiddle.js";
import { getCadastro } from "../controllers/cadastroController.js";

const cadastro = express();
cadastro.post("/cadastro", cadastroMiddle, getCadastro);
export {cadastro};
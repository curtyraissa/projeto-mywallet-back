import express from "express";
import cors from "cors";

import { novaTransacaoMiddle } from "../middlewares/novaTransacaoMiddle.js";
import { getNovaTransacao } from "../controllers/novaTransacaoController.js"

const novaTransacao = express();
novaTransacao.use(cors());
novaTransacao.use(express.json());
novaTransacao.post(
  "/nova-transacao/:tipo",
  novaTransacaoMiddle,
  getNovaTransacao
);

export { novaTransacao };

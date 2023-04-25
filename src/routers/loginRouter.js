import express from "express";
import cors from "cors";

import { loginMiddle } from "../middlewares/loginMiddle.js";
import { getLogin } from "../controllers/loginController.js";

const login = express();
login.use(cors());
login.use(express.json());
login.post("/", loginMiddle, getLogin);
export {login};
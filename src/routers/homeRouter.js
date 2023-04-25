import express from "express";
import cors from "cors";

import { getHome } from "../controllers/homeController.js";

const home = express();
home.use(cors());
home.use(express.json());
home.use("/home", getHome);
export { home };
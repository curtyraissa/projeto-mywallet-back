import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Configurações
dotenv.config();

// Conexão com o Banco de Dados
let db;
const mongoClient = new MongoClient(process.env.MONGO_URI);
try {
  await mongoClient.connect();
  db = mongoClient.db("dbwallet");
  console.log("MongoDB conectado!");
} catch (err) {
  console.log(err.message);
  alert(err);
}
export default db;

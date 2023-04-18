import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"

// Criação do servidor
const app = express()

// Configurações
app.use(express.json())
app.use(cors())
dotenv.config()

// Conexão com o Banco de Dados
let db
const mongoClient = new MongoClient(process.env.DATABASE_URL)
mongoClient.connect()
    .then(() => db = mongoClient.db())
    .catch((err) => console.log(err.message))


    // Endpoints
    app.post("/cadastro", (req, res) => {
        const { xxx } = req.body
        return res.status(422).send("Todos os campos são obrigatórios!")
    })
    
    app.post("/login", (req, res) => {
        const { xxx } = req.body
        return res.status(422).send("Todos os campos são obrigatórios!")
    })
    
    app.post("/nova-transacao/:tipo", (req, res) => {
        const { xxx } = req.body
        return res.status(422).send("Todos os campos são obrigatórios!")
    })
    
    app.get("/home", (req, res) => {
        db.collection("home").find().toArray()
            .then((memes) => res.status(200).send(home))
            .catch((err) => res.status(500).send(err.message))
    })

// Deixa o app escutando, à espera de requisições
const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
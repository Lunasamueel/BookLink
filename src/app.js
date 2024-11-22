import express from "express";
import Livro from './models/Livro.js';
import './config/db.js';


const app = express();
// import mongoose from 'mongoose';
// import bodyParser from "body-parser";
import livro from './models/Livro.js'

app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).send("curso de nodejs");
})

app.get("/livros", async (req, res) => {
    const listaLivros = await livro.find({});
    res.status(200).json(listaLivros);
})

app.post("/livros", async (req, res) => {
    try {
        const {titulo, isbn, anoPublicacao} = req.body;

        const NovoLivro = new Livro({
            titulo, isbn, anoPublicacao
        })

        await NovoLivro.save();
        res.status(201).json({ message: 'livro criado com sucesso!', livro: NovoLivro });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar livro' });
    }
})

export default app;
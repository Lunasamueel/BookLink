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
  

app.put('/livros/:id', async(req, res) => {
    
    try {
        const {id} = req.params;
        const {titulo, editora, preco, anoPublicacao, paginas} = req.body;

        if(!titulo || !editora || !preco || !anoPublicacao || !paginas){
            return res.status(400).json({error: "Todos os campos são obrigatórios."});
        }
    
        const livro = await Livro.findByIdAndUpdate(id,
            {titulo, editora, preco, anoPublicacao, paginas},
            {new: true, runValidators: true}
        );
    
        if(!livro){
            return res.status(400).json({error: "Livro não encontrado."})
        }
    
        res.status(200).json(livro);
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({error: "Erro ao atualizar livro."})
    }
})



export default app;
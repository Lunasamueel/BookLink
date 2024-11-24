import mongoose from "mongoose";

const AutorSchema = new mongoose.Schema({
    id: {
        Type: mongoose.Schema.Types.ObjectId
    },
    nome: {
        Type: String,
        require: true
    },
    nascionalidade: {
        Type: String,
        require: true
    },
    dataNascimento: {
        Type: Date,
        require: true
    },
    livros: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livro'
    }],
})

const Autor = mongoose.model('Autor', AutorSchema);

export default Autor;
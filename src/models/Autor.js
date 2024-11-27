import mongoose from "mongoose";


const AutorSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    nome: {
        type: String,
        require: true
    },
    nacionalidade: {
        type: String,
        require: true
    },
    dataNascimento: {
        type: Date,
        require: true
    },
    livros: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livro'
    }],
    
}, {versionKey: false})

const Autor = mongoose.model('Autor', AutorSchema);

export default Autor;
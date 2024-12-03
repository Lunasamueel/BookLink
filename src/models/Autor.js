import mongoose from "mongoose";


const AutorSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    nome: {
        type: String,
        required: [true, "O nome do(a) autor(a) é obrigatório"]
    },
    nacionalidade: {
        type: String,
        required: [true, "A nacionalidade do(a) autor(a) é obrigatório"]
    },
    dataNascimento: {
        type: Date,
        required: [true, "A data de nascimento do(a) autor(a) é obrigatório"]
    },
    livros: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livro',
        required: [true, "Os livros do(a) autor(a) são obrigatórios"]
    }],
    
}, {versionKey: false})

const Autor = mongoose.model('Autor', AutorSchema);

export default Autor;
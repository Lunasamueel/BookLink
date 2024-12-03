import mongoose from 'mongoose';  

const LivroSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    titulo: {
        type: String,
        required: true
    },
    editora: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isFinite, // Valida se é um número finito
            message: 'O valor de "Preço" deve ser um número'
          }
    },
    paginas: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isFinite, // Valida se é um número finito
            message: 'O valor de "paginas" deve ser um número'
          }
    },
    anoPublicacao: {
        type: Number,
        required: true
    },
    autor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Autor' // Referência ao modelo Autor
    }
}, {versionKey: false})

const Livro = mongoose.model('Livro', LivroSchema);

export default Livro;
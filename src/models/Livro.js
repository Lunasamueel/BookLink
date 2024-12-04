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
            validator: function(value) {
              return typeof value === 'Number' && !isNaN(value); // Verifica se o valor é um número
            },
            message: 'O campo preço deve ser um número'
          }
    },
    paginas: {
        type: Number,
        required: true,
        min:[10, "O número de paginas deve estar entre 0 e 5000"],
        max: [5000, "O número de paginas deve estar entre 0 e 5000"],
        validate: {
            validator: function(value) {
              return typeof value === 'Number' && !isNaN(value); // Verifica se o valor é um número
            },
            message: 'O campo paginas deve ser um número'
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
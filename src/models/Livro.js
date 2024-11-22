import mongoose from 'mongoose';  

const LivroSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    titulo: {
        type: String,
        require: true
    },
    editora: {
        type: String,
        require: true
    },
    preco: {
        type: Number,
        require: true
    },
    paginas: {
        type: Number,
        require: true
    },
    anoPublicacao: {
        type: Number,
        require: true
    }
}, {versionKey: false})

const Livro = mongoose.model('Livro', LivroSchema);

export default Livro;
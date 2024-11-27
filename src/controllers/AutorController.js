import '../config/db.js';
import Autor from  '../models/Autor.js';

class AutorController {

    static async listarAutores(req, res){
        try {
            const autores = await Autor.find({}).populate('livros');

            if(!autores){
                return res.status(400).json({error: "Nao foram encontrados autores."});
            }

            return res.status(200).json({message: "Autores encontrados com sucesso.", autores});

        } catch (error) {
            return res.status(500).json({error: "Erro ao buscar autor."});
        }

    }

    static async buscaAutorPorId(req, res) {

        try {
            const { id } = req.params;

            const autor = await Autor.findById(id).populate('livros');            
        
            if (!autor) {
                return res.status(400).json({ error: 'Nenhum autor encontrado.' });
            }

            return res.status(200).json({ message: "Autor encontrado com sucesso.", autor });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro ao buscar autor." })
        }

    }

    static async atualizarAutor(req, res) {
        try {
            const { id } = req.params;
            const { nome, nacionalidade, dataNascimento, livros } = req.body;

            if (!nome || !nacionalidade || !dataNascimento || !livros ) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios." });
            }

            const autor = await Autor.findByIdAndUpdate(id,
                { nome, nacionalidade, dataNascimento, livros },
                { new: true, runValidators: true }
            );

            if (!autor) {
                return res.status(400).json({ error: "Autor não encontrado." })
            }

            return res.status(200).json(autor);
        } catch (error) {
            console.log(error);

            return res.status(500).json({ error: "Erro ao atualizar Autor." })
        }
    }

    static async cadastrarAutor(req, res){
        try {
            const { nome, nacionalidade, dataNascimento, livros } = req.body;

            const NovoAutor = new Autor({
                nome, nacionalidade, dataNascimento, livros
            })            

            await NovoAutor.save();
            res.status(201).json({ message: 'Autor criado com sucesso!', autor: NovoAutor });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar livro' });
        }

    }

    static async excluirAutor(req, res){
        try {
            const { id } = req.params;

            const autor = await Autor.findByIdAndDelete(id);
            console.log(autor)

            if (!autor) {
                return res.status(400).json({ error: 'Nenhum autor encontrado.' });
            }

            return res.status(200).json({ message: "Autor excluido com sucesso.", autor });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro ao excluir autor." })
        }
    }

    static async buscarOsAutoresPorNacionalidade(req, res){

    }

    static async buscarLivrosPorAutor(req, res){}
}

export default AutorController

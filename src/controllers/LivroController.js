import '../config/db.js';
import NotFound from '../errors/NotFound.js';
import livros from '../models/Livro.js'

class LivroController {

    static async listarLivros(req, res, next) {
        try {

            const livrosResultado = await livros.find()
                .populate("autor")
                .exec();

            res.status(200).json(livrosResultado);
        } catch (erro) {
            next(erro);
        }
    }

    static async buscarLivrosPorFiltro(req, res, next) {
        try {
            const { editora, titulo } = req.query;

            const busca = {}

            if (editora) busca.editora = editora;
            if (titulo) busca.titulo = titulo;

            const livrosResultado = await livros.find(busca);            

            res.status(200).json(livrosResultado);
        } catch (error) {
            next(error);
        }
    }

    static async buscarLivroPorTitulo(req, res, next) {
        try {
            const titulo = req.params.titulo;

            if (titulo.length === 0) {
                return res.status(400).json({ error: "O titulo do livro está vazio." })
            }

            const livro = await livros.find({
                titulo: { $regex: titulo, $options: 'i' }
            })

            if (!livro) {
                return res.status(400).json({ error: 'Nenhum livro encontrado.' });
            }

            return res.status(200).json({ message: "Livro encontrado com sucesso.", livro });
        } catch (error) {
            console.error(error);
            // Retorna um erro 500 caso ocorra algum problema
            next(error);
        }
    }


    static async cadastrarLivro(req, res, next) {
        try {
            let livro = new livros(req.body);

            const livroResultado = await livro.save();

            res.status(201).send(livroResultado.toJSON());
        } catch (erro) {
            next(erro);
        }
    }

    static async buscarLivroPorId(req, res, next) {
        try {
            const id = req.params.id;

            const livroResultado = await livros.findById(id)
                .populate("autor", "nome")
                .exec();

            if (livroResultado !== null) {
                res.status(200).send(livroResultado);
            } else {
                next(new NotFound("Id do livro não localizado."));
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async buscarLivroPorEditora(req, res, next) {
        try {
            const { editora } = req.params;

            if (typeof editora !== 'string' || editora.trim() === '') {
                return res.status(400).json({ error: 'O nome da editora deve ser uma string não vazia.' });
            }

            const _livros = await livros.find({
                editora: { $regex: editora, $options: 'i' }  // Case insensitive
            });

            if (_livros.length === 0) {
                return res.status(400).json({ message: `Nenhum livro encontrado para a editora: ${editora}` });
            }

            return res.status(200).json(_livros);

        } catch (error) {
            // Retorna um erro 500 caso ocorra algum problema
            next(error);
        }
    }

    static async atualizarLivro(req, res, next) {
        try {
            const id = req.params.id;

            const livroResultado = await livros.findByIdAndUpdate(id, { $set: req.body });

            console.log(livroResultado);

            if (livroResultado !== null) {
                res.status(200).send({ message: "Livro atualizado com sucesso" });
            } else {
                //next(new NaoEncontrado("Id do livro não localizado."));
                res.status(404).send({ error: "Id do livro não localizado" });
            }
        } catch (erro) {
            next(erro);
        }
    }

    // o metodo busca todos os livros por um preço igual ou abaixo ao passado por parâmetro
    static async buscarLivroPorPreco(req, res, next) {
        const { preco } = req.params;

        if (isNaN(preco)) {
            return res.status(400).json({ error: 'O parâmetro maxPreco deve ser um número válido.' });
        }

        try {
            const livros = await Livro.find({ preco: { $lte: parseFloat(preco) } });
            res.status(200).json(livros);
        } catch (error) {
            next(erro);
        }
    }

    static async excluirLivro(req, res, next) {
        try {
            const id = req.params.id;

            const livroResultado = await livros.findByIdAndDelete(id);

            console.log(livroResultado);

            if (livroResultado !== null) {
                res.status(200).send({ message: "Livro removido com sucesso" });
            } else {
                // next(new NaoEncontrado("Id do livro não localizado."));
                return res.status(400).json({ error: 'OId do livro não localizado' });
            }
        } catch (erro) {
            next(erro);
        }
    }

};

export default LivroController;
import '../config/db.js';
import Livro from '../models/Livro.js'

class LivroController {

    static async listarLivros(req, res) {
        const listaLivros = await Livro.find({});
        res.status(200).json(listaLivros);
    }

    static async buscarLivroPorId(req, res) {
        try {
            const { id } = req.params;

            const livro = await Livro.findById(id);
            console.log(livro)

            if (!livro) {
                return res.status(400).json({ error: 'Nenhum livro encontrado.' });
            }

            return res.status(200).json({ message: "Livro encontrado com sucesso.", livro });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro ao buscar livro." })
        }
    }

    static async buscarLivroPorEditora(req, res) {
        try {
            const { editora } = req.params;

            if (typeof editora !== 'string' || editora.trim() === '') {
                return res.status(400).json({ error: 'O nome da editora deve ser uma string não vazia.' });
            }

            const livros = await Livro.find({
                editora: { $regex: editora, $options: 'i' }  // Case insensitive
            });

            if (livros.length === 0) {
                return res.status(400).json({ message: `Nenhum livro encontrado para a editora: ${editora}` });
            }

            return res.status(200).json(livros);

        } catch (error) {
            console.error(error);
            // Retorna um erro 500 caso ocorra algum problema
            return res.status(500).json({ error: 'Erro ao buscar os livros por editora' });
        }
    }

    static async cadastrarLivro(req, res) {
        try {
            const { titulo, isbn, anoPublicacao, editora, preco, paginas } = req.body;

            const NovoLivro = new Livro({
                titulo, isbn, anoPublicacao, editora, preco, paginas
            })

            await NovoLivro.save();
            res.status(201).json({ message: 'livro criado com sucesso!', livro: NovoLivro });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar livro' });
        }
    }

    static async atualizarLivro(req, res) {
        try {
            const { id } = req.params;
            const { titulo, editora, preco, anoPublicacao, paginas } = req.body;

            if (!titulo || !editora || !preco || !anoPublicacao || !paginas) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios." });
            }

            const livro = await Livro.findByIdAndUpdate(id,
                { titulo, editora, preco, anoPublicacao, paginas },
                { new: true, runValidators: true }
            );

            if (!livro) {
                return res.status(400).json({ error: "Livro não encontrado." })
            }

            return res.status(200).json(livro);
        } catch (error) {
            console.log(error);

            return res.status(500).json({ error: "Erro ao atualizar livro." })
        }
    }

    // o metodo busca todos os livros por um preço igual ou abaixo ao passado por parâmetro
    static async buscarLivroPorPreco(req, res) {
        const { preco } = req.params;
        console.log('preco ' + preco);


        if (isNaN(preco)) {
            return res.status(400).json({ error: 'O parâmetro maxPreco deve ser um número válido.' });
        }

        try {
            const livros = await Livro.find({ preco: { $lte: parseFloat(preco) } });
            res.status(200).json(livros);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar livros por preco.' });
        }
    }

    static async excluirLivro(req, res) {
        try {
            const { id } = req.params;

            const livro = await Livro.findByIdAndDelete(id);
            console.log(livro)

            if (!livro) {
                return res.status(400).json({ error: 'Nenhum livro encontrado.' });
            }

            return res.status(200).json({ message: "Livro excluido com sucesso.", livro });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro ao excluir livro." })
        }
    }

};

export default LivroController;
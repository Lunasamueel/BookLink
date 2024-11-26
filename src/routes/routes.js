import express, { Router } from 'express';
import LivroController from '../controllers/LivroController.js';
import AutorController from '../controllers/AutorController.js';

const routes = express.Router();

routes.get('/livros', LivroController.listarLivros);
routes.get('/livros/:id', LivroController.buscarLivroPorId);
routes.get('/livros/editora/:editora', LivroController.buscarLivroPorEditora);
routes.get('/livros/preco/:preco', LivroController.buscarLivroPorPreco);
routes.get('/livro/titulo/:titulo', LivroController.buscarLivroPorTitulo);
routes.post('/livros', LivroController.cadastrarLivro);
routes.put('/livros/:id', LivroController.atualizarLivro);
routes.delete('/livros/:id', LivroController.excluirLivro);

routes.get('/autores', AutorController.listarAutores);
routes.get('/autores/:id', AutorController.buscaAutorPorId);
routes.post('/autores', AutorController.cadastrarAutor);
routes.put('/autores/:id', AutorController.atualizarAutor);
routes.delete('/autores/:id', AutorController.excluirAutor);

export default routes;
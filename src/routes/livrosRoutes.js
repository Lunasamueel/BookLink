import express, { Router } from 'express';
import LivroController from '../controllers/LivroController.js';

const routes = express.Router();

routes.get('/livros', LivroController.listarLivros);
routes.get('/livros/:id', LivroController.buscarLivroPorId);
routes.get('/livros/editora/:editora', LivroController.buscarLivroPorEditora);

routes.post('/livros', LivroController.cadastrarLivro);
routes.put('/livros/:id', LivroController.atualizarLivro);
routes.delete('/livros/:id', LivroController.excluirLivro);

export default routes;
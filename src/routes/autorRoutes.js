import express, { Router } from 'express';
import AutorController from '../controllers/AutorController.js';

const routes = express.Router();

routes.get('/autores', AutorController.listarAutores);
routes.get('/autores/:id', AutorController.buscaAutorPorId);
routes.post('/autores', AutorController.cadastrarAutor);
routes.put('/autores/:id', AutorController.atualizarAutor);
routes.delete('/autores/:id', AutorController.excluirAutor);

export default routes;
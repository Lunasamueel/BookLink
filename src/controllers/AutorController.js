import '../config/db.js';
import NotFound from '../errors/NotFound.js';
import autores from  '../models/Autor.js';

class AutorController {

    static listarAutores = async (req, res) => {
        try {
          const autoresResultado = await autores.find({});
    
          res.status(200).json(autoresResultado);
        } catch (erro) {
            next(erro);
        }
      };
    
      static buscaAutorPorId = async (req, res, next) => {
        try {
          const id = req.params.id;
    
          const autorResultado = await autores.findById(id);
    
          if (autorResultado !== null) {
            res.status(200).send(autorResultado);
          } else {
            next(new NotFound("Id do autor não encontrado"));
  
          }
        } catch (erro) {
          next(erro);
        }
      };
    
      static cadastrarAutor = async (req, res, next) => {
        try {
          let autor = new autores(req.body);
    
          const autorResultado = await autor.save();
    
          res.status(201).send(autorResultado.toJSON());
        } catch (erro) {
          next(erro);
        }
      };
    
      static atualizarAutor = async (req, res, next) => {
        try {
          const id = req.params.id;
      
          const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});
    
          if (autorResultado !== null) {
            res.status(200).send({message: "Autor atualizado com sucesso"});
          } else {
            next(new NotFound("Id do Autor não localizado."));
          }
    
        } catch (erro) {
          next(erro);
        }
      };
    
      static excluirAutor = async (req, res, next) => {
        try {
          const id = req.params.id;
    
          const autorResultado = await autores.findByIdAndDelete(id);
    
    
          if (autorResultado !== null) {
            res.status(200).send({message: "Autor removido com sucesso"});
          } else {
            next(new NotFound("Id do Autor não localizado."));
          }
        } catch (erro) {
          next(erro);
        }
      };

    static async buscarOsAutoresPorNacionalidade(req, res){

    }

    static async buscarLivrosPorAutor(req, res){}
}

export default AutorController

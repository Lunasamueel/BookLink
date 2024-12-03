import DefaultError from "./DefaultError.js";


class IncorrectRequest extends DefaultError {
    constructor(mensagem = "Um ou mais dados fornecidos estão incorretos") {
      super(mensagem, 400);
    }
  }
  
  export default IncorrectRequest;
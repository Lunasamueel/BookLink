import DefaultError from "./DefaultError.js";

class NotFound extends DefaultError {
    constructor(message = "Página não encontrada", status = 404) {
        super();
        this.message = message;
        this.status = status;
    }
}

export default NotFound;
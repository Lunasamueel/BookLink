import mongoose from "mongoose";
import DefaultError from "../errors/DefaultError.js";
import ValidationError from '../errors/ValidationError.js'
import IncorrectRequest from "../errors/IncorrectRequest.js";
import NotFound from "../errors/NotFound.js";

function errorHandler(error, req, res, next) {
    console.log(error);
    
    if(error instanceof mongoose.Error.CastError){
        new IncorrectRequest().sendReplay(res);
        
    } else if(error instanceof mongoose.Error.ValidationError){
        new ValidationError(error).sendReplay(res);
        
    } else if(error instanceof NotFound) {
        error.sendReplay(res);
    } else {
       new DefaultError().sendReplay(res);
    }

}

export default errorHandler;
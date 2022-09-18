import { ValidationError } from "express-validator";
// validationError es un tipo;  describe el tipo que devuelve cuando hacemos un 
//intento de validación usando express-validator. En este caso es algo como 
//[msg:”Bad email”, param:”email”].
// lo importamos porque en un punto vamos a necesitar la lista de errores de validación

export class RequestValidationError extends Error {
 
  statusCode = 400;

  constructor(public errors: ValidationError[]) { // errors es la lista de errores de val.
	super();
	// Only because we are extending a built in class
	Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
	return this.errors.map((err) => {
  		return { message: err.msg, field: err.param };
	});
  }

}

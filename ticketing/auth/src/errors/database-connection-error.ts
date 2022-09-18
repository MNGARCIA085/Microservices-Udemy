import { CustomError } from "./custom-error";


export class DatabaseConnectionError  extends CustomError {
    reason = "Error connecting to database"; // hardcoding de lo que devuelve por ahora

    statusCode = 500;
  
    constructor() {
      super('Error connecting to the DB');
      Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
      return [
        {
          message: this.reason,
        },
      ];
    }
    

  }
  
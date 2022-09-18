// CustomError extiende la clase Error incorporada
export abstract class CustomError extends Error {
    abstract statusCode: number;
  
    constructor(message: string) {
      super(message);
  
      Object.setPrototypeOf(this, CustomError.prototype); // necesaria cada vez que queremos extender una clase incorporada
    }
  
    abstract serializeErrors(): { message: string; field?: string }[];
  }
  
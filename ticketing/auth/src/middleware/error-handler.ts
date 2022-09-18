import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  

  if (err instanceof RequestValidationError) {
    // ahora en errors llamamos al serializador y el status code lo sacamos de err en vez de hardcodearlo
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  if (err instanceof DatabaseConnectionError) {
      // ahora en errors llamamos al serializador y el status code lo sacamos de err en vez de hardcodearlo
      return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  
  // err. gen[erico
  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
  

};

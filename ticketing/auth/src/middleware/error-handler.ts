import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error, // err es algún tipo de objeto err; será el error que tira (thrown) el código que escribamos
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Something went wrong", err);
/**  
 * respuesta; en el futuro vamos inspeccionar el objeto err Error, 
   obtener info. a partir de él y ponerla en la respuesta de alguna forma; 
   por ahora sólo escribimos un mensaje
*/
res.status(400).send({
	message: err.message,
  });

};

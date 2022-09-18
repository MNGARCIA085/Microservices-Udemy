import express, { Request, Response } from 'express'; // importamos Request y Response para poder darle tipos
                                                  	// a req y res más abajo

import { body, validationResult } from "express-validator"; // importamos validationResult

const router = express.Router();

router.post(
  '/api/users/signup',
  // aplicamos express-validator como middleware
  [
	body('email')
        .isEmail() // función de validación de express-validator
        .withMessage('Email must be valid'),
	body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
  ],
  (req: Request, res: Response) => { // le damos tipo a las respuestas
	
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
              // tiramos un error; luego recorreremos la lista “errors” para brindar más 
            // detalle
      throw new Error("Invalid email or password");
    }
    console.log("Creating a user...");
      // imaginemos que la base de datos falla todo el tiempo, tiramos una excepción,
    // haríamos algo como lo siguiente:
    //throw new Error("Error connecting to database");

    res.send({});

	

  }
);

export { router as signupRouter };


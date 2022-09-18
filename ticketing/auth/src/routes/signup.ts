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
	const errors = validationResult(req); // esto puede o no contener errores según los haya o no
	
    if (!errors.isEmpty()) {
  	    return res.status(400).send(errors.array()); // si hay errores devuelvo un estado de 400 y un arreglo de errores
	}
	
    const { email, password } = req.body;
	console.log("Creating a user...");
    // new User({ email, password })
	
    // respuesta
    res.send({});
	

  }
);

export { router as signupRouter };


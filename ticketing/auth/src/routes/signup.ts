import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/user";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";


const router = express.Router();

router.post(
  "/api/users/signup",
  [
	body("email").isEmail().withMessage("Email must be valid"),
	body("password")
  	.trim()
  	.isLength({ min: 4, max: 20 })
  	.withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    //
    const {email, password} = req.body;


    // si los datos fueron validados, me fijo si el email no existe ya
    const existingUser = await User.findOne({email});

    if (existingUser){
      throw new BadRequestError('El usuario ya se encuentra registrado');
    }

    // en otro caso creo el usuario
    const user = User.build({email,password});
    await user.save();

    // respuesta
    res.status(201).send(user);

    
    
  }
);

export { router as signupRouter };

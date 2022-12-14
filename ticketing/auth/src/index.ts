import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from "./errors/not-found-error";
import mongoose from 'mongoose';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);


app.all('*', async (req, res) => {
  throw new NotFoundError();
});



app.use(errorHandler);


const start = async() =>{
  try{
    // pongo el nombre del clusterIP y no localhost
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth'); 
    console.log('Connected to MongoDB');
  }
  catch(err){
    console.log(err);
  }
  
}


app.listen(3000, () => {
  console.log('Listening on port 3000');
});


start();
import express, { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import router from './router';

import { protect } from './modules/auth';
import { createUser, signIn } from './handlers/user';
import errorHandler from './handlers/errorHandler';

const app = express();

// Settings
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Custom middleware
// app.use((req, res, next) => {
//     console.log('Custom middleware - Time: ', Date.now());
//     next();
// });


app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello World'});

});

// PRIVATE ROUTES
app.use('/api', protect, router);

// PUBLIC ROUTES
app.post('/user', createUser);
app.post('/signin', signIn);

// ERROR HANDLER
app.use(errorHandler);    

export default app;
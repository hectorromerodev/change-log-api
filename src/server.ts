import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import router from './router';

const app = express();

// Settings
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Custom middleware
app.use((req, res, next) => {
    console.log('Custom middleware - Time: ', Date.now());
    next();
});


app.get('/', (req, res) => {
    res.status(200);
    res.json({message: 'Hello World'});
});

app.use('/api', router);


export default app;
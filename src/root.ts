import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';


import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import userBonus from './routes/bonus.routes';
import url from './utils/url';


const app = express();

const corsOptions = {
    origin: ['http://localhost:3001', 'http://localhost', 'https://otech.mn', 'http://localhost:3000'],
}

// middleware
app.use(helmet());
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use(`${url.ADDRESS}/auth`, authRoutes);
app.use(`${url.ADDRESS}/user`, userRoutes);
app.use(`${url.ADDRESS}/user`, userBonus);

// SERVER STATUS CHECK
app.get(`${url.ADDRESS}`, (req, res) => {
    res.json({ status: 'Сервер ажиллаж байна!' });
});

// ERROR HANDLER
app.use(errorHandler);

export default app;

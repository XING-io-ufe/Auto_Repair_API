import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';


import { errorHandler } from './middlewares/errorHandler';
import { asyncHandler } from './utils/asyncHandler'
import authRoutes from './routes/auth.routes';
import userBonus from './routes/bonus.routes';
import token from './routes/token.routes';
import userUpdate from './routes/auth.routes';
import branchData from './routes/branch.routes';
import serviceData from './routes/service.routes';
import manufacturerData from './routes/manufacturer.routes';
import carData from './routes/car.routes';
import booking from './routes/booking.routes';
import { addedCar } from './controllers//car.controller';
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
app.use(`${url.ADDRESS}/user`, userBonus);
app.use(`${url.ADDRESS}/user`, token);
app.use(`${url.ADDRESS}/user`, userUpdate);
app.use(`${url.ADDRESS}/seed`, branchData);
app.use(`${url.ADDRESS}/seed`, serviceData);
app.use(`${url.ADDRESS}/seed`, manufacturerData);
app.use(`${url.ADDRESS}/seed`, carData);
app.use(`${url.ADDRESS}/user`, asyncHandler(addedCar));
app.use(`${url.ADDRESS}/user`, booking);

// SERVER STATUS CHECK
app.get(`${url.ADDRESS}`, (req, res) => {
    res.json({ status: 'Сервер ажиллаж байна!' });
});

// ERROR HANDLER
app.use(errorHandler);

export default app;

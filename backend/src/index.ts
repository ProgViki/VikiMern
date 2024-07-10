import express from 'express';
import connectToDatabase from "./config/db";
import { APP_ORIGIN } from './constants/env';
import cors from "cors";
import cookieParser from 'cookie-parser';
import errorHandler from "./middleware/errorHandler";



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: APP_ORIGIN,
        credentials: true,
    })
);

app.use(cookieParser())


app.get('/', (req, res) => {
   throw new Error('This is error');
   return res.status(200).json({ 
    status: 'healthy'
 });
})

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
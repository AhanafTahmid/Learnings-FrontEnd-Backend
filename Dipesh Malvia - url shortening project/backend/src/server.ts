import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db';
import shortUrl from './routes/shortUrl';


dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.use('/api/', shortUrl);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);}
);
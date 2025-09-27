import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes.js';

dotenv.config();
import { connectDB } from './config/db.js';

const app = express()
const port = process.env.PORT;
app.use(express.json());// middleware, to use req.body

app.use('/api/products', productRoutes);

app.listen(port, () => {
	connectDB();
	console.log(`App listening on port ${port}`)
})
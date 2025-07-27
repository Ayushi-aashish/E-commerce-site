import connectDB from './config/db.js';
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors';
import {errorHandler, notFound} from './middleware/errorMiddleware.js';
import productRoutes from './Routes/productRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import orderRoutes from './Routes/orderRoutes.js';
dotenv.config();
connectDB(); 
 
const app=express();
app.get('/',(req,res)=>{
res.send('API is running...');
});
app.use(express.json()); // for parsing application/json


// ✅ Add these lines before routes

app.use(express.urlencoded({ extended: true })); // For form data (x-www-form-urlencoded)

// Your routes here...

app.use('/api/products', productRoutes);

// First, define routes
app.use('/api/users', userRoutes);
app.use('/api/orders',orderRoutes);
app.get('/api/config/paypal',(req,res)=>
     res.send(process.env.PAYPAL_CLIENT_ID)
)


app.use(notFound);  // Then error middlewares
app.use(errorHandler);



const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log(`Server is running on ${process.env.NODE_ENVIRONMENT} port ${PORT}`.yellow.bold));
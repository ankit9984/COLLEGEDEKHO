import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './config/Database.config.js';
import adminRoutes from './routes/Admin.routes.js';
import collegeRoutes from './routes/College.routes.js';



const app = express();
const PORT = process.env.PORT || 3000
dotenv.config();

app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cookieParser());


connectDB();


//Post routes
app.use('/api', adminRoutes)

app.use('/api/college', collegeRoutes)

app.listen(PORT, () => {
    console.log(`port is running on ${PORT}`);
});
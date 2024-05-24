import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './config/Database.config.js';
import adminRoutes from './routes/Admin.routes.js';
import collegeRoutes from './routes/College.routes.js';
import courseRoutes from './routes/Course.routes.js';
import miniCourseRoutes from './routes/MiniCourse.routes.js';



const app = express();
const PORT = process.env.PORT || 3000
dotenv.config();

app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cookieParser());


connectDB();


//Post routes
app.use('/api', adminRoutes)

app.use('/api/college', collegeRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/minicourse', miniCourseRoutes);

app.listen(PORT, () => {
    console.log(`port is running on ${PORT}`);
});
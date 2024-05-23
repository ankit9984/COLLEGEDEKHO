import express from 'express';
import { verifyToken } from '../middlewares/Admin.midlewares.js';
import { AddCourse } from '../controllers/Courses.controller.js';

const router = express.Router();

router.post('/addcourse', verifyToken, AddCourse);

export default router;
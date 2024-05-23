import express from 'express';
import { verifyToken } from '../middlewares/Admin.midlewares.js';
import { AddCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from '../controllers/Courses.controller.js';

const router = express.Router();

router.post('/addcourse', verifyToken, AddCourse);
router.get('/getallcourses', getAllCourses);
router.get('/getcoursebyid/:courseId', getCourseById);
router.put('/updatecourse/:courseId', verifyToken, updateCourse);
router.delete('/deletecourse/:courseId', verifyToken, deleteCourse);

export default router;
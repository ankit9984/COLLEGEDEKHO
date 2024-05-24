import express from 'express';
import { verifyToken } from '../middlewares/Admin.midlewares.js';
import {
    addMiniCourse,
    getAllMiniCourses,
    getMiniCourseById,
    updateMiniCourse,
    deleteMiniCourse
} from '../controllers/MiniCourse.controller.js';

const router = express.Router();

router.post('/addminicourse', verifyToken, addMiniCourse);
router.get('/getallminicourses', getAllMiniCourses);
router.get('/getminicoursebyid/:miniCourseId', getMiniCourseById);
router.put('/updateminicourse/:miniCourseId', verifyToken, updateMiniCourse);
router.delete('/deleteminicourse/:miniCourseId', verifyToken, deleteMiniCourse);

export default router;

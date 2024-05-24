import mongoose from "mongoose";
import MiniCourse from "../models/MiniCourse.model.js";
import Course from "../models/Course.model.js";
import { MINI_COURSES } from "../utils/enums.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);



const addMiniCourse = async (req, res) => {
    try {
        const { miniCourseName, seatIntake, fees, courseId } = req.body;

        if(!isValidObjectId(courseId)){
            return res.status(400).json({error: 'Invalid course ID'})
        }
    
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({error: 'Courses not found'})
        }

        if (!miniCourseName || !seatIntake || !fees) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        //Validate miniCourseName against MINI_COURSES
       

        const newMiniCourse = new MiniCourse({
            miniCourseName,
            seatIntake,
            fees,
            course: courseId
        });

        await newMiniCourse.save();

        course.miniCourse.push(newMiniCourse._id);
        await course.save();

        res.status(201).json(newMiniCourse);
    } catch (error) {
        console.error('Error in addMiniCourse controller', error);
        res.status(500).json({ error: error.message });
    }
};

const getAllMiniCourses = async (req, res) => {
    try {
        const miniCourses = await MiniCourse.find();
        res.status(200).json(miniCourses);
    } catch (error) {
        console.error('Error in getAllMiniCourses controller', error);
        res.status(500).json({ error: error.message });
    }
};

const getMiniCourseById = async (req, res) => {
    try {
        const { miniCourseId } = req.params;

        if (!isValidObjectId(miniCourseId)) {
            return res.status(400).json({ error: 'Invalid mini-course ID' });
        }

        const miniCourse = await MiniCourse.findById(miniCourseId);
        if (!miniCourse) {
            return res.status(404).json({ error: 'Mini-course not found' });
        }

        res.status(200).json(miniCourse);
    } catch (error) {
        console.error('Error in getMiniCourseById controller', error);
        res.status(500).json({ error: error.message });
    }
}

const updateMiniCourse = async (req, res) => {
    try {
        const { miniCourseId } = req.params;
        const { miniCourseName, seatIntake, fees } = req.body;

        if (!isValidObjectId(miniCourseId)) {
            return res.status(400).json({ error: 'Invalid mini-course ID' });
        }

        const miniCourse = await MiniCourse.findById(miniCourseId);
        if (!miniCourse) {
            return res.status(404).json({ error: 'Mini-course not found' });
        }

        miniCourse.miniCourseName = miniCourseName || miniCourse.miniCourseName;
        miniCourse.seatIntake = seatIntake || miniCourse.seatIntake;
        miniCourse.fees = fees || miniCourse.fees;

        await miniCourse.save();
        res.status(200).json({ message: 'Mini-course updated successfully', miniCourse });
    } catch (error) {
        console.error('Error in updateMiniCourse controller', error);
        res.status(500).json({ error: error.message });
    }
}

const deleteMiniCourse = async (req, res) => {
    try {
        const { miniCourseId } = req.params;
        const {courseId} = req.body;

        if (!isValidObjectId(miniCourseId)) {
            return res.status(400).json({ error: 'Invalid mini-course ID' });
        }

        const course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({error: 'Course not found'})
        }

        const miniCourse = await MiniCourse.findById(miniCourseId);
        if (!miniCourse) {
            return res.status(404).json({ error: 'Mini-course not found' });
        }

        //Remove miniCourseId from course's miniCourses array
        course.miniCourse = course.miniCourse.filter(id => id.toString() !== miniCourseId);
        await course.save();

        await miniCourse.deleteOne({ _id: miniCourseId });
        res.status(200).json({ message: 'Mini-course deleted successfully' });
    } catch (error) {
        console.error('Error in deleteMiniCourse controller', error);
        res.status(500).json({ error: error.message });
    }
}

export {
    addMiniCourse,
    getAllMiniCourses,
    getMiniCourseById,
    updateMiniCourse,
    deleteMiniCourse
};

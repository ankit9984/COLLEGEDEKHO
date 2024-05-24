import mongoose from "mongoose";
import College from "../models/College.model.js";
import Course from "../models/Course.model.js";
import { COURSES, STREAMS } from "../utils/enums.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const isStreamValid = (stream) => {
    for (const key in STREAMS) {
        if (STREAMS[key] === stream) {
            return true;
        }
    }
    return false;
}

const isCourseValid = (stream, courseName) => {
    const courses = COURSES[stream];
    if (courses && courses.includes(courseName)) {
        return true;
    }
    return false;
}

const AddCourse = async (req, res) => {
    try {
        const { courseName, stream, duration, fees, eligibility, college, seatIntake } = req.body;
        const collegeExists = await College.findById(college);
        if (!collegeExists) {
            return res.status(400).json({ error: 'College not found' });
        }

        // Validate if the stream name is valid
        if (!isStreamValid(stream)) {
            return res.status(400).json({ error: 'Invalid stream name' });
        }

        // Validate if the stream name matches the course name
        if (!isCourseValid(stream, courseName)) {
            return res.status(400).json({ error: 'Stream name does not match the course name' });
        }

        const newCourse = new Course({
            courseName,
            stream,
            duration,
            fees,
            eligibility,
            college,
            seatIntake
        });

        await newCourse.save();
        collegeExists.courses.push(newCourse._id);
        await collegeExists.save();

        res.status(201).json(newCourse);
    } catch (error) {
        console.error('Error in addCourse controller', error);
        res.status(500).json({ error: error.message });
    }
};

const getAllCourses = async (req, res) => {
    try {
        // Efficient population with selected fields for both college and miniCourse
        const courses = await Course.find()
            .populate({
                path: 'college',
                select: 'collegeName location'
            })
            .populate({
                path: 'miniCourse',
                select: 'miniCourseName seatIntake fees'
            })
            .lean()
            .exec();

        res.status(200).json(courses);
    } catch (error) {
        console.error('Error in getAllCourses controller', error);
        res.status(500).json({ error: 'An error occurred while fetching courses' });
    }
};

const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;

        if (!isValidObjectId(courseId)) {
            return res.status(400).json({ error: 'Invalid course ID' });
        }

        const course = await Course.findById(courseId).populate('college', 'collegeName');
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json(course);
    } catch (error) {
        console.error('Error in getCourseById controller', error);
        res.status(500).json({ error: error.message });
    }
}

const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { courseName, stream, duration, fees, eligibility, collegeId } = req.body;

        if (!isValidObjectId(courseId)) {
            return res.status(400).json({ error: 'Invalid course ID' });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Invalid course ID' });
        }

        if (collegeId && !isValidObjectId(collegeId)) {
            return res.status(400).json({ error: 'Invalid college ID' });
        }

        if (collegeId) {
            const collegeExists = await College.findById(collegeId);
            if (!collegeExists) {
                return res.status(400).json({ error: 'College not found' });
            }
            course.college = collegeId;
        }

        if (!isStreamValid(stream)) {
            return res.status(400).json({ error: 'Stream is not valid' });
        }

        if (!isCourseValid(stream, courseName)) {
            return res.status(400).json({ error: 'Stream name does not match the course name' });
        }

        course.courseName = courseName || course.courseName;
        course.stream = stream || course.stream;
        course.duration = duration || course.duration;
        course.fees = fees || course.fees;
        course.eligibility = eligibility || course.eligibility;

        await course.save();
        res.status(200).json({ message: 'Course updated successfully', course });
    } catch (error) {
        console.error('Error in updateCourse controller', error);
        res.status(500).json({ error: error.message });
    }
}

const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        await College.findByIdAndUpdate(
            course.college,
            { $pull: { courses: courseId } }, { new: true }
        );

        await course.deleteOne({ _id: courseId });

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error in deleteCourse controller', error);
        res.status(500).json({ error: error.message });
    }
}



export {
    AddCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
}


import College from "../models/College.model.js";
import Course from "../models/Course.model.js";

const AddCourse = async (req, res) => {
    try {
        const { courseName, stream, duration, fees, eligibility, college } = req.body;
        const collegeExists = await College.findById(college);
        if(!collegeExists){
            return res.status(400).json({error: 'College not found'})
        }

        const newCourse = new Course({
            courseName,
            stream,
            duration,
            fees,
            eligibility,
            college
        });

        await newCourse.save();
        res.status(201).json(newCourse)
    } catch (error) {
        console.error('Error in addCourse controller', error);
        res.status(500).json({ error: error.message });
    }
};

export {
    AddCourse
}
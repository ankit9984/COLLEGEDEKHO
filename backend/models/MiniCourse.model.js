import mongoose from "mongoose";

const MiniCourseSchema = new mongoose.Schema({
    miniCourseName: {
        type: String,
        required: true
    },
    seatIntake: {
        type: Number,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
}, {timestamps:true});

const MiniCourse = mongoose.model('MiniCourse', MiniCourseSchema);

export default MiniCourse;
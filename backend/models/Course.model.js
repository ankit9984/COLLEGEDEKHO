import mongoose from 'mongoose';
import { STREAMS, COURSES } from '../utils/enums.js';

const CourseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        validate: {
            validator: function(courseName){
                return COURSES[this.stream].includes(courseName);
            },
            message: props => `${props.value} is not a valid course for the selected stream`
        }
    },
    stream: {
        type: String,
        enum: Object.values(STREAMS),
        required: true
    },
    duration: {
        type: String,
        // required: true
    },
    fees: {
        type: Number,
        // required: true
    },
    eligibility: {
        type: String,
        trim: true
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true
    }
}, { timestamps: true });

const Course = mongoose.model('Course', CourseSchema);

export default Course;

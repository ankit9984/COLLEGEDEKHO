import mongoose from 'mongoose';
import { STREAMS } from '../utils/enums.js';

const collegeSchema = new mongoose.Schema({
    collegeName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    streams: {
        type: [String],
        enum: Object.values(STREAMS),
        required: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
}, { timestamps: true });

const College = mongoose.model('College', collegeSchema);

export default College;

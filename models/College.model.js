import mongoose from 'mongoose';

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
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    
}, {timestamps: true});


const College = mongoose.model('College', collegeSchema);

export default College;
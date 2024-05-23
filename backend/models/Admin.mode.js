import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
});

//Pre-save hook to hash the password
AdminSchema.pre('save', async function(next){
    if(this.isModified('password') || this.isNew){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;
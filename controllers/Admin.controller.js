import { generateToken } from "../middlewares/Admin.midlewares.js";
import Admin from "../models/Admin.mode.js";

// Create a new admin
export const createAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //Check if username already exists
        const existingUsername = await Admin.findOne({username});
        if(existingUsername){
            return res.status(400).json({error: 'Username already exists'})
        }

        const existingEmail = await Admin.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists." });
        }

        // Check if email already exists
        const newAdmin = new Admin({ username, email, password });
        await newAdmin.save();

        // Generate token and set as cookie
        const payload = {id: newAdmin._id, username: newAdmin.username};
        generateToken(res, payload);

        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all admins
export const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json({message: 'Admins find successfully', admins});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get an admin by ID
export const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);
        if (!admin) return res.status(404).json({ error: 'Admin not found' });
        res.json(admin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an admin by ID
export const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedAdmin = await Admin.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedAdmin) return res.status(404).json({ error: 'Admin not found' });
        res.json(updatedAdmin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an admin by ID
export const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAdmin = await Admin.findByIdAndDelete(id);
        if (!deletedAdmin) return res.status(404).json({ error: 'Admin not found' });
        res.json({ message: 'Admin deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



import College from "../models/College.model.js";

const addNewCollege = async (req, res) => {
    try {
        const {collegeName, description, courses} = req.body;
        const newCollege = new College({collegeName, description, courses});
        await newCollege.save();
        res.status(201).json(newCollege);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export {
    addNewCollege
}
import College from "../models/College.model.js";
import { STREAMS } from "../utils/enums.js";

// const validateStreams = (streams) => {
//     const validateStreams = Object.values(STREAMS);
//     console.log(streams, validateStreams);
//     return streams.every(streams => validateStreams.includes(streams))
// }

const validateStreams = (streams) => {
    const validStreams = Object.values(STREAMS);
    for(let i=0; i<streams.length; i++){
        if(!validStreams.includes(streams[i])){
            return false
        }
    }
    return true;
}

const addNewCollege = async (req, res) => {
    try {
        const {collegeName, description , location, streams} = req.body;

        const existingCollege = await College.findOne({collegeName});
        if(existingCollege){
            return res.status(400).json({error: 'A college with this nlame already exist'})
        }

        if(!validateStreams(streams)){
            return res.status(400).json({error: 'One or more streams are invalid'})
        }

        console.log(validateStreams(streams));


        const newCollege = new College({
            collegeName,
            description,
            location,
            streams
        });
        await newCollege.save();

        res.status(201).json(newCollege);
    } catch (error) {
        console.log('Error in addNewCollege controller', error);
        res.status(500).json({error: error.message});
    }
};

const getAllCollege = async (req, res) => {
    try {
        const colleges = await College.find();
        res.status(200).json(colleges)
    } catch (error) {
        console.log('error in getAllCollege controller', error);
        res.status(500).json({error: error.message})
    }
}

const getCollegeById = async (req, res) => {
    try {
        const {collegeId} = req.params;
        const college = await College.findById(collegeId);
        if(!college){
            return res.status(404).json({error: 'College not found'});
        }

        res.status(201).json(college)
    } catch (error) {
        console.log('error in getCollegeById controller', error);
        res.status(500).json({error: error.message})
    }
}

const updateCollege = async (req, res) => {
    try {
        const {collegeId} = req.params;
        const {collegeName, description , location, streams} = req.body;

        const existingCollege = await College.findById(collegeId);
        if(!existingCollege){
            return res.status(400).json({error: 'College not found'})
        };

        if(existingCollege.collegeName.includes(collegeName)){
            return res.status(400).json({error: `College is already  in this name ${collegeName} `})
        }

        if(streams && !validateStreams(streams)){
            return res.status(400).json({error: 'One or more streams ae invalid'})
        }

        existingCollege.collegeName = collegeName || existingCollege.collegeName;
        existingCollege.description = description || existingCollege.description;
        existingCollege.location = location || existingCollege.location;
        existingCollege.streams = streams || existingCollege.streams;

        await existingCollege.save();

        res.status(201).json({message: 'College update successfully', existingCollege})
    } catch (error) {
        console.log('error in updateCollege controller', error);
        res.status(500).json({error: error.message})
    }
}

const deleteCollege = async (req, res) => {
    try {
        const {collegeId} = req.params;
        const deletedCollege = await College.findByIdAndDelete(collegeId);
        if(!deletedCollege){
            return res.status(404).json({ error: 'College not found' });
        }

        res.status(201).json({message: 'College deleted'})
    } catch (error) {
        console.log('Error in deleteCollege controller', error);
        res.status(500).json({error: error.message})
    }
}

export {
    addNewCollege,
    getAllCollege,
    getCollegeById,
    updateCollege,
    deleteCollege
}
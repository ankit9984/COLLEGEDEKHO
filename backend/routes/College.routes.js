import express from 'express';
import { addNewCollege, deleteCollege, getAllCollege, getCollegeById, updateCollege } from '../controllers/College.controller.js';
import { verifyToken } from '../middlewares/Admin.midlewares.js';

const router = express.Router();

router.post('/newcollege', addNewCollege);
router.get('/getallcolleges', getAllCollege)
router.get('/getcollegebyid/:collegeId', getCollegeById);
router.put('/updatecollege/:collegeId', verifyToken, updateCollege);
router.delete('/deletecollege/:collegeId', verifyToken, deleteCollege)

export default router;
import express from 'express';
import { addNewCollege } from '../controllers/College.controller.js';

const router = express.Router();

router.post('/newcollege', addNewCollege);

export default router;
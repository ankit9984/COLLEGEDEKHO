import express from 'express';
import {
    createAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
    logoutAdmin
} from '../controllers/Admin.controller.js';
import { verifyToken } from '../middlewares/Admin.midlewares.js';

const router = express.Router();

router.post('/admins', createAdmin);
router.post('/loginadmin', loginAdmin)
router.post('/logoutadmin', verifyToken, logoutAdmin)
router.get('/admins', verifyToken, getAdmins);
router.get('/admins/:id', verifyToken, getAdminById);
router.put('/admins/:id', verifyToken, updateAdmin);
router.delete('/admins/:id', deleteAdmin);

export default router;

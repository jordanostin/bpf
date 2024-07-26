import express from 'express';
import { updateUser, verifyToken } from '../controllers/authController.js';
import {admin} from '../controllers/adminController.js';
import {createArticle} from '../controllers/articleController.js';

const router = express.Router();

router.get('/verify-token', verifyToken);
router.get('/back-office', admin);

router.post('/create-article', createArticle);

router.put('/update/user/:id', updateUser);

export default router;
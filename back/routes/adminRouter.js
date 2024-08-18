import express from 'express';
import { updateUser, verifyToken } from '../controllers/authController.js';
import {admin} from '../controllers/adminController.js';
import {createArticle, showArticle, updateArticle} from '../controllers/articleController.js';


const router = express.Router();

router.get('/verify-token', verifyToken);
router.get('/back-office', admin);
router.get('/show-article/:articleId', showArticle);

router.post('/create-article', createArticle);

router.put('/update/user/:id', updateUser);
router.put('/update/article/:id', updateArticle);

export default router;
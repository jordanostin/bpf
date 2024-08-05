import express from 'express';
import {showArticle, getAllArticles} from '../controllers/articleController.js';


const router = express.Router();

router.get('/show-article/:articleId', showArticle);
router.get('/articles', getAllArticles);


export default router;
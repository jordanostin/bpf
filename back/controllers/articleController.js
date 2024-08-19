import Article from '../models/articleSchema.js';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import articleSchema from '../models/articleSchema.js';

const copyFiles = async (files, destFolder) => {
    const filePaths = [];

    for (const file of files) {
        const oldPath = file.filepath;
        const newFilename = `${Date.now()}-${file.originalFilename}`;
        const newPath = path.join(__dirname, '..', destFolder, newFilename);

        await fs.promises.copyFile(oldPath, newPath);
        filePaths.push(newPath);
    }

    return filePaths;
};

export const createArticle = (req, res) => {

    const userId = req.userId;

    const form = formidable({multiples: true});

    form.parse(req, async(err, fields, files) =>{

        if(err){
            return res.status(500).json({message: 'une erreur est survenu 1', err: err.message});
        }

        const {title, description} = fields;

        if (!title || !description) {
            return res.status(400).json({ message: 'Le titre et la description sont obligatoires' });
        }

        const titleStr = Array.isArray(title) ? title[0] : title;
        const descriptionStr = Array.isArray(description) ? description[0] : description;

        let imagePaths;

        if (files.image) {
            if (Array.isArray(files.image) && files.image.length > 1) {
                return res.status(400).json({ message: 'Vous pouvez ajouter une seule image' });
            }

            const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

            if (!allowedExtensions.includes(files.image.mimetype)) {
                return res.status(400).json({ message: 'L\'image doit être de type .jpeg, .png, .jpg' });
            }

            try {
                imagePaths = await copyFiles([files.image], 'images');
            } catch (err) {
                return res.status(400).json({ message: 'Une erreur est survenue au chargement de l\'image' });
            }
        }

        try {
            const article = new Article({
                author: userId,
                title: titleStr,
                description: descriptionStr,
                image: imagePaths ? imagePaths[0] : null,
                createdAt: Date.now()
            });
            await article.save();
            return res.status(201).json({article});
        } catch (err) {
            return res.status(400).json({message : 'une erreur est survenue', err: err.message})
        };

    });
    
};

export const showArticle = async(req, res) => {

    const articleId = req.params.articleId

    try{
        const article = await articleSchema.findById(articleId);

        if (!article){
            return res.status(400).json({message: 'article introuvable'})
        }

        return res.status(200).json({article})
    }
    catch(err){
        return res.status(500).json({message : 'une erreur est survenue', error: err.message})
    }
}

export const getAllArticles = async (req, res) => {
    
    try{
        const articles = await Article.find().sort({createdAt: -1});
        return res.status(200).json({articles})
    }
    catch(err){
        return res.status(500).json({message : 'une erreur est survenue', error: err.message})
    }
}

export const updateArticle = async(req, res) => {

    const userId = req.userId;

    const form = formidable({multiples: true});

    form.parse(req, async(err, fields, files) =>{

        const articleId = req.params.id;

        let {title, description} = fields;

        if (Array.isArray(title)){
            title = title[0];
        }

        if(Array.isArray(description)){
            description = description[0];
        }

        if (!title && !description && !files.image) {
            return res.status(400).json({ message: 'Aucun champ à mettre à jour' });
        }

        const article = {
            user: userId,
            updateAt: Date.now()
        }

        if(title){
            article.title = title;
        }

        if(description){
            article.description = description;
        }

        if(!files.image){
            
            articleSchema.updateOne({_id: articleId}, article)
            .then(() => {
                return res.status(200).json({article});
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message : 'Erreur de la mise à jour 1'})
            })
        }else{
            copyFiles([files.image], 'image')
                .then(([imageNewPath]) => {
                    articleSchema.findById(articleId).exec()
                    .then((data) => {
                        if(!data) {
                            return res.status(404).json({message: 'Article non trouvé'});
                        }else{
                            const oldImagePath = data.image;
                            fs.unlink(`public/${oldImagePath}`, (err) => {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).json({message : 'Erreur de la suppression de l\'ancienne image'});
                                }else{
                                    const article = {
                                        user: userId,
                                        title,
                                        description,
                                        image: imageNewPath,
                                        updateAt: data.updatedAt
                                    };
                                    articleSchema.updateOne({_id: articleId}, article)
                                        .then(() => {
                                            return res.status(200).json({article});
                                        })
                                        .catch((err) => {
                                            console.error(err);
                                            return res.status(500).json({message: 'Erreur de la mise à jour 2'});
                                        });
                                }
                            });
                        }
                     })
                     .catch((err) => {
                        console.error(err);
                        return res.status(500).json({message: 'Erreur de la mise à jour 3'});
                     });
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({message: 'Erreur de la mise à jour 4'});
                });
        }
    });
}

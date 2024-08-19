import fs from 'fs';
import Article from "../models/articleSchema.js";
import User from '../models/userSchema.js';

export const deleteType = async(req, res) => {

    let type = '';

    switch(req.params.type){
        case 'user': type = User; break
        case 'article': type = Article; break
    }

    const id = req.params.id;

    try{
        const userId = req.userId;
        const user = await User.findById(userId);
        const isAdmin = user.isAdmin;
        const item = await type.findById(id);

        if(type === User){
            if(!item){
                return res.status(400).json({message: 'Element introuvable'});
            }

            if(isAdmin){
                await User.findByIdAndDelete(id);
                return res.status(200).json({message: 'Utilisateur supprimé'});
            }   
        }

        if(type === Article){
            if(!item){
                return res.status(400).json({message : 'Element introuvable'});
            }

            if (item.article && fs.existsSync(`public/${item.article}`)) {
                fs.unlink(`public/${item.article}`, err => {
                    if (err) {
                        console.error('Erreur lors de la suppression de l\'article:', err);
                        return res.status(500).json({message : 'Erreur de la suppression de l\'article 1'});
                    }
                });
            }

            if (item.image && fs.existsSync(`public/${item.image}`)) {
                fs.unlink(`public/${item.image}`, err => {
                    if (err) {
                        console.error('Erreur lors de la suppression de l\'image:', err);
                        return res.status(500).json({message : 'Erreur lors de la suppression de l\'image 2'});
                    }
                });
            }

        }

        await type.findByIdAndDelete(id);
        return res.status(200).json({message: 'Supprimé'})

    }catch(err){
        console.log(err);
        return res.status(400).json({message: 'Erreur'})
    }
}
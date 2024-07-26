import userSchema from "../models/userSchema.js";

export const admin = async (req,res) => {

    try{
        const users = await userSchema.find({});


        res.status(200).json({users});

    }catch(err){
        console.log(err);
    }
}
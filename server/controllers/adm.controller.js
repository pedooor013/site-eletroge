import admModels from '../models/adm.models.js';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import bcrypt from 'bcrypt';


async function loginAdmController(req, res){
    const {email, password} = req.body;

    try{
        const token = await authLoginController(email, password);
        res.status(201).json({token});
    }catch(err){
        res.status(400).send({message: err.message});
    }
}

async function generateJWT(id){
    return jwt.sign({id},
        process.env.SECRET_JWT, 
        {expiresIn: 86400});
}

async function authLoginController(email, password){
    const user = await admModels.findUserByEmailModels(email);
    if(!user) throw new Error('Invalid user!');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) throw new Error('Invalid user!');
    const token = await generateJWT(user.id);
    return token;
}

export default{
    loginAdmController
}
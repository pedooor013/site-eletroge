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

async function createNewWorkController(req, res){
    try{
        const {name, description, progress, arrServicesId, arrImage} = req.body;

        const obraId = await admModels.createNewWorkModels({name, description, progress, arrServicesId, arrImage});

        if(!obraId){
            return res.status(500).json({
                Error: "Erro ao criar a obra. Nenhum ID retornado!"
            });
        };

        return res.status(201).json({
            message: "Obra cadastrada com sucesso!",
            obraId: obraId
        })
    }catch(err){
        console.error("Erro no Controller:", err);

        return res.status(500).json({
            error: "Erro interno ao criar obra.",
            detalhe: err.message
        });
    }

}

async function updatedWorkController(req, res){
    const updatedWork = req.body;
    const workId = req.params.id;
    
    try{
        const response = await  admModels.updatedWorkModels(updatedWork, workId);

        return res.send(response);
    }catch(err){
        res.status(400).send(err.message);
    }
}

async function deleteWorkController(req, res){
    try{
        const workId = req.params.id;
        const response = await admModels.deleteWorkModel(workId);
        return res.send(response);
    }catch(err){
        res.status(400).send(err.message);
    }
}
export default{
    loginAdmController,
    createNewWorkController,
    updatedWorkController,
    deleteWorkController
}
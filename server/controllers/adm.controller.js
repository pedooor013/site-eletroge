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

async function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        res.status(401).json({error: 'Token não encontrado!'});
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        req.user = decoded;
        next();
    }catch{
        res.status(401).json({error: 'Token inválido'});
    }
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

        console.log("📥 DADOS RECEBIDOS NO BACKEND:");
        console.log("Body completo:", JSON.stringify(req.body, null, 2));
        console.log("name:", name, "| tipo:", typeof name);
        console.log("description:", description, "| tipo:", typeof description);
        console.log("progress:", progress, "| tipo:", typeof progress);
        console.log("arrServicesId:", arrServicesId, "| é array?", Array.isArray(arrServicesId));
        console.log("arrImage:", arrImage, "| é array?", Array.isArray(arrImage));

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
    deleteWorkController,
    authMiddleware
}
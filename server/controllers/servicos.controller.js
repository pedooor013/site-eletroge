import { getAllServicesModels } from "../models/servicos.models.js";

export async function getAllServicesController(req, res){
    try{
        const services = await getAllServicesModels();
        res.json(services);    
    }catch(err){
        res.status(400).json({err: 'Erro ao buscar os services'});
    }
} 
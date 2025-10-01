import { getObrasPorId, getTodasObras } from "../models/obras.models.js";

export async function listarObras(req, res){
    try{
        const obras = await getTodasObras();
        res.json(obras);
    }catch(err){
        res.status(500).json({err: 'Erro ao buscar produtos'})
    }
}

export async function listarObrasPorId(req, res){
    try{
        const { id } = req.params;
        const obra = await getObrasPorId(id);

        if(!obra) 
            return res.status(404).json({err: 'Obra nao encontrada'});
        
        res.json(obra);
    }catch(err){
        res.status(500).json({err: "Erro ao buscar a obra"});
    }


}
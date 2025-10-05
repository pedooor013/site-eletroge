import { getObrasPorId, getTodasObras, filtrarObrasEmAndamento, filtrarObrasFinalizadas } from "../models/obras.models.js";

export async function listarObras(req, res){
    try{
        const obras = await getTodasObras();
        res.json(obras);
    }catch(err){
        res.status(500).json({err: 'Erro ao buscar obras'})
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

export async function filtrarObrasEmAndamentoController(req, res){
    try{
        const obras = await filtrarObrasEmAndamento();
        res.json(obras);
    }catch(err){
        res.status(500).json({err: 'Erro ao buscar as obras'})
    }
}

export async function filtrarObrasFinalizadasController(req, res){
    try{
        const obras = await filtrarObrasFinalizadas();
        res.json(obras);
    }catch(err){
        res.status(500).json({err: 'Erro ao buscar as obras'})
    }
}
import { exibirDadosObraModels } from '../models/obrasDetalhes.models.js';

export async function exibirDadosObraController(req, res){
    try{
        const { id } = req.params;
        const detalhesObras = await exibirDadosObraModels(id);
        res.json(detalhesObras);
    }catch(err){
        res.status(500).json({err: "Erro ao buscar os detalhes das obras"});
    }
}
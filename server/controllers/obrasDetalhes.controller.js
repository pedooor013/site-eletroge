import { exibirDadosObraModels } from '../models/obrasDetalhes.models.js';

export async function exibirDadosObraController(req, res){
    try{
        const { id } = req.params;
        console.log("URL chamada:", `http://localhost:3000/eletroge/obras/detalhes/${id}`);
        const detalhesObras = await exibirDadosObraModels(id);
        res.json(detalhesObras);
    }catch(err){
        console.log({err});
        res.status(500).json({err: "Erro ao buscar os detalhes das obras"});
    }
}                                                                                                                                                   

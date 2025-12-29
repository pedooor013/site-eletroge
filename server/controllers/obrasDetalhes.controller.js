import { exibirDadosObraModels } from '../models/obrasDetalhes.models.js';

export async function exibirDadosObraController(req, res){
    try{
        const { id } = req.params;
        
        const detalhesObras = await exibirDadosObraModels(id);

        if (Array.isArray(detalhesObras) && detalhesObras.length > 0) {

            detalhesObras.forEach(obra => {
                if (obra.imagens && obra.imagens.length > 0) {
                    obra.imagens = obra.imagens.map(img => {
                        try {
                            return JSON.parse(img); 
                        } catch {
                            return img;
                        }
                    });
                }
            });
        }

        return res.json(detalhesObras);

    } catch(err) {
        return res.status(500).json({err: "Erro ao buscar os detalhes das obras"});
    }
}

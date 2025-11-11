import pool from '../db.js';

export async function exibirDadosObraModels(id){
    
    const detalhesObras = await pool.query(`
    SELECT 
    o.id,
    o.nome,
    o.descricao,
    o.progresso,
    ARRAY_AGG(
        DISTINCT jsonb_build_object(
            'nome', s.nome,
            'descricao', s.descricao
        )
    ) FILTER (WHERE s.id IS NOT NULL) AS servicos,
    ARRAY_AGG(DISTINCT i.url) FILTER (WHERE i.url IS NOT NULL) AS imagens
    FROM obras o
    LEFT JOIN obra_servico os ON os.obra_id = o.id
    LEFT JOIN servicos s ON s.id = os.servico_id
    LEFT JOIN imagens i ON i.obra_id = o.id
    WHERE o.id = $1
    GROUP BY o.id, o.nome, o.descricao, o.progresso;
        `, [id]);
        
    return detalhesObras.rows;
}
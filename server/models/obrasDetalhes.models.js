import pool from '../db.js';

export async function exibirDadosObraModels(id){
    const detalhesObras = await pool.query(`
        SELECT 
    obra.nome, 
    obra.descricao, 
    obra.progresso, 
    img.url, 
    servico.nome, 
    servico.descricao
FROM obras obra
INNER JOIN obra_servico os ON obra.id = os.obra_id
INNER JOIN servicos servico ON servico.id = os.servico_id
LEFT JOIN imagens img ON img.obra_id = obra.id
WHERE obra.id = $1;
        `, [id]);
    return detalhesObras.rows;
}
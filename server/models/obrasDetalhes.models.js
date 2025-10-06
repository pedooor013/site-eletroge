import pool from '../db.js';

export async function exibirDadosObraModels(id){
    const detalhesObras = await pool.query(`
        SELECT * FROM obras WHERE id = $1,
        SELECT url FROM imagens WHERE obra_id = $1,
        SELECT servico_id FROM servicos WHERE obra_id = $1,
        SELECT * FROM descricao WHERE id = $2 
        `, [id], [servico_id]);
    return detalhesObras.rows[0];
}
import pool from '../db.js';

export async function  getTodasObras(){
    const resultado = await pool.query(`
    SELECT obras.nome, obras.descricao, img.url, obras.id
    FROM obras
    LEFT JOIN imagens img ON img.obra_id = obras.id 
    AND img.eh_principal = true
    ORDER BY obras.id ASC;
    `);
    return resultado.rows;
};

export async function filtrarObrasFinalizadasModel(){
    const resultado = await pool.query(`
        SELECT obras.nome, obras.descricao, img.url, obras.id
        FROM obras
        LEFT JOIN imagens img ON img.obra_id = obras.id
        AND img.eh_principal = true
        WHERE obras.progresso = 100
        ORDER BY obras.id ASC
        `);
    return resultado.rows;
};

export async function filtrarObrasEmAndamentoModel(){
    const resultado = await pool.query(`
        SELECT obras.nome, obras.descricao, img.url, obras.id
        FROM obras
        LEFT JOIN imagens img ON img.obra_id = obras.id
        AND img.eh_principal = true
        WHERE obras.progresso <= 99
        ORDER BY obras.id ASC
        `);
    return resultado.rows;  
};

export async function getObrasPorId(id){
    const resultado = await pool.query(`SELECT * FROM obras WHERE id = $1 `, [id]);
    return resultado.rows[0];
};

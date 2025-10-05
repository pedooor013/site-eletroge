import pool from '../db.js';

export async function  getTodasObras(){
    const resultado = await pool.query('SELECT * FROM obras ORDER BY id ASC');
    return resultado.rows;
};

export async function filtrarObrasFinalizadas(){
    const resultado = await pool.query('SELECT * FROM obras WHERE progresso = 100');
    return resultado.rows;
};

export async function filtrarObrasEmAndamento(){
    const resultado = await pool.query('SELECT * FROM obras WHERE progresso < 100');
    return resultado.rows;
};

export async function getObrasPorId(id){
    const resultado = await pool.query(`SELECT * FROM obras WHERE id = $1 `, [id]);
    return resultado.rows[0];
};

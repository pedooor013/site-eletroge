import pool from '../db.js';

export async function getAllServicesModels(){
    const servicesResult = await pool(`
            SELECT * FROM servicos;
        `)
    return servicesResult.rows;
};
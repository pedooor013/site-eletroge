import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT || 5432,
});

pool.on('connect', () =>{
    console.log(`Banco de dados conectado!`);
});

pool.on('error', (err) =>{
    console.log(`Erro ao se conectar ao banco de dados ${err}`);
});

export default pool;


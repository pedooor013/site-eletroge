import pool from '../db.js';

pool.query(
    `
    CREATE TABLE IF NOT EXIST users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password TEXT NOT NULL
    );
    `
);

async function findUserByEmailModels(email){
    return new Promise((res, rej) =>{
        pool.query(`
                SELECT id, username, email
                FROM users
                WHERE email = ?;
            `, [email],
    (err,row) =>{
        if(err){
            rej(err);
        }else{
            res(row);  
        }
        })
    })
}


export default{
    findUserByEmailModels
}
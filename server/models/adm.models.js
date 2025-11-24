import pool from '../db.js';

async function findUserByEmailModels(email){
    return new Promise((res, rej) =>{
        pool.query(`
                SELECT id, username, email, password
                FROM users
                WHERE email = $1
            `, [email],
    (err,row) =>{
        if(err){
            rej(err);
        }else{
            res(row.rows[0]);  
        }
        })
    })
}


export default{
    findUserByEmailModels
}
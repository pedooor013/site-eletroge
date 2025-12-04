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

async function createNewWorkModels({name, description, progress, arrServicesId, arrImage}){
    try{
        pool.query(`
            INSERT INTO obras(nome, descricao, progresso)
            VALUES($1, $2, $3)
            RETURNING id;
            `, [name], [description], [progress]);
            const obraId = result.rows[0].id;
            
            await createRelationshipsWorkService(obraId, arrServicesId);

        }catch(err){
            return console.error(err);
        }
};

async function createRelationshipsWorkService(obraId, arrServicesId){
    return new Promise((res,rej) =>{
        for(countArrPosition = 0; countArrPosition < arrServicesId.length; countArrPosition++){
            pool.query(`
                INSERT INTO obra_servico
                `)
        }
    })
}

export default{
    findUserByEmailModels
}
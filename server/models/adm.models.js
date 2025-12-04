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
        const result = await pool.query(`
            INSERT INTO obras(nome, descricao, progresso)
            VALUES($1, $2, $3)
            RETURNING id;
            `, [name, description, progress]);
            const obraId = result.rows[0].id;
            
            await createRelationshipsWorkService(obraId, arrServicesId);

            return obraId;

        }catch(err){
            console.error(err);
            throw err;
        }
};

async function createRelationshipsWorkService(obraId, arrServicesId){
    try{
        for(countArrPosition = 0; countArrPosition < arrServicesId.length; countArrPosition++){
            await pool.query(`
                INSERT INTO obra_servico(obra_id, servico_id)
                VALUES($1, $2)
                `, [obraId, arrServicesId[countArrPosition]]); 
            };
        }catch(err){
            throw new Error("Erro ao criar um relacionamento entre a obra e os serviços!");
        }
}



export default{
    findUserByEmailModels
}
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

            await createRelationshipsWorkImage(obraId, arrImage);

            return obraId;

        }catch(err){
            throw new Error("Erro ao cadastrar a obra!")
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
    
async function createRelationshipsWorkImage(obraId, arrImage){
    try{
    for(countArrPosition = 0; countArrPosition < arrImage.length; countArrPosition++){
    
        if(countArrPosition == 0){
            await pool.query(`
                INSERT INTO imagens(obra_id, url, eh_principal)
                VALUES($1, $2, true)
                `, [obraId, arrImage[countArrPosition]]); 
        }
        else{
            await pool.query(`
                INSERT INTO imagens(obra_id, url)
                VALUES($1, $2)
                `, [obraId, arrImage[countArrPosition]]); 
            };
        }
    }catch(err){
        throw new Error("Erro ao criar um relacionamento entre a obra e os serviços!");
    }
}




export default{
    findUserByEmailModels
}
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

async function createNewWorkModels(newWork){
    const {workName, workDescription, workProgress, workService, workImg} = newWork;
    
    pool.query(
        `
        INSERT INTO obras(nome, descricao, progresso)
        VALUES($1, $2, $3);
        `, [workName], [workDescription], [workProgress],
        function(err){
            if(err){
                rej(err);
            }else{
                res({id: this.lastID, ...newWork})
            }
        }    
    )
    const workId = res.id;

    await createNewWorkImagesModels(workId, workImg);
    await createNewWorkServiceModels(workId, workService);

    
}

async function createNewWorkImagesModels(workId, workImgs){
    if(Array.isArray(workImgs) && workImgs.length > 0){
        for(const imgs of workImgs){
            pool.query(`
                INSERT INTO imagens (url, obra_id, eh_principal)
                VALUES($1, $2, $3);
                `, [imgs.url, workId, imgs.principal || 0],
                function(err){
                    if(err){
                        if(err){
                            rej(err);
                        }
                    }
                }
            );
        }
    }
}

async function createNewWorkServiceModels(workId, workService){
    if(Array.isArray(workService) && workService.length > 0){
        for(const services of workService){
            pool.query(`
                INSERT INTO obra_servico()
                `)
        }
    }
}

export default{
    findUserByEmailModels
}
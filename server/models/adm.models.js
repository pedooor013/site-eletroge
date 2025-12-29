import pool from '../db.js';

async function findUserByEmailModels(email){
    return new Promise((res, rej) =>{
        pool.query(`
                SELECT id, email, password
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

// async function createNewWorkModels({name, description, progress, arrServicesId, arrImage}){
//     try{

//         const result = await pool.query(`
//             INSERT INTO obras(nome, descricao, progresso)
//             VALUES($1, $2, $3)
//             RETURNING id;
//             `, [name, description, progress]);
//             const obraId = result.rows[0].id;
            
//             await createRelationshipsWorkService(obraId, arrServicesId);
            
//             await createRelationshipsWorkImage(obraId, arrImage);

//             return obraId;

//         }catch(err){
//             throw new Error("Erro ao cadastrar a obra!");
//         }
// };

async function createNewWorkModels({name, description, progress, arrServicesId, arrImage}){
    try{
        console.log("🏗️ Criando obra no banco...");
        console.log("Dados:", { name, description, progress });
        
        const result = await pool.query(`
            INSERT INTO obras(nome, descricao, progresso)
            VALUES($1, $2, $3)
            RETURNING id;
            `, [name, description, progress]);
            
        const obraId = result.rows[0].id;
        console.log("✅ Obra criada com ID:", obraId);
        
        console.log("🔧 Criando relacionamentos com serviços...");
        await createRelationshipsWorkService(obraId, arrServicesId);
        console.log("✅ Relacionamentos com serviços criados!");

        console.log("🖼️ Criando relacionamentos com imagens...");
        await createRelationshipsWorkImage(obraId, arrImage);
        console.log("✅ Relacionamentos com imagens criados!");

        return obraId;

    }catch(err){
        // ✅ MOSTRAR O ERRO REAL:
        console.error("❌❌❌ ERRO REAL DO BANCO:", err);
        console.error("❌ Mensagem:", err.message);
        console.error("❌ Code:", err.code);
        console.error("❌ Detail:", err.detail);
        console.error("❌ Stack completo:", err.stack);
        throw err; // ← JOGUE O ERRO ORIGINAL, NÃO UM GENÉRICO!
    }
}
async function createRelationshipsWorkService(obraId, arrServicesId){
    try{
        for(let countArrPosition = 0; countArrPosition < arrServicesId.length; countArrPosition++){
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
        console.log("🖼️ createRelationshipsWorkImage chamada:");
        console.log("obraId:", obraId);
        console.log("arrImage:", arrImage);
        console.log("arrImage é array?", Array.isArray(arrImage));
        console.log("arrImage.length:", arrImage?.length);
        for(let countArrPosition = 0; countArrPosition < arrImage.length; countArrPosition++){
            console.log(`Inserindo imagem ${countArrPosition}:`, arrImage[countArrPosition]);

            if(countArrPosition == 0){
                await pool.query(`
                    INSERT INTO imagens(obra_id, url, eh_principal)
                    VALUES($1, $2, true)
                    `, [obraId, arrImage[countArrPosition]]); 
            } else {
                await pool.query(`
                    INSERT INTO imagens(obra_id, url)
                    VALUES($1, $2)
                    `, [obraId, arrImage[countArrPosition]]); 
            }
        }
    console.log("✅ Todas as imagens inseridas com sucesso!");

    }catch(err){
       // throw new Error("Erro ao criar um relacionamento entre a obra e as imagens!");
        console.error("❌ Erro DETALHADO em createRelationshipsWorkImage:", err);
        console.error("❌ Stack:", err.stack);
        throw new Error("Erro ao criar um relacionamento entre a obra e as imagens!");
    }
}

async function updatedWorkFieds(updatedWork, workId) {
    // Mapeamento JSON -> Banco
    const fieldMap = {
        name: 'nome',
        description: 'descricao',
        progress: 'progresso'
    };

    let query = 'UPDATE obras SET ';
    const values = [];
    let index = 1;
    const sets = [];

    for (const jsonKey in fieldMap) {
        const dbField = fieldMap[jsonKey];
        if (updatedWork[jsonKey] !== undefined) {
            sets.push(`${dbField} = $${index}`);
            values.push(updatedWork[jsonKey]);
            index++;
        }
    }

    if (sets.length === 0) {
        return { skipped: true, reason: "Nenhum campo para atualizar" };
    }

    query += sets.join(', ') + ` WHERE id = $${index}`;
    values.push(workId);

    await pool.query(query, values);

    return { query, values };
}

async function updatedWorkImages(updatedWork, workId) {
    if (!Array.isArray(updatedWork.arrImage)) {
        return { query: null, values: [] };
    }

    await pool.query(`DELETE FROM imagens WHERE obra_id = $1`, [workId]);
    await createRelationshipsWorkImage(workId, updatedWork.arrImage);

    return { 
        ok: true,
        totalInserted: updatedWork.arrImage.length
    };
}

async function updatedWorkServices(updatedWork, workId) {
    if (!Array.isArray(updatedWork.arrServicesId)) {
        return { query: null, values: [] };
    }

    await pool.query(`DELETE FROM obra_servico WHERE obra_id = $1`, [workId]);
    await createRelationshipsWorkService(workId, updatedWork.arrServicesId);

    return { 
        ok: true,
        totalInserted: updatedWork.arrServicesId.length
    };
}

async function updatedWorkModels(updatedWork, workId) {
    const updatedWorkFields = await updatedWorkFieds(updatedWork, workId);
    const updatedImages = await updatedWorkImages(updatedWork, workId);
    const updatedServices = await updatedWorkServices(updatedWork, workId);

    return {
        fields: updatedWorkFields,
        images: updatedImages,
        services: updatedServices
    };
}
async function deleteWorkModel(workId){
    return new Promise((res, rej) =>{
        pool.query(`
            DELETE FROM obras WHERE id = $1
            `, [workId], function(err){
                if(err){
                    rej(err);
                }else{
                    res({message: `Obra com o ID ${workId} foi deletada com sucesso!`});
                }
            })
    })
}


export default{
    findUserByEmailModels,
    createNewWorkModels,
    updatedWorkModels,
    deleteWorkModel
}
const express = require('express');
const mysql = require('mysql2');
const app = express();

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eletrogeDB'
});

conexao.connect((err) =>{
    if(err) {
        console.error('Erro ao conectar no DB: ', err);
        return;
    }console.log('Conectado ao MySQL com sucesso!');
});

app.get('/', (req, res) =>{
    res.send('API no ar!');
});
app.listen(3000, ()=>{
    console.log('Servidor rodando na porta 3000')
});

app.get('/obras/:id', (req, res) => {
    const obraId = req.params.id;

    const query = `
        SELECT
        o.id, o.nomeObra, o.descricao, o.imagem, o.progresso,
        c.nomeServico AS categoria, c.icone
        FROM obras o
        LEFT JOIN conexaoobrascategorias oc ON o.id = oc.obra_id
        LEFT JOIN categoriasobras c ON c.id = oc.categoriaObras_id
        WHERE o.id = ?
    `;
    conexao.query(query, [obraId], (err, results) =>{
        if(err){
            console.error('Erro ao buscar obra: ' , err);
            return res.status(500).send('Erro interno no servidor');
        }
        if(results.length === 0){
            return res.status(404).send('Obra não encontrada!');
        }

        const obra ={
            id: results[0].id,
            nomeObra: results[0].nomeObra,
            descricao: results[0].descricao,
            imagem: results[0].imagem,
            progresso: results[0].progresso,
            categorias: results.map(row => ({
                nome: row.categoria,
                icone: row.icone
            }))
        };
        res.json(obra);
    });
});
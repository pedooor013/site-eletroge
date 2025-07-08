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

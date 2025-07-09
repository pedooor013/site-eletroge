//Criando a conexao com o banco de dados eletrogeDB

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eletrogedb'
});

module.exports = db;

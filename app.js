// Servidor principal

const express = require('express');
const app = express();
const path = require('path');

const paginaRoutes = require('./routes/pagina.js');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/pagina', paginaRoutes);

app.listen(3000,() =>{
    console.log('Servidor rodando em http://localhost:3000')
})
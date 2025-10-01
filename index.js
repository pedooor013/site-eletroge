import express from 'express';
import dotenv from 'dotenv';
import obrasRoutes from './server/routes/obras.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/eletroge/obras', obrasRoutes);

app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})
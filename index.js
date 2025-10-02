import express from 'express';
import dotenv from 'dotenv';
import obrasRoutes from './server/routes/obras.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use('/eletroge', obrasRoutes);

app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})
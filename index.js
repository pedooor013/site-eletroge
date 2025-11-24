import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import obrasRoutes from './server/routes/obras.routes.js';
import detalhesObrasRoutes from './server/routes/obrasDetalhes.routes.js';
import servicosObras from './server/routes/servicos.routes.js';
import admRoutes from './server/routes/adm.routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

app.use('/eletroge', admRoutes);
app.use('/eletroge', obrasRoutes);
app.use('/eletroge', detalhesObrasRoutes);
app.use('/eletroge', servicosObras);

app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})
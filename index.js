import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import obrasRoutes from './server/routes/obras.routes.js';
import detalhesObrasRoutes from './server/routes/obrasDetalhes.routes.js';
import servicesRoutes from './server/routes/services.routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.static("public"));

app.use('/eletroge', obrasRoutes);
app.use('/eletroge', detalhesObrasRoutes);
app.use('/eletroge', servicesRoutes);

app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})
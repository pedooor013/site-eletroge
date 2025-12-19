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

// ✅ CORS SUPER PERMISSIVO
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: '*',
    credentials: true
}));

// ✅ LOG COMPLETO DE REQUISIÇÕES E RESPOSTAS
app.use((req, res, next) => {





    
    // ✅ LOG DA RESPOSTA
    const originalSend = res.send;
    const originalJson = res.json;
    
    res.send = function(data) {




        originalSend.call(this, data);
    };
    
    res.json = function(data) {




        originalJson.call(this, data);
    };
    
    next();
});

app.use(express.static("public"));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/eletroge', admRoutes);
app.use('/eletroge', obrasRoutes);
app.use('/eletroge', detalhesObrasRoutes);
app.use('/eletroge', servicosObras);

app.listen(PORT, () =>{

});
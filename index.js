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
    console.log('===================');
    console.log(`📨 REQUISIÇÃO: ${req.method} ${req.url}`);
    console.log(`📨 Origin: ${req.headers.origin}`);
    console.log(`📨 Content-Type: ${req.headers['content-type']}`);
    console.log('===================');
    
    // ✅ LOG DA RESPOSTA
    const originalSend = res.send;
    const originalJson = res.json;
    
    res.send = function(data) {
        console.log('📤 RESPOSTA ENVIADA (send):');
        console.log('📤 Status:', res.statusCode);
        console.log('📤 Data:', typeof data === 'string' ? data.substring(0, 200) : data);
        console.log('===================');
        originalSend.call(this, data);
    };
    
    res.json = function(data) {
        console.log('📤 RESPOSTA ENVIADA (json):');
        console.log('📤 Status:', res.statusCode);
        console.log('📤 Data:', data);
        console.log('===================');
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
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
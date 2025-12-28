    import express from "express";
    import dotenv from "dotenv";
    import cors from "cors";
    import path from "path";
    import { fileURLToPath } from "url";

    import obrasRoutes from "./server/routes/obras.routes.js";
    import detalhesObrasRoutes from "./server/routes/obrasDetalhes.routes.js";
    import servicosObras from "./server/routes/servicos.routes.js";
    import admRoutes from "./server/routes/adm.routes.js";

    dotenv.config();

    const app = express();
    const PORT = process.env.PORT  || 3000;

    // 🔹 necessário por causa do ES Modules (import)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // ✅ CORS SUPER PERMISSIVO
    app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: "*",
        credentials: true,
    })
    );

    // (opcional) log – não mexi
    app.use((req, res, next) => {
    const originalSend = res.send;
    const originalJson = res.json;

    res.send = function (data) {
        originalSend.call(this, data);
    };

    res.json = function (data) {
        originalJson.call(this, data);
    };

    next();
    });

    // ✅ arquivos estáticos (JS, CSS, imagens)
    app.use(express.static("public"));

    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ limit: "50mb", extended: true }));

    // ✅ ROTA PRINCIPAL → aponta para o HTML correto
    app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public/client/views/index.html")
    );
    });

    // ✅ ROTAS DA APLICAÇÃO
    app.use("/eletroge", admRoutes);
    app.use("/eletroge", obrasRoutes);
    app.use("/eletroge", detalhesObrasRoutes);
    app.use("/eletroge", servicosObras);

    // ✅ LISTEN CORRETO PARA O RENDER
    app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT);
    });

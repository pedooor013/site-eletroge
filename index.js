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
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: "*",
    credentials: true,
  })
);

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

// ✅ Serve apenas o ADM (arquivos estáticos da pasta adm)
app.use("/adm", express.static(path.join(__dirname, "public/adm")));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ✅ ROTAS DA API E ADM
app.use("/eletroge", admRoutes);
app.use("/eletroge", obrasRoutes);
app.use("/eletroge", detalhesObrasRoutes);
app.use("/eletroge", servicosObras);

app.listen(PORT, () => {});
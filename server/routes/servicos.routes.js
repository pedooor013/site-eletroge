import express from 'express';
import { getAllServicesController } from "../controllers/servicos.controller.js";

const router = express.Router();

router.get("/servicos/", getAllServicesController);

export default router;
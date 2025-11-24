import express from 'express';
import { getAllServicesController } from "../controllers/servicos.controller.js";

const router = express.Router();

router.get("/services/", getAllServicesController);

export default router;
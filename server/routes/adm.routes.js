import express from 'express';
import admController from '../controllers/adm.controller.js';
import {uploadImagesController, uploadImagesMiddleware} from '../upload.js';

const router = express.Router();

router.post("/login", admController.loginAdmController);
router.post("/cadastrarObra", admController.authMiddleware, admController.createNewWorkController);
router.post("/upload", admController.authMiddleware, uploadImagesMiddleware, uploadImagesController);
router.patch("/editarObra/:id", admController.authMiddleware, admController.updatedWorkController);
router.delete("/deletarObra/:id", admController.authMiddleware, admController.deleteWorkController);



export default router;
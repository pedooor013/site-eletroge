import express from 'express';
import admController from '../controllers/adm.controller.js';
import {uploadImagesController, uploadImagesMiddleware} from '../upload.js';

const router = express.Router();

router.post('/login', admController.loginAdmController);
router.post('/cadastrarObra', admController.createNewWorkController);
router.post("/upload", uploadImagesMiddleware, uploadImagesController);


export default router;
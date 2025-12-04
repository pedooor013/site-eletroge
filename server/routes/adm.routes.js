import express from 'express';
import admController from '../controllers/adm.controller.js';

const router = express.Router();

router.post('/login', admController.loginAdmController);
router.post('/cadastrarObra', admController.createNewWorkController);

export default router;
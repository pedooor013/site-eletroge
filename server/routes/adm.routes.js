import express from 'express';
import admController from '../controllers/adm.controller.js';
import upload from '../upload.js';

const router = express.Router();

router.post('/login', admController.loginAdmController);
router.post('/cadastrarObra', admController.createNewWorkController);
router.post("/upload", upload.single("imagem"), (req,res) =>{
    return res.json({
        url: req.file.path,
    });
});

export default router;
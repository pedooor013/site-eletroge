import express from 'express';
import { listarObras, listarObrasPorId, filtrarObrasEmAndamentoController, filtrarObrasFinalizadasController } from '../controllers/obras.controllers.js';

const router = express.Router();

router.get('/obras/', listarObras);
router.get('/obras/finalizadas', filtrarObrasFinalizadasController);
router.get('/obras/andamento', filtrarObrasEmAndamentoController);
router.get('/obras/:id', listarObrasPorId);

export default router;
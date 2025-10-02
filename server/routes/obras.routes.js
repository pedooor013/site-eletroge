import express from 'express';
import { listarObras, listarObrasPorId } from '../controllers/obras.controllers.js';

const router = express.Router();

router.get('/obras/', listarObras);
router.get('/obras/:id', listarObrasPorId);

export default router;
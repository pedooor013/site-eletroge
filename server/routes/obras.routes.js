import express from 'express';
import { listarObras, listarObrasPorId } from '../controllers/obras.controllers.js';

const router = express.Router();

router.get('/', listarObras);
router.get('/:id', listarObrasPorId);

export default router;
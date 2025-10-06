import express from 'express';
import { exibirDadosObraController} from '../controllers/obrasDetalhes.controller.js';

const router = express.Router();

router.get('/obras/detalhes/:id', exibirDadosObraController);

export default router;
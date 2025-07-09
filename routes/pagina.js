const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Rota para listar todas as obras
router.get('/obras', (req, res) => {
    db.query('SELECT * FROM obras', (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar obras' });
        res.json(results);
    });
});

// Rota para buscar uma obra específica
router.get('/obras/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM obras WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro no banco' });
        if (results.length === 0) return res.status(404).json({ erro: 'Obra não encontrada' });
        res.json(results[0]);
    });
});

module.exports = router;

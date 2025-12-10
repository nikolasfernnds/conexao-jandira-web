const express = require('express');
const router = express.Router();
const cors = require('cors');

const controllerComentario = require('../../controller/comentario/controllerComentario.js');

router.use(cors());

// === ROTAS PARA COMENTÁRIOS DE NOTÍCIA ===

// POST /v1/gnn/comentarios/noticia (CREATE)
router.post('/noticia', async (req, res) => {
    let novoComentario = await controllerComentario.criarNovoComentarioNoticia(req.body, req.headers['content-type']);
    res.status(novoComentario.status_code || 500).json(novoComentario);
});

// GET /v1/gnn/comentarios/noticia/:idNoticia (READ)
router.get('/noticia/:idNoticia', async (req, res) => {
    let comentarios = await controllerComentario.listarComentariosPorNoticia(req.params.idNoticia);
    res.status(comentarios.status_code || 500).json(comentarios);
});

// === ROTAS PARA COMENTÁRIOS DE OCORRÊNCIA ===

// POST /v1/gnn/comentarios/ocorrencia (CREATE)
router.post('/ocorrencia', async (req, res) => {
    let novoComentario = await controllerComentario.criarNovoComentarioOcorrencia(req.body, req.headers['content-type']);
    res.status(novoComentario.status_code || 500).json(novoComentario);
});

// GET /v1/gnn/comentarios/ocorrencia/:idOcorrencia (READ)
router.get('/ocorrencia/:idOcorrencia', async (req, res) => {
    let comentarios = await controllerComentario.listarComentariosPorOcorrencia(req.params.idOcorrencia);
    res.status(comentarios.status_code || 500).json(comentarios);
});

module.exports = router;
/*****************************************************************************
 * Objetivo: Arquivo responsável pela definição das rotas para o CRUD de Comentários de Ocorrência.
 * Data: 11/12/2025
 * Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Versão: 1.0
 ******************************************************************************/

const express = require('express');
const router = express.Router();

const comentarioOcorrenciaController = require('../../controller/comentario/comentarioOcorrenciaController'); 
const comentarioNoticiaController = require('../../controller/comentario/comentarioNoticiaController'); 

const middlewareAutenticacao = (req, res, next) => {
    req.idUsuarioAutenticado = 101; 
    next();
};

// GET /api/v1/ocorrencias/:idOcorrencia/comentarios
router.get('/:idOcorrencia/comentarios', async (req, res) => {
    const idOcorrencia = req.params.idOcorrencia;

    const dadosComentarios = await comentarioOcorrenciaController.getComentariosOcorrencia(idOcorrencia);

    res.status(dadosComentarios.status).json(dadosComentarios);
});

// POST /api/v1/ocorrencias/:idOcorrencia/comentarios
router.post('/:idOcorrencia/comentarios', middlewareAutenticacao, async (req, res) => {
    const dadosBody = req.body;
    const idOcorrencia = Number(req.params.idOcorrencia);
    const idUsuarioAutenticado = req.idUsuarioAutenticado;

    const dadosComentario = {
        id_ocorrencia: idOcorrencia,
        id_usuario: idUsuarioAutenticado,
        conteudo: dadosBody.conteudo
    };

    const result = await comentarioOcorrenciaController.setNovoComentarioOcorrencia(dadosComentario);

    res.status(result.status).json(result);
});

// PUT /api/v1/comentarios/:idComentario 
router.put('/comentarios/:idComentario', middlewareAutenticacao, async (req, res) => {
    const idComentario = Number(req.params.idComentario);
    const novoConteudo = req.body.conteudo;
    const idUsuarioAutenticado = req.idUsuarioAutenticado;

    // Reutiliza a função setAtualizarComentario do NoticiaController, pois a lógica é a mesma (chama o DAO genérico)
    const result = await comentarioNoticiaController.setAtualizarComentario(idComentario, novoConteudo, idUsuarioAutenticado);

    res.status(result.status).json(result);
});

// DELETE /api/v1/comentarios/:idComentario 
router.delete('/comentarios/:idComentario', middlewareAutenticacao, async (req, res) => {
    const idComentario = Number(req.params.idComentario);
    const idUsuarioAutenticado = req.idUsuarioAutenticado;

    // Reutiliza a função setExcluirComentario do NoticiaController
    const result = await comentarioNoticiaController.setExcluirComentario(idComentario, idUsuarioAutenticado);

    res.status(result.status).json(result);
});

module.exports = router;
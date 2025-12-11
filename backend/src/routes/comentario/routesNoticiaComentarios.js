// routes/comentario/routesNoticiaComentarios.js

const express = require('express');
const router = express.Router();
const comentarioController = require('../../controller/comentario/comentarioNoticiaController'); 

// ROTA: GET para listar todos os comentários por ID de Notícia
router.get('/:idNoticia/comentarios', async (request, response) => {
    const idNoticia = request.params.idNoticia;

    const dadosComentario = await comentarioController.getComentariosNoticia(idNoticia);
    
    // Agora que status_code sempre existe, este uso é seguro.
    response.status(dadosComentario.status_code).json(dadosComentario); 
});

module.exports = router;
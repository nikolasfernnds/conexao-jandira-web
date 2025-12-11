/*****************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócio (Controller) 
 * para a entidade Comentário de Ocorrência.
 * Data: 11/12/2025
 * Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Versão: 1.0
 ******************************************************************************/

const comentarioDAO = require('../../model/DAO/comentario/comentarios');
const messages = require('../modulo/configMessages');

const setNovoComentarioOcorrencia = async function(dadosComentario) {
    if (!dadosComentario.id_ocorrencia || isNaN(dadosComentario.id_ocorrencia) ||
        !dadosComentario.id_usuario || isNaN(dadosComentario.id_usuario) ||
        !dadosComentario.conteudo || dadosComentario.conteudo.trim() === '') {
        
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }

    if (dadosComentario.conteudo.length > 1000) {
        return { status: 400, message: MESSAGE_ERROR.CONTENT_TOO_LONG };
    }

    try {
        const idComentario = await comentarioDAO.setInsertComentarioOcorrencia(dadosComentario);

        if (idComentario) {
            return { 
                status: 201, 
                message: MESSAGE_SUCCESS.INSERT_ITEM, 
                id_comentario: idComentario 
            };
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR };
        }

    } catch (error) {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR };
    }
}

const getComentariosOcorrencia = async function(idOcorrencia) {
    if (!idOcorrencia || isNaN(idOcorrencia)) {
        return { status: 400, message: MESSAGE_ERROR.INVALID_ID };
    }

    try {
        const comentarios = await comentarioDAO.getSelectComentariosByOcorrenciaId(idOcorrencia);
        
        if (comentarios) {
            if (comentarios.length > 0) {
                return { status: 200, comentarios: comentarios };
            } else {
                return { status: 404, message: MESSAGE_ERROR.NOT_FOUND };
            }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR };
        }
    } catch (error) {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR };
    }
}

module.exports = {
    messages,
    setNovoComentarioOcorrencia,
    getComentariosOcorrencia,
}
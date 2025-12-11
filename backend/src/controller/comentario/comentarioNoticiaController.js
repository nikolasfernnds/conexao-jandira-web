/*****************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócio (Controller) 
 * para a entidade Comentário de Notícia.
 * Data: 11/12/2025
 * Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Versão: 1.1
 ******************************************************************************/

const comentarioDAO = require('../../model/DAO/comentario/comentarios');
const messages = require('../modulo/configMessages.js'); 

const setNovoComentarioNoticia = async function(dadosComentario) {
    if (!dadosComentario.id_noticia || isNaN(dadosComentario.id_noticia) ||
        !dadosComentario.id_usuario || isNaN(dadosComentario.id_usuario) ||
        !dadosComentario.conteudo || dadosComentario.conteudo.trim() === '') {
        
        return messages.ERROR_REQUIRED_FIELDS;
    }

    if (dadosComentario.conteudo.length > 1000) {
        return messages.ERROR_REQUIRED_FIELDS; 
    }

    try {
        const idComentario = await comentarioDAO.setInsertComentarioNoticia(dadosComentario);

        if (idComentario) {
            let sucesso = messages.SUCESS_CREATED_ITEM;
            sucesso.id_comentario = idComentario;
            return sucesso;
        } else {
            return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
        }

    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

const getComentariosNoticia = async function(idNoticia) {
    if (!idNoticia || isNaN(idNoticia)) {
        return messages.ERROR_INVALID_ID;
    }

    try {
        const comentarios = await comentarioDAO.getSelectComentariosByNoticiaId(idNoticia);
        
        if (comentarios) {
            if (comentarios.length > 0) {
                // Objeto de sucesso para a listagem
                return { status: true, status_code: 200, comentarios: comentarios };
            } else {
                return messages.ERROR_NOT_FOUND;
            }
        } else {
            return messages.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

const setAtualizarComentario = async function(idComentario, novoConteudo, idUsuarioAutenticado) {
    if (!idComentario || isNaN(idComentario) || 
        !novoConteudo || novoConteudo.trim() === '') {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    try {
        const comentarioExistente = await comentarioDAO.getSelectComentarioById(idComentario);
        
        if (!comentarioExistente) {
            return messages.ERROR_NOT_FOUND;
        }

        if (comentarioExistente.id_usuario !== idUsuarioAutenticado) {
            return messages.ERROR_ACESS_DENIED; 
        }

        const result = await comentarioDAO.setUpdateComentario(idComentario, novoConteudo);

        if (result) {
            return messages.SUCESS_REQUEST;
        } else {
            return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
        }

    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

const setExcluirComentario = async function(idComentario, idUsuarioAutenticado) {
    if (!idComentario || isNaN(idComentario)) {
        return messages.ERROR_INVALID_ID;
    }
    
    try {
        const comentarioExistente = await comentarioDAO.getSelectComentarioById(idComentario);
        
        if (!comentarioExistente) {
            // Se o item não existe, o DAO retornará false no delete
        } else {
            if (comentarioExistente.id_usuario !== idUsuarioAutenticado) {
                return messages.ERROR_ACESS_DENIED; 
            }
        }
        
        const result = await comentarioDAO.setDeleteComentarioGeral(idComentario);

        if (result) {
            return messages.SUCCESS_DELETED_ITEM;
        } else {
            return messages.ERROR_NOT_FOUND; 
        }

    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}


module.exports = {
    setNovoComentarioNoticia,
    getComentariosNoticia,
    setAtualizarComentario,
    setExcluirComentario
}
/*******************************************************************************************************************
 * Objetivo: Arquivo de Controller para manipulação de dados da entidade Comentário.
 * Autor: [Seu Nome]
 * Data: 09/12/2025
 * Versão: 1.0
 ******************************************************************************************************************/

const comentarioModel = require('../../model/DAO/comentario/comentariosMulti.js'); 
const defaultMessages = require('../../controller/modulo/configMessages.js')

// === FUNÇÕES PARA NOTÍCIA ===

const criarNovoComentarioNoticia = async function(dadosComentario, contentType) {
    if (String(contentType).toLowerCase() != 'application/json') return config.ERROR_CONTENT_TYPE;

    // Validação de campos obrigatórios: conteudo, id_usuario, id_noticia
    if (!dadosComentario.conteudo || dadosComentario.conteudo === '' || dadosComentario.conteudo.length > 500 ||
        !dadosComentario.id_usuario || isNaN(dadosComentario.id_usuario) ||
        !dadosComentario.id_noticia || isNaN(dadosComentario.id_noticia)
    ) return ERROR_REQUIRED_FIELDS;

    const result = await comentarioModel.insertComentarioNoticia(dadosComentario);

    if (result) {
        return { status_code: config.STATUS_CODE.CREATED, message: SUCCESS_CREATED_ITEM.message };
    } else {
        return ERROR_INTERNAL_SERVER_DB;
    }
};

const listarComentariosPorNoticia = async function(idNoticia) {
    if (isNaN(idNoticia) || idNoticia == '' || idNoticia == undefined) return ERROR_INVALID_ID;

    const dadosComentarios = await comentarioModel.selectComentariosByNoticiaId(idNoticia);

    if (dadosComentarios) {
        return { comentarios: dadosComentarios, status_code: config.STATUS_CODE.OK };
    } else {
        return ERROR_NOT_FOUND;
    }
};

// === FUNÇÕES PARA OCORRÊNCIA ===

const criarNovoComentarioOcorrencia = async function(dadosComentario, contentType) {
    if (String(contentType).toLowerCase() != 'application/json') return config.ERROR_CONTENT_TYPE;

    // Validação de campos obrigatórios: conteudo, id_usuario, id_ocorrencia
    if (!dadosComentario.conteudo || dadosComentario.conteudo === '' || dadosComentario.conteudo.length > 500 ||
        !dadosComentario.id_usuario || isNaN(dadosComentario.id_usuario) ||
        !dadosComentario.id_ocorrencia || isNaN(dadosComentario.id_ocorrencia)
    ) return ERROR_REQUIRED_FIELDS;

    const result = await comentarioModel.insertComentarioOcorrencia(dadosComentario);

    if (result) {
        return { status_code: config.STATUS_CODE.CREATED, message: SUCCESS_CREATED_ITEM.message };
    } else {
        return ERROR_INTERNAL_SERVER_DB;
    }
};

const listarComentariosPorOcorrencia = async function(idOcorrencia) {
    if (isNaN(idOcorrencia) || idOcorrencia == '' || idOcorrencia == undefined) return ERROR_INVALID_ID;

    const dadosComentarios = await comentarioModel.selectComentariosByOcorrenciaId(idOcorrencia);

    if (dadosComentarios) {
        return { comentarios: dadosComentarios, status_code: config.STATUS_CODE.OK };
    } else {
        return ERROR_NOT_FOUND;
    }
};


module.exports = {
    criarNovoComentarioNoticia,
    listarComentariosPorNoticia,
    criarNovoComentarioOcorrencia,
    listarComentariosPorOcorrencia,
};
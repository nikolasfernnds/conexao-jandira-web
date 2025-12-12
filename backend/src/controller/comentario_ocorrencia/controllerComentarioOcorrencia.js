/********************************************************************************
 *  Objetivo: Arquivo responsável pela manipulação de dados entre App e a Model
 *  Data: 12/12/2025
 *  Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
 ********************************************************************************/

const comentarioOcorrenciaDAO = require('../../model/DAO/comentario_ocorrencia/comentario_ocorrencia.js')
const defaultMessages = require('../modulo/configMessages.js')

const validarDadosComentarioOcorrencia = async function (dados) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    if (!dados.id_ocorrencia || isNaN(dados.id_ocorrencia)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{id_ocorrencia é obrigatório} "
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }

    if (!dados.id_usuario || isNaN(dados.id_usuario)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{id_usuario é obrigatório} "
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }

    if (!dados.id_comentario || isNaN(dados.id_comentario)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{id_comentario é obrigatório} "
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }

    return false
}

const listarComentarioOcorrencia = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        let result = await comentarioOcorrenciaDAO.getAllComentarioOcorrencia()

        if (result && result.length > 0) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
            MESSAGES.DEFAULT_HEADER.itens = result
            return MESSAGES.DEFAULT_HEADER
        }

        return MESSAGES.ERROR_NOT_FOUND

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarComentarioOcorrenciaId = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (!isNaN(id) && id > 0) {
            let result = await comentarioOcorrenciaDAO.getComentarioOcorrenciaById(id)

            if (result && result.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.itens = result[0]
                return MESSAGES.DEFAULT_HEADER
            }

            return MESSAGES.ERROR_NOT_FOUND
        }

        MESSAGES.ERROR_REQUIRED_FIELDS.message += "[Id inválido]"
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const inserirComentarioOcorrencia = async function (dados, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (String(contentType).toUpperCase() !== "APPLICATION/JSON")
            return MESSAGES.ERROR_CONTENT_TYPE

        let validar = await validarDadosComentarioOcorrencia(dados)
        if (validar)
            return validar

        let result = await comentarioOcorrenciaDAO.setInsertComentarioOcorrencia(dados)

        if (result) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message
            MESSAGES.DEFAULT_HEADER.itens = dados
            return MESSAGES.DEFAULT_HEADER
        }

        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarComentarioOcorrencia = async function (dados, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (String(contentType).toUpperCase() !== "APPLICATION/JSON")
            return MESSAGES.ERROR_CONTENT_TYPE

        let validar = await validarDadosComentarioOcorrencia(dados)
        if (validar)
            return validar

        let validarId = await buscarComentarioOcorrenciaId(id)
        if (validarId.status_code !== 200)
            return validarId

        dados.id_comentario_ocorrencia = Number(id)

        let result = await comentarioOcorrenciaDAO.setUpdateComentarioOcorrencia(dados)

        if (result) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message
            MESSAGES.DEFAULT_HEADER.itens = dados
            return MESSAGES.DEFAULT_HEADER
        }

        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirComentarioOcorrencia = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (isNaN(id) || id <= 0) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += "[Id incorreto]"
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

        let validarId = await buscarComentarioOcorrenciaId(id)
        if (validarId.status_code != 200)
            return validarId

        let result = await comentarioOcorrenciaDAO.setDeleteComentarioOcorrencia(id)

        if (result) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
            return MESSAGES.DEFAULT_HEADER
        }

        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    listarComentarioOcorrencia,
    buscarComentarioOcorrenciaId,
    inserirComentarioOcorrencia,
    atualizarComentarioOcorrencia,
    excluirComentarioOcorrencia
}

// Arquivo: src/controller/noticia/controllerNoticia.js

const noticiaDAO = require('../../model/DAO/noticia/noticia.js');
const MESSAGES = require('../modulo/configMessages.js'); // Usando 'configMessages' conforme solicitado.

// Função de Validação específica para o payload de Notícia
const validarDadosNoticia = (dados) => {
    const camposInvalidos = [];

    // Campos obrigatórios para INSERT/UPDATE:
    if (!dados.titulo || dados.titulo.length > 200) camposInvalidos.push('titulo');
    if (!dados.conteudo || dados.conteudo.length === 0) camposInvalidos.push('conteudo');
    if (!dados.foto_capa || dados.foto_capa.length > 255) camposInvalidos.push('foto_capa');
    if (!dados.id_categoria_noticia || isNaN(dados.id_categoria_noticia)) camposInvalidos.push('id_categoria_noticia');

    if (camposInvalidos.length > 0) {
        let ERROR_FIELDS = structuredClone(MESSAGES.ERROR_REQUIRED_FIELDS);
        ERROR_FIELDS.message += ` [Campos: ${camposInvalidos.join(', ')}]`;
        return ERROR_FIELDS;
    }

    return null;
};

// R - READ: Listar Todas (GET /noticias)
const listarNoticias = async () => {
    let RESPONSE = structuredClone(MESSAGES.DEFAULT_HEADER);

    try {
        const noticias = await noticiaDAO.getSelectAllNoticias();

        if (noticias && noticias.length > 0) {
            RESPONSE.status = true;
            RESPONSE.status_code = MESSAGES.SUCESS_REQUEST.status_code;
            RESPONSE.message = MESSAGES.SUCESS_REQUEST.message;
            RESPONSE.itens.noticias = noticias;
            return RESPONSE;
        } else {
            return MESSAGES.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error("Erro no Controller listarNoticias:", error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// R - READ: Buscar por ID (GET /noticias/:id)
const buscarNoticiaId = async (id) => {
    let RESPONSE = structuredClone(MESSAGES.DEFAULT_HEADER);

    if (!id || isNaN(id) || id <= 0) {
        return MESSAGES.ERROR_INVALID_ID;
    }

    try {
        const noticia = await noticiaDAO.getSelectByIdNoticia(Number(id));

        if (noticia) {
            RESPONSE.status = true;
            RESPONSE.status_code = MESSAGES.SUCESS_REQUEST.status_code;
            RESPONSE.message = MESSAGES.SUCESS_REQUEST.message;
            RESPONSE.itens.noticia = noticia;
            return RESPONSE;
        } else {
            return MESSAGES.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error("Erro no Controller buscarNoticiaId:", error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// C - CREATE: Inserir Notícia (POST /noticias)
const inserirNoticia = async (dados, contentType, id_autor_token) => {
    let RESPONSE = structuredClone(MESSAGES.DEFAULT_HEADER);

    if (String(contentType).toUpperCase() !== 'APPLICATION/JSON')
        return MESSAGES.ERROR_CONTENT_TYPE;

    const erroValidacao = validarDadosNoticia(dados);
    if (erroValidacao) return erroValidacao;
    
    // Adiciona dados de controle (Autor é pego do token)
    dados.id_autor = id_autor_token;
    dados.data_publicacao = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato MySQL DATETIME

    try {
        // Chama a função da DAO que executa sp_criar_noticia
        const inserido = await noticiaDAO.setInsertNoticia(dados);

        if (inserido) {
            RESPONSE.status = true;
            RESPONSE.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code;
            RESPONSE.message = 'Notícia inserida e notificação disparada com sucesso!';
            RESPONSE.itens.noticia = inserido; // Retorna o ID
            return RESPONSE;
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error("Erro no Controller inserirNoticia:", error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// U - UPDATE: Atualizar Notícia (PUT /noticias/:id)
const atualizarNoticia = async (dados, id, contentType) => {
    let RESPONSE = structuredClone(MESSAGES.DEFAULT_HEADER);

    if (String(contentType).toUpperCase() !== 'APPLICATION/JSON')
        return MESSAGES.ERROR_CONTENT_TYPE;

    const erroValidacao = validarDadosNoticia(dados);
    if (erroValidacao) return erroValidacao;

    // 1. Verifica se a notícia existe
    const existe = await buscarNoticiaId(id);
    if (existe.status_code !== MESSAGES.SUCESS_REQUEST.status_code) return existe;

    dados.id = Number(id);

    try {
        // Chama a função da DAO que executa sp_atualizar_noticia
        const atualizado = await noticiaDAO.setUpdateNoticia(dados);

        if (atualizado) {
            RESPONSE.status = true;
            RESPONSE.status_code = MESSAGES.SUCESS_REQUEST.status_code;
            RESPONSE.message = 'Notícia atualizada com sucesso!';
            RESPONSE.itens.noticia = dados;
            return RESPONSE;
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error("Erro no Controller atualizarNoticia:", error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// D - DELETE: Excluir Notícia (DELETE /noticias/:id)
const excluirNoticia = async (id) => {
    let RESPONSE = structuredClone(MESSAGES.DEFAULT_HEADER);

    if (!id || isNaN(id) || id <= 0) {
        return MESSAGES.ERROR_INVALID_ID;
    }

    // 1. Verifica se a notícia existe
    const existe = await buscarNoticiaId(id);
    if (existe.status_code !== MESSAGES.SUCESS_REQUEST.status_code) return existe;

    try {
        // Chama a função da DAO que executa sp_deletar_noticia
        const deletado = await noticiaDAO.setDeleteNoticia(Number(id));

        if (deletado) {
            RESPONSE.status = true;
            RESPONSE.status_code = MESSAGES.SUCESS_REQUEST.status_code;
            RESPONSE.message = 'Notícia excluída com sucesso.';
            return RESPONSE;
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error("Erro no Controller excluirNoticia:", error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

module.exports = {
    listarNoticias,
    buscarNoticiaId,
    inserirNoticia,
    atualizarNoticia,
    excluirNoticia
};
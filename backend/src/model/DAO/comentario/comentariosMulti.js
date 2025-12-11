/*******************************************************************************************************************
 * Objetivo: Arquivo de modelo/DAO para manipulação de dados da entidade Comentário no banco de dados.
 * Autor: [Seu Nome]
 * Data: 09/12/2025
 * Versão: 1.0
 ******************************************************************************************************************/

// Importa a biblioteca de conexão com o banco de dados (Ex: Prisma)
const { PrismaClient } = require('../../../../generated/prisma');
const prisma = new PrismaClient();

// === FUNÇÕES PARA COMENTÁRIO DE NOTÍCIA (tbl_comentario_noticia) ===

const insertComentarioNoticia = async function(dadosComentario) {
    try {
        const sql = `
            INSERT INTO tbl_comentario_noticia (conteudo, data_comentario, id_usuario, id_noticia) 
            VALUES ('${dadosComentario.conteudo}', NOW(), ${dadosComentario.id_usuario}, ${dadosComentario.id_noticia})
        `;
        const result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        return false;
    }
};

const selectComentariosByNoticiaId = async function(idNoticia) {
    try {
        const sql = `
            SELECT 
                cn.id_comentario_noticia AS id_comentario,
                cn.conteudo,
                DATE_FORMAT(cn.data_comentario, '%d/%m/%Y %H:%i:%s') AS data_comentario,
                u.id AS id_usuario,
                u.nome AS nome_usuario
            FROM tbl_comentario_noticia AS cn
            INNER JOIN tbl_usuario AS u ON cn.id_usuario = u.id
            WHERE cn.id_noticia = ${idNoticia}
            ORDER BY cn.data_comentario DESC
        `;
        const rsComentarios = await prisma.$queryRawUnsafe(sql);
        return rsComentarios.length > 0 ? rsComentarios : false;
    } catch (error) {
        return false;
    }
};

const selectComentarioNoticiaById = async function(id) {
    // Adicione a implementação do SELECT BY ID aqui
};

// === FUNÇÕES PARA COMENTÁRIO DE OCORRÊNCIA (tbl_comentario_ocorrencia) ===

const insertComentarioOcorrencia = async function(dadosComentario) {
    try {
        const sql = `
            INSERT INTO tbl_comentario_ocorrencia (conteudo, data_comentario, id_usuario, id_ocorrencia) 
            VALUES ('${dadosComentario.conteudo}', NOW(), ${dadosComentario.id_usuario}, ${dadosComentario.id_ocorrencia})
        `;
        const result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        return false;
    }
};

const selectComentariosByOcorrenciaId = async function(idOcorrencia) {
    try {
        const sql = `
            SELECT 
                co.id_comentario_ocorrencia AS id_comentario,
                co.conteudo,
                DATE_FORMAT(co.data_comentario, '%d/%m/%Y %H:%i:%s') AS data_comentario,
                u.id AS id_usuario,
                u.nome AS nome_usuario
            FROM tbl_comentario_ocorrencia AS co
            INNER JOIN tbl_usuario AS u ON co.id_usuario = u.id
            WHERE co.id_ocorrencia = ${idOcorrencia}
            ORDER BY co.data_comentario DESC
        `;
        const rsComentarios = await prisma.$queryRawUnsafe(sql);
        return rsComentarios.length > 0 ? rsComentarios : false;
    } catch (error) {
        return false;
    }
};

const selectComentarioOcorrenciaById = async function(id) {
    // Adicione a implementação do SELECT BY ID aqui
};


module.exports = {
    insertComentarioNoticia,
    selectComentariosByNoticiaId,
    selectComentarioNoticiaById,
    insertComentarioOcorrencia,
    selectComentariosByOcorrenciaId,
    selectComentarioOcorrenciaById
};
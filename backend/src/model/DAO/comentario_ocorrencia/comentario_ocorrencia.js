/*****************************************************************************
 *  Objetivo: Arquivo responsável pela integração pelo CRUD de dados do MySQL
 *  Data: 12/12/2025
 *  Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
******************************************************************************/

const { PrismaClient } = require('../../../../generated/prisma')
const prisma = new PrismaClient()

// Listar todos os registros
const getAllComentarioOcorrencia = async function () {
    try {
        let sql = `
            SELECT 
                co.id_comentario_ocorrencia,
                o.id_ocorrencia,
                u.id_usuario,
                u.nome_completo,
                c.id_comentario,
                c.conteudo,
                c.data_comentario
            FROM tbl_comentario_ocorrencia co
            INNER JOIN tbl_usuario u
                ON co.id_usuario = u.id_usuario
            INNER JOIN tbl_comentario c
                ON co.id_comentario = c.id_comentario
            INNER JOIN tbl_ocorrencia o
                ON co.id_ocorrencia = o.id_ocorrencia;
        `

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

// Buscar por ID
const getComentarioOcorrenciaById = async function (id) {
    try {
        let sql = `
            SELECT 
                co.id_comentario_ocorrencia,
                o.id_ocorrencia,
                u.id_usuario,
                u.nome_completo,
                c.id_comentario,
                c.conteudo,
                c.data_comentario
            FROM tbl_comentario_ocorrencia co
            INNER JOIN tbl_usuario u
                ON co.id_usuario = u.id_usuario
            INNER JOIN tbl_comentario c
                ON co.id_comentario = c.id_comentario
            INNER JOIN tbl_ocorrencia o
                ON co.id_ocorrencia = o.id_ocorrencia
            WHERE co.id_comentario_ocorrencia = ${id}
        `

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

// Inserir novo registro
const setInsertComentarioOcorrencia = async function (dados) {
    try {
        let sql = `
            INSERT INTO tbl_comentario_ocorrencia (id_ocorrencia, id_usuario, id_comentario)
            VALUES (${dados.id_ocorrencia}, ${dados.id_usuario}, ${dados.id_comentario});
        `

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

// Atualizar registro
const setUpdateComentarioOcorrencia = async function (dados) {
    try {
        let sql = `
            UPDATE tbl_comentario_ocorrencia
            SET id_ocorrencia = ${dados.id_ocorrencia},
                id_usuario = ${dados.id_usuario},
                id_comentario = ${dados.id_comentario}
            WHERE id_comentario_ocorrencia = ${dados.id_comentario_ocorrencia};
        `

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

// Deletar registro
const setDeleteComentarioOcorrencia = async function (id) {
    try {
        let sql = `
            DELETE FROM tbl_comentario_ocorrencia
            WHERE id_comentario_ocorrencia = ${id};
        `

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    getAllComentarioOcorrencia,
    getComentarioOcorrenciaById,
    setInsertComentarioOcorrencia,
    setUpdateComentarioOcorrencia,
    setDeleteComentarioOcorrencia
}

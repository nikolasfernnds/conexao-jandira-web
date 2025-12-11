/*****************************************************************************
 * Objetivo: Arquivo responsável pela interação com o Banco de Dados (DAO) 
 * para a entidade Comentário (Tabela base).
 * Data: 11/12/2025
 * Autores: [Seus Nomes]
 * Versão: 1.0
 ******************************************************************************/

const { messages } = require('../../../controller/comentario/comentarioOcorrenciaController.js');
const message = require('../../../controller/modulo/configMessages.js'); 
const mySql = require('../conexaoMysql.js');

const setInsertComentario = async function(dadosComentario) {
    let sql;
    try {
        sql = `insert into tbl_comentario (
                    conteudo,
                    data_comentario
                ) values (
                    '${dadosComentario.conteudo}',
                    curdate()
                )`;

        const [result] = await mySql.execute(sql);
        
        if (result.affectedRows > 0) {
            return result.insertId;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
}


const setInsertComentarioNoticia = async function(dadosComentario) {
    let sql;
    try {

        const idComentario = await setInsertComentario(dadosComentario);

        if (idComentario) {
    
            sql = `insert into tbl_comentario_noticia (
                        id_noticia,
                        id_usuario,
                        id_comentario
                    ) values (
                        ${dadosComentario.id_noticia},
                        ${dadosComentario.id_usuario},
                        ${idComentario}
                    )`;
            
            const [result] = await mySql.execute(sql);
            
            if (result.affectedRows > 0) {
                return idComentario;
            } else {
                return false;
            }
        } else {
            return false;
        }

    } catch (error) {
        return false; 
    }
}

const setInsertComentarioOcorrencia = async function(dadosComentario) {
    let sql;
    try {
    
        const idComentario = await setInsertComentario(dadosComentario);

        if (idComentario) {
            sql = `insert into tbl_comentario_ocorrencia (
                        id_ocorrencia,
                        id_usuario,
                        id_comentario
                    ) values (
                        ${dadosComentario.id_ocorrencia},
                        ${dadosComentario.id_usuario},
                        ${idComentario}
                    )`;
            
            const [result] = await mySql.execute(sql);
            
            if (result.affectedRows > 0) {
                return idComentario;
            } else {
                return false;
            }
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
}


const getSelectComentariosByNoticiaId = async function(idNoticia) {
    let sql;
    try {
      
        sql = `SELECT
                    c.id_comentario,
                    c.conteudo,
                    DATE_FORMAT(c.data_comentario, '%d/%m/%Y %H:%i:%s') AS data_comentario,
                    cn.id_usuario,
                    u.nome AS nome_usuario 
                FROM
                    tbl_comentario_noticia AS cn
                INNER JOIN tbl_comentario AS c ON cn.id_comentario = c.id_comentario
                INNER JOIN tbl_usuario AS u ON cn.id_usuario = u.id_usuario
                WHERE
                    cn.id_noticia = ${idNoticia}
                ORDER BY c.data_comentario DESC`;

        const [rsComentarios] = await mySql.execute(sql);

        if (rsComentarios.length > 0) {
            return rsComentarios;
        } else {
            return false; 
        }

    } catch (error) {
        console.log(error); 
        return false; 
    }
}

const getSelectComentariosByOcorrenciaId = async function(idOcorrencia) {
    let sql;
    try {
        sql = `SELECT
                    c.id_comentario,
                    c.conteudo,
                    DATE_FORMAT(c.data_comentario, '%d/%m/%Y %H:%i:%s') AS data_comentario,
                    co.id_usuario,
                    u.nome AS nome_usuario 
                FROM
                    tbl_comentario_ocorrencia AS co
                INNER JOIN tbl_comentario AS c ON co.id_comentario = c.id_comentario
                INNER JOIN tbl_usuario AS u ON co.id_usuario = u.id_usuario
                WHERE
                    co.id_ocorrencia = ${idOcorrencia}
                ORDER BY c.data_comentario DESC`;

        const [rsComentarios] = await mySql.execute(sql);

        if (rsComentarios.length > 0) {
            return rsComentarios;
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}


module.exports = {
    message,
    messages,
    setInsertComentarioNoticia,
    setInsertComentarioOcorrencia,
    getSelectComentariosByNoticiaId,
    getSelectComentariosByOcorrenciaId
}
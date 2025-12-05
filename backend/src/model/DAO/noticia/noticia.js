// Arquivo: src/model/DAO/noticia/noticia.js

const { PrismaClient } = require('../../../../generated/prisma');
const prisma = new PrismaClient();

// R - READ (Listar Todas)
const getSelectAllNoticias = async () => {
    try {
        const sql = `CALL sp_listar_noticias()`; 
        const rsNoticias = await prisma.$queryRawUnsafe(sql);
        
        // --- INÍCIO DEBUG ---
        console.log("-----------------------------------------");
        console.log("DEBUG: Retorno Bruto do Prisma (rsNoticias):", rsNoticias);
        console.log("DEBUG: Tipo de rsNoticias[0]:", Array.isArray(rsNoticias[0]) ? 'Array' : typeof rsNoticias[0]);
        console.log("-----------------------------------------");
        // --- FIM DEBUG ---
        
        // 🎯 CORREÇÃO: Garante que rsNoticias[0] seja retornado se for um array,
        // caso contrário, retorna um array vazio [].
        return Array.isArray(rsNoticias[0]) ? rsNoticias[0] : []; 
        
    } catch (error) {
        console.error("Erro no getSelectAllNoticias:", error);
        return false;
    }
};

// R - READ (Buscar por ID)
const getSelectByIdNoticia = async (id) => {
    try {
        const sql = `CALL sp_buscar_noticia_unica(${id})`; 
        const rsNoticia = await prisma.$queryRawUnsafe(sql);
        
        // Retorna o primeiro objeto de resultados (assume que rsNoticia[0] é o array de resultados).
        return rsNoticia[0].length ? rsNoticia[0][0] : null; 
    } catch (error) {
        console.error("Erro no getSelectByIdNoticia:", error);
        return false;
    }
};

// C - CREATE (Inserir)
const setInsertNoticia = async (dadosNoticia) => {
    try {
        const { id_autor, id_categoria_noticia, titulo, conteudo, data_publicacao, foto_capa } = dadosNoticia;

        const sql = `CALL sp_criar_noticia(
            ${id_autor}, 
            ${id_categoria_noticia}, 
            '${titulo}', 
            '${conteudo}', 
            '${data_publicacao}', 
            '${foto_capa}'
        )`;
        
        const result = await prisma.$queryRawUnsafe(sql);
        // A SP retorna o ID da notícia inserida
        return result[0].length ? result[0][0] : false; 
    } catch (error) {
        console.error("Erro no setInsertNoticia:", error);
        return false;
    }
};

// U - UPDATE (Atualizar)
const setUpdateNoticia = async (dadosNoticia) => {
    try {
        const { id, id_categoria_noticia, titulo, conteudo, foto_capa } = dadosNoticia;
        
        const sql = `
            CALL sp_atualizar_noticia(
                ${id}, 
                ${id_categoria_noticia}, 
                '${titulo}', 
                '${conteudo}', 
                '${foto_capa}'
            )
        `;
        // Usa $executeRawUnsafe (pois a SP não retorna dados, apenas status)
        const result = await prisma.$executeRawUnsafe(sql); 
        return result; 
    } catch (error) {
        console.error("Erro no setUpdateNoticia:", error);
        return false;
    }
};

// D - DELETE (Deletar)
const setDeleteNoticia = async (id) => {
    try {
        const sql = `CALL sp_deletar_noticia(${id})`; 
        // Usa $executeRawUnsafe (pois a SP não retorna dados, apenas status)
        const result = await prisma.$executeRawUnsafe(sql);
        return result; 
    } catch (error) {
        console.error("Erro no setDeleteNoticia:", error);
        return false;
    }
};

module.exports = {
    getSelectAllNoticias,
    getSelectByIdNoticia,
    setInsertNoticia,
    setUpdateNoticia,
    setDeleteNoticia
};
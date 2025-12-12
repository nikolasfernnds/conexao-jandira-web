USE gnn_jandira;


DELIMITER $$

CREATE PROCEDURE sp_criar_noticia(
    IN p_json_data JSON
)

BEGIN
    DECLARE v_id_noticia INT;

    START TRANSACTION;

    INSERT INTO tbl_noticia (
        id_autor,
        id_categoria_noticia,
        titulo,
        conteudo,
        foto_capa,
        data_publicacao
    ) VALUES (
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.id_autor')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.id_categoria_noticia')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.titulo')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.conteudo')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.foto_capa')), -- CORREÇÃO: Busca a chave certa do JSON
        NOW()
    );
    
    SET v_id_noticia = LAST_INSERT_ID();
    
    SELECT v_id_noticia AS id_noticia;

    COMMIT;
END$$

DELIMITER ;
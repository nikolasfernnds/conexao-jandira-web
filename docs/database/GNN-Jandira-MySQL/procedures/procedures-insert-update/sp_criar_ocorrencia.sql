USE gnn_jandira;

DROP PROCEDURE IF EXISTS sp_criar_ocorrencia;

DELIMITER $$

CREATE PROCEDURE sp_criar_ocorrencia(
    IN p_json_data JSON
)
BEGIN
    DECLARE v_id_endereco INT;
    DECLARE v_id_ocorrencia INT;
    DECLARE v_usuario_id INT;
    DECLARE v_foto_url VARCHAR(255);

    SET v_usuario_id = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.id_usuario')), 'null');
    SET v_foto_url = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.foto_ocorrencia')), 'null');

    START TRANSACTION;

    -- 1. Cria o Endereço
    INSERT INTO tbl_endereco_ocorrencia (
        cep, logradouro, bairro, numero, ponto_referencia
    ) VALUES (
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.cep')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.logradouro')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.bairro')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.numero')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.ponto_referencia'))
    );

    SET v_id_endereco = LAST_INSERT_ID();

    -- 2. Cria a Ocorrência
    INSERT INTO tbl_ocorrencia (
        id_usuario,
        id_status,
        id_categoria_ocorrencia,
        id_endereco_ocorrencia,
        titulo,
        descricao,
        nivel_ocorrencia
    ) VALUES (
        v_usuario_id,
        1, -- Status 1 = Pendente
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.id_categoria_ocorrencia')),
        v_id_endereco,
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.titulo')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.descricao')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.nivel_ocorrencia'))
    );

    SET v_id_ocorrencia = LAST_INSERT_ID();

    -- 3. Salva a Mídia (Se houver foto)
    IF v_foto_url IS NOT NULL AND v_foto_url != '' THEN
        INSERT INTO tbl_midia_ocorrencia (
            id_ocorrencia,
            url_arquivo,
            tipo,
            data_upload
        ) VALUES (
            v_id_ocorrencia,
            v_foto_url,
            'foto',
            NOW()
        );
    END IF;

    SELECT v_id_ocorrencia AS id_ocorrencia;

    COMMIT;
END$$

DELIMITER ;
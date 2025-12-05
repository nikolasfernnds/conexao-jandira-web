// Arquivo: src/routes/noticia/noticiaRoutes.js

const express = require('express');
const router = express.Router();
const controllerNoticia = require('../../controller/noticia/controllerNoticia.js'); 
// O caminho do controller foi assumido como correto após os testes anteriores.

// Rotas da API para Notícia. O prefixo '/v1/gnn/noticias' é definido no app.js.

// --- ROTAS PÚBLICAS (READ) ---

// R - READ: Listar todas as notícias (GET /v1/gnn/noticias)
router.get('/', async (req, res) => {
    const noticias = await controllerNoticia.listarNoticias();
    res.status(noticias.status_code).json(noticias);
});

// R - READ: Buscar notícia por ID (GET /v1/gnn/noticias/:id)
// ✅ CORRIGIDO: Usa apenas /:id, pois o prefixo já foi definido no app.js
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const noticia = await controllerNoticia.buscarNoticiaId(id);
    res.status(noticia.status_code).json(noticia);
});


// --- ROTAS PROTEGIDAS (APENAS ADMIN/GESTOR) ---

// C - CREATE: Inserir nova notícia (POST /v1/gnn/noticias)
router.post('/', async (req, res) => {
    const dados = req.body;
    const contentType = req.headers['content-type'];
    
    // Obtém o ID do autor do token (variável fictícia para simular o middleware)
    const id_autor_token = 1; 
    
    const noticia = await controllerNoticia.inserirNoticia(dados, contentType, id_autor_token);
    res.status(noticia.status_code).json(noticia);
});

// U - UPDATE: Atualizar notícia por ID (PUT /v1/gnn/noticias/:id)
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const dados = req.body;
    const contentType = req.headers['content-type'];
    
    const noticia = await controllerNoticia.atualizarNoticia(dados, id, contentType);
    res.status(noticia.status_code).json(noticia);
});

// D - DELETE: Excluir notícia por ID (DELETE /v1/gnn/noticias/:id)
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const resultado = await controllerNoticia.excluirNoticia(id);
    res.status(resultado.status_code).json(resultado);
});

module.exports = router;
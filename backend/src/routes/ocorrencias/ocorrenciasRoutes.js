/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de Ocorrências (GNN Jandira)
 * Versão: 1.1 (Com Upload)
 ******************************************************************************************************************/

const express = require('express')
const router = express.Router()
const cors = require('cors')
const multer = require('multer') // <--- IMPORTANTE

// Configura o multer para salvar na memória (RAM) temporariamente
const upload = multer({ storage: multer.memoryStorage() }) // <--- IMPORTANTE

const controllerOcorrencia = require('../../controller/ocorrencia/controllerOcorrencia.js')

router.get('/', async(req, res) => {
    let ocorrencia = await controllerOcorrencia.listarTodasOcorrencias()
    res.status(ocorrencia.status_code).json(ocorrencia)
})

router.get('/:id', async(req, res) => {
    let ocorrencia = await controllerOcorrencia.buscarOcorrenciaId(req.params.id)
    res.status(ocorrencia.status_code).json(ocorrencia)
})

router.get('/tipo/:id', async(req, res) => {
    let ocorrenciaTipo = await controllerOcorrencia.buscarOcorrenciaCategoria(req.params.id)
    res.status(ocorrenciaTipo.status_code).json(ocorrenciaTipo)
})

router.get('/usuario/:id', async(req, res) => {
    let ocorrenciaUsuario = await controllerOcorrencia.buscarOcorrenciaUsuario(req.params.id)
    res.status(ocorrenciaUsuario.status_code).json(ocorrenciaUsuario)
})

router.post('/', cors(), upload.single('foto'), async(req, res) => {
    
    let contentType = req.headers['content-type']
    
    let dadosBody = req.body
    
    let arquivo = req.file

    let novaOcorrencia = await controllerOcorrencia.criarNovaOcorrencia(dadosBody, contentType, arquivo)
    
    res.status(novaOcorrencia.status_code).json(novaOcorrencia)
})

router.patch('/:id/status', async(req, res) => {
    let ocorrencia = await controllerOcorrencia.atualizarStatusOcorrencia(req.body, req.params.id, req.headers['content-type'])
    res.status(ocorrencia.status_code).json(ocorrencia)
})

router.delete('/:id', async(req, res) => {
    let ocorrencia = await controllerOcorrencia.excluirOcorrencia(req.params.id)
    res.status(ocorrencia.status_code).json(ocorrencia)
})

module.exports = router
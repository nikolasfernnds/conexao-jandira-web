/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de Comentário-Ocorrência
 * Autor: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Data: 12/12/2025
 * Versão: 1.0
 ******************************************************************************************************************/

const express = require('express')
const router = express.Router()

const controllerComentarioOcorrencia = require('../../controller/comentario_ocorrencia/controllerComentarioOcorrencia.js')

router.get('/', async (req, res) => {
    let result = await controllerComentarioOcorrencia.listarComentarioOcorrencia()
    res.status(result.status_code).json(result)
})

router.get('/:id', async (req, res) => {
    let result = await controllerComentarioOcorrencia.buscarComentarioOcorrenciaId(req.params.id)
    res.status(result.status_code).json(result)
})

router.post('/', async (req, res) => {
    let result = await controllerComentarioOcorrencia.inserirComentarioOcorrencia(req.body, req.headers['content-type'])
    res.status(result.status_code).json(result)
})

router.put('/:id', async (req, res) => {
    let result = await controllerComentarioOcorrencia.atualizarComentarioOcorrencia(req.body, req.params.id, req.headers['content-type'])
    res.status(result.status_code).json(result)
})

router.delete('/:id', async (req, res) => {
    let result = await controllerComentarioOcorrencia.excluirComentarioOcorrencia(req.params.id)
    res.status(result.status_code).json(result)
})

module.exports = router

/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de Usuários
 * Versão: 1.1 (Com Upload de Foto)
 ******************************************************************************************************************/

const express = require('express')
const router = express.Router()
const cors = require('cors')
const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })

const controllerUsuario = require('../../controller/usuario/controllerUsuario.js')

router.post('/login', cors(), async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let result = await controllerUsuario.autenticarUsuario(contentType, dadosBody)
    response.status(result.status_code).json(result)
})

router.get('/', cors(), async function (request, response) {
    let usuarios = await controllerUsuario.listarUsuarios()
    response.status(usuarios.status_code).json(usuarios)
})

router.get('/perfil/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id
    let usuario = await controllerUsuario.buscarUsuario(idUsuario)
    response.status(usuario.status_code).json(usuario)
})

router.post('/cadastro', cors(), async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let novoUsuario = await controllerUsuario.cadastrarUsuario(contentType, dadosBody)
    response.status(novoUsuario.status_code).json(novoUsuario)
})

router.put('/:id', cors(), upload.single('foto_perfil'), async function (request, response) {
    let idUsuario = request.params.id
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body
    let arquivo = request.file

    let usuarioAtualizado = await controllerUsuario.atualizarUsuario(idUsuario, contentType, dadosBody, arquivo)
    response.status(usuarioAtualizado.status_code).json(usuarioAtualizado)
})


router.delete('/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id
    let usuarioExcluido = await controllerUsuario.excluirUsuario(idUsuario)
    response.status(usuarioExcluido.status_code).json(usuarioExcluido)
})

module.exports = router
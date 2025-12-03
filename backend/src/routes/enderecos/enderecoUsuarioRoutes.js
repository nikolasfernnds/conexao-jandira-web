/************************************************************************
 *  Objetivo: Arquivo responsável pelas rotas de endereços dos usuários
 *  Data: 03/12/2025
 *  Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
 ************************************************************************/

const express = require('express')
const router = express.Router()
const controllerEnderecoUsuario = require('../../controller/enderecos/controllerEnderecoUsuario.js')

router.get('/', async (req, res) => {
    let enderecoUsuario = await controllerEnderecoUsuario.listarEnderecos()
    res.status(enderecoUsuario.status_code).json(enderecoUsuario)
})

module.exports = router
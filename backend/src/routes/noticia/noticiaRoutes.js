/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de Notícias (GNN Jandira)
 * Versão: 1.1 (Com Upload)
 ******************************************************************************************************************/

const express = require('express')
const router = express.Router()
const cors = require('cors')
const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })

const controllerNoticia = require('../../controller/noticia/controllerNoticia.js')

router.use(cors())

router.get('/categoria/:id', async(req, res) => {
    let noticiasCategoria = await controllerNoticia.buscarNoticiaCategoria(req.params.id)
    res.status(noticiasCategoria.status_code).json(noticiasCategoria)
})

router.get('/autor/:id', async(req, res) => {
    let noticiasAutor = await controllerNoticia.buscarNoticiaAutor(req.params.id)
    res.status(noticiasAutor.status_code).json(noticiasAutor)
})

router.post('/', upload.single('foto_capa'), async(req, res) => {
    let contentType = req.headers['content-type']
    let dadosBody = req.body
    let arquivo = req.file 

    let novaNoticia = await controllerNoticia.criarNovaNoticia(dadosBody, contentType, arquivo)
    res.status(novaNoticia.status_code).json(novaNoticia)
})

router.get('/', async(req, res) => {
    let noticias = await controllerNoticia.listarTodasNoticias() 
    res.status(noticias.status_code).json(noticias)
})

router.get('/:id', async(req, res) => {
    let noticia = await controllerNoticia.buscarNoticiaId(req.params.id)
    res.status(noticia.status_code).json(noticia)
})

router.put('/:id', upload.single('foto_capa'), async (req, res) => {
    let dados = req.body
    let id = req.params.id
    let contentType = req.headers['content-type']
    let arquivo = req.file

    let noticiaAtualizada = await controllerNoticia.atualizarNoticia(dados, id, contentType, arquivo)
    res.status(noticiaAtualizada.status_code).json(noticiaAtualizada)
})

router.delete('/:id', async(req, res) => {
    let noticia = await controllerNoticia.excluirNoticia(req.params.id)
    res.status(noticia.status_code).json(noticia)
})

module.exports = router
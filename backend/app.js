/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API do GNN Jandira
 * Autor: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Data: 03/12/2025
 * Versão: 1.0
 ******************************************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8080

const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    // Define os verbos HTTP permitidos
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    
    response.header('Access-Control-Allow-Headers', 'Content-Type') // Adicione isso

    // Carrega as configurações no CORS da API
    app.use(cors())
    
    next() 
})

app.use(bodyParser.json())

const usuarioRoutes = require('./src/routes/usuario/usuarioRoutes.js')
const enderecoUsuarioRoutes = require('./src/routes/enderecos/enderecoUsuarioRoutes.js')
const ocorrenciaRoutes = require('./src/routes/ocorrencias/ocorrenciasRoutes.js')
const noticiaRoutes = require('./src/routes/noticia/noticiaRoutes.js')
<<<<<<< HEAD
const routesNoticiaComentarios = require('./src/routes/comentario/routesNoticiaComentarios.js')
const routesOcorrenciaComentarios = require('./src/routes/comentario/routesOcorrenciaComentarios.js')
=======
const comentarioMultiRoutes = require('./src/routes/comentario/comentarioMultiRoutes.js');
const notificacaoRoutes = require('./src/routes/notificacao/notificacaoRoutes.js')
const notificacaoUsuarioRoutes = require('./src/routes/notificacao_usuario/notificacaoUsuarioRoutes.js')
>>>>>>> 6afee2124cb5a0c0fe9780a8d9f6acb6928b6de1

app.use('/v1/gnn/usuarios', usuarioRoutes)
app.use('/v1/gnn/endereco/usuario', enderecoUsuarioRoutes)
app.use('/v1/gnn/ocorrencia', ocorrenciaRoutes)
app.use('/v1/gnn/noticia', noticiaRoutes)
<<<<<<< HEAD
app.use('/v1/gnn/noticia', routesNoticiaComentarios)
app.use('/v1/gnn/ocorrencia', routesOcorrenciaComentarios)
=======
app.use('/v1/gnn/comentario', comentarioMultiRoutes)
app.use('/v1/gnn/notificacao', notificacaoRoutes)
app.use('/v1/gnn/notificacao-usuario', notificacaoUsuarioRoutes)
>>>>>>> 6afee2124cb5a0c0fe9780a8d9f6acb6928b6de1

app.listen(PORT, function () {
    console.log('API GNN Jandira aguardando requisições na porta ' + PORT)
})

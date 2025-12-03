/********************************************************************************
 *  Objetivo: Arquivo responsável pela manipulação de dados entre App e a Model
 *  Data: 03/12/2025
 *  Autores: Nicolas dos Santos,, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
 ********************************************************************************/

const enderecoUsuarioDAO = require('../../model/DAO/enderecos/enderecoUsuario.js')
const defaultMessages = require('../../controller/modulo/configMessages.js')

const listarEnderecos = async function() {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        let resultAddressUsers = await enderecoUsuarioDAO.getSelectAllAddressUsers()

        if(resultAddressUsers){
            if(resultAddressUsers.length > 0){
                defaultMessages.defaultHeader.status = defaultMessages.successRequest.status
                defaultMessages.defaultHeader.status_code = defaultMessages.successRequest.status_code
                defaultMessages.defaultHeader.itens.enderecoUsuario = resultAddressUsers

                return defaultMessages.defaultHeader
            } else {
                return MESSAGES.errorNotFound
            }
        } else {
            return MESSAGES.errorInternalServerModel
        }
    } catch (error) {
        return MESSAGES.errorInternalServerController
    }
}

const listarEnderecosPorId = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if(!isNaN(id) && id != "" && id != null && id > 0)
    } catch (error) {
        
    }
}

module.exports = {
    listarEnderecos
}
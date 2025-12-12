/***************************************************************************************
* Objetivo: Configuração do Cloudinary para Upload de Imagens
* Data: 12/12/2025
***************************************************************************************/

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dmxyhuntk',
    api_key: '583535272414649',
    api_secret: 'dVc7dCx5xlafZeCj9bBDQ0NAUPM'
})

const uploadImage = async (arquivo) => {
    if (!arquivo) return null

    return new Promise((resolve, reject) => {
        // Cria o fluxo de upload para o Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'gnn-jandira', // Nome da pasta que será criada no seu Cloudinary
                resource_type: 'image'
            },
            (error, result) => {
                if (error) {
                    console.error('Erro no upload Cloudinary:', error)
                    reject(error)
                } else {
                    // Retorna o link seguro (https) da imagem
                    resolve(result.secure_url)
                }
            }
        )

        // Envia o arquivo que está na memória RAM para a nuvem
        uploadStream.end(arquivo.buffer)
    })
}

module.exports = { uploadImage }
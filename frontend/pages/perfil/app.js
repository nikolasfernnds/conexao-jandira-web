'use strict'

import { listarUsuario } from '../../assets/js/usuarios.js'
import { atualizarUsuario } from '../../assets/js/usuarios.js'
import { buscarEndereco } from '../../assets/js/viacep.js'

const inputFoto = document.getElementById('input-foto')
const imgPreview = document.getElementById('img-preview')
const containerFoto = document.getElementById('container-foto-perfil')

const inputs = document.querySelectorAll('.informacao-usuario input')
const btnEditar = document.getElementById('btn-editar')
const btnCancelar = document.getElementById('btn-cancelar')
const btnSalvar = document.getElementById('btn-salvar')
const containerEditar = document.getElementById('btn-editar-container')
const containerAcoes = document.getElementById('btns-salvar-cancelar')

const inputCep = document.getElementById('input-cep')
const inputLogradouro = document.getElementById('input-endereco')
const inputNumero = document.getElementById('input-numero')
const inputBairro = document.getElementById('input-bairro')
const inputCidade = document.getElementById('input-cidade')
const inputUf = document.getElementById('input-uf')

let valoresOriginais = {}
let fotoOriginalSrc = ''

function toggleEdicao(ativo) {
    inputs.forEach(input => {
        input.disabled = !ativo
    })

    if (inputFoto) inputFoto.disabled = !ativo

    if (ativo) {
        containerEditar.classList.add('hidden')
        containerAcoes.classList.remove('hidden')

        if (containerFoto) containerFoto.classList.add('editavel')
        if (imgPreview) fotoOriginalSrc = imgPreview.src

        inputs.forEach(input => {
            valoresOriginais[input.id] = input.value
        })
    } else {
        containerEditar.classList.remove('hidden')
        containerAcoes.classList.add('hidden')

        if (containerFoto) containerFoto.classList.remove('editavel')
    }
}

if (inputFoto) {
    inputFoto.addEventListener('change', (e) => {
        const arquivo = e.target.files[0]

        if (arquivo) {
            const leitor = new FileReader()

            leitor.onload = (eventoLoad) => {
                imgPreview.src = eventoLoad.target.result
            }

            leitor.readAsDataURL(arquivo)
        }
    })
}

if (btnEditar) {
    btnEditar.addEventListener('click', () => toggleEdicao(true))
}

if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
        inputs.forEach(input => {
            if (valoresOriginais[input.id] !== undefined) {
                input.value = valoresOriginais[input.id]
            }
        })

        if (imgPreview && fotoOriginalSrc) {
            imgPreview.src = fotoOriginalSrc
        }
        
        if (inputFoto) inputFoto.value = ''

        toggleEdicao(false)
    })
}

if (btnSalvar) {
    btnSalvar.addEventListener('click', () => {
        toggleEdicao(false)
    })
}

if (inputCep) {
    inputCep.addEventListener('input', (e) => {
        let valor = e.target.value
        valor = valor.replace(/\D/g, '')

        if (valor.length > 8) {
            valor = valor.slice(0, 8)
        }

        if (valor.length > 5) {
            valor = valor.replace(/^(\d{5})(\d)/, '$1-$2')
        }

        e.target.value = valor
    })

    inputCep.addEventListener('focusout', async () => {
        const cepValor = inputCep.value.replace(/\D/g, '')

        if (cepValor) {
            try {
                const endereco = await buscarEndereco(cepValor)

                if (inputLogradouro) inputLogradouro.value = endereco.logradouro
                if (inputBairro) inputBairro.value = endereco.bairro
                if (inputCidade) inputCidade.value = endereco.localidade
                if (inputUf) inputUf.value = endereco.uf

                if (inputNumero) inputNumero.focus()

            } catch (erro) {
                alert('CEP não encontrado ou inválido.')
                
                if (inputLogradouro) inputLogradouro.value = ''
                if (inputBairro) inputBairro.value = ''
                if (inputCidade) inputCidade.value = ''
                if (inputUf) inputUf.value = ''
            }
        }
    })
}

if (btnSalvar) {
    btnSalvar.addEventListener('click', async () => {
        
        const jsonUser = localStorage.getItem('user')
        if (!jsonUser) return
        const usuarioLogado = JSON.parse(jsonUser)
        const id = usuarioLogado.id_usuario 

        const formData = new FormData()

        formData.append('nome_completo', document.getElementById('input-nome').value)
        formData.append('nickname', usuarioLogado.nickname)
        formData.append('email', document.getElementById('input-email').value)
        formData.append('data_nascimento', document.getElementById('input-nasc').value)
        


        formData.append('cep', document.getElementById('input-cep').value)
        formData.append('logradouro', document.getElementById('input-endereco').value)
        formData.append('numero', document.getElementById('input-numero').value)
        formData.append('bairro', document.getElementById('input-bairro').value)
        formData.append('cidade', document.getElementById('input-cidade').value)
        formData.append('uf', document.getElementById('input-uf').value || "SP")

        const inputFoto = document.getElementById('input-foto')
        if (inputFoto && inputFoto.files.length > 0) {
            formData.append('foto_perfil', inputFoto.files[0])
        }

        try {
            const btnTexto = btnSalvar.textContent
            btnSalvar.textContent = "Salvando..."
            btnSalvar.disabled = true

            const resultado = await atualizarUsuario(id, formData)

            if (resultado.status) {
                alert('Perfil atualizado com sucesso!')
                
                const novoUsuario = resultado.itens
                
                const usuarioAtualizado = { ...usuarioLogado, ...novoUsuario }
                
                if (novoUsuario.foto_perfil) {
                    usuarioAtualizado.foto_perfil = novoUsuario.foto_perfil
                }

                localStorage.setItem('user', JSON.stringify(usuarioAtualizado))

                window.location.reload()
            } else {
                alert('Erro ao atualizar: ' + (resultado.message || 'Erro desconhecido'))
            }
        } catch (error) {
            console.error(error)
            alert('Erro de comunicação com o servidor.')
        } finally {
            btnSalvar.textContent = "Salvar Alterações"
            btnSalvar.disabled = false
            toggleEdicao(false)
        }
    })
}

async function carregarDadosPerfil() {
    const jsonUser = localStorage.getItem('user')
    
    if (!jsonUser) {
        window.location.href = '../login/index.html'
        return
    }

    const usuarioLogado = JSON.parse(jsonUser)
    const id = usuarioLogado.id_usuario

    const imgPreview = document.getElementById('img-preview')
    if (imgPreview && usuarioLogado.foto_perfil) {
        imgPreview.src = usuarioLogado.foto_perfil
    }

    const resultado = await listarUsuario(id)

    if (resultado.status) {
        const dados = resultado.itens

        if(document.getElementById('input-nome')) 
            document.getElementById('input-nome').value = dados.nome_completo || ''
        
        if(document.getElementById('input-email')) 
            document.getElementById('input-email').value = dados.email || ''

        if (dados.data_nascimento && document.getElementById('input-nasc')) {
            document.getElementById('input-nasc').value = dados.data_nascimento.split('T')[0]
        }

        if (dados.foto_perfil && document.getElementById('img-preview')) {
            document.getElementById('img-preview').src = dados.foto_perfil
        }
        if (dados.telefone && document.getElementById('input-telefone')){
            document.getElementById('input-telefone').value = dados.telefone || ''
        }

        if(document.getElementById('input-cep')) document.getElementById('input-cep').value = dados.cep || ''
        if(document.getElementById('input-endereco')) document.getElementById('input-endereco').value = dados.logradouro || ''
        if(document.getElementById('input-numero')) document.getElementById('input-numero').value = dados.numero || ''
        if(document.getElementById('input-bairro')) document.getElementById('input-bairro').value = dados.bairro || ''
        if(document.getElementById('input-cidade')) document.getElementById('input-cidade').value = dados.cidade || ''
        if(document.getElementById('input-uf')) document.getElementById('input-uf').value = dados.uf || 'SP'

        if (dados.foto_perfil && imgPreview) {
            imgPreview.src = dados.foto_perfil
            
            usuarioLogado.foto_perfil = dados.foto_perfil
            localStorage.setItem('user', JSON.stringify(usuarioLogado))
        }

    } else {
        alert.error("Erro ao buscar dados do perfil:", resultado.message)
    }
}


carregarDadosPerfil()
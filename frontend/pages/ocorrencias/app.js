'use strict'

import { buscarEndereco } from '../../assets/js/viacep.js'

const btnFeed = document.getElementById('btn-feed')
const btnMinhas = document.getElementById('btn-minhas')
const viewFeed = document.getElementById('view-feed')
const viewMinhas = document.getElementById('view-minhas')

const modalOverlay = document.getElementById('modal-ocorrencia-overlay')
const btnNovaOcorrencia = document.getElementById('btn-nova-ocorrencia')
const btnFecharModal = document.getElementById('btn-fechar-modal')
const btnCancelar = document.getElementById('btn-cancelar')

const fileInput = document.getElementById('file-input')
const imgPreview = document.getElementById('image-preview')
const previewLabel = document.getElementById('preview-label')

const inputCep = document.getElementById('input-cep')
const inputLogradouro = document.getElementById('input-logradouro')
const inputBairro = document.getElementById('input-bairro')
const inputCidade = document.getElementById('input-cidade')
const inputUf = document.getElementById('input-uf')
const inputNumero = document.getElementById('input-numero')

function mostrarFeed() {
    btnFeed.classList.add('active')
    btnMinhas.classList.remove('active')
    viewFeed.classList.remove('hidden')
    viewMinhas.classList.add('hidden')
}

function mostrarMinhas() {
    btnMinhas.classList.add('active')
    btnFeed.classList.remove('active')
    viewMinhas.classList.remove('hidden')
    viewFeed.classList.add('hidden')
}

function abrirModal() {
    modalOverlay.classList.add('active')
    document.body.classList.add('no-scroll')
}

function fecharModal() {
    modalOverlay.classList.remove('active')
    document.body.classList.remove('no-scroll')
    limparFormulario()
}

function limparFormulario() {
    const inputs = document.querySelectorAll('.modal-form input, .modal-form select')
    inputs.forEach(input => input.value = '')
    
    imgPreview.src = ''
    imgPreview.classList.add('hidden')
    previewLabel.style.display = 'flex'
}

if (btnNovaOcorrencia) {
    btnNovaOcorrencia.addEventListener('click', abrirModal)
}

if (btnFecharModal) {
    btnFecharModal.addEventListener('click', (e) => {
        e.preventDefault()
        fecharModal()
    })
}

if (btnCancelar) {
    btnCancelar.addEventListener('click', fecharModal)
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            fecharModal()
        }
    })
}

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const arquivo = e.target.files[0]

        if (arquivo) {
            const leitor = new FileReader()

            leitor.onload = (eventoLoad) => {
                imgPreview.src = eventoLoad.target.result
                imgPreview.classList.remove('hidden')
                previewLabel.style.display = 'none'
            }

            leitor.readAsDataURL(arquivo)
        }
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

        if (cepValor.length === 8) {
            try {
                const endereco = await buscarEndereco(cepValor)

                if (inputLogradouro) inputLogradouro.value = endereco.logradouro
                if (inputBairro) inputBairro.value = endereco.bairro
                if (inputCidade) inputCidade.value = endereco.localidade
                if (inputUf) inputUf.value = endereco.uf

                if (inputNumero) inputNumero.focus()

            } catch (erro) {
                console.error(erro)
                alert('CEP não encontrado ou inválido.')
                
                if (inputLogradouro) inputLogradouro.value = ''
                if (inputBairro) inputBairro.value = ''
                if (inputCidade) inputCidade.value = ''
                if (inputUf) inputUf.value = ''
            }
        }
    })
}

btnFeed.addEventListener('click', mostrarFeed)
btnMinhas.addEventListener('click', mostrarMinhas)
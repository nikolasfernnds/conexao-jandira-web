'use strict'

function criarModalCadastro() {
    const main = document.getElementById('main')

    const modalCadastroOverlay = document.createElement('div')
    modalCadastroOverlay.classList.add('modal-cadastro-overlay')
    modalCadastroOverlay.id = 'modalCadastroOverlay'

    const modalCadastro = document.createElement('div')
    modalCadastro.classList.add('modal-cadastro')
    
    const titulo = document.createElement('h2')
    titulo.textContent = 'Criar Conta'
    titulo.style.color = 'var(--text-white)'
    modalCadastro.appendChild(titulo)

    modalCadastroOverlay.appendChild(modalCadastro)
    main.appendChild(modalCadastroOverlay)
    
    return modalCadastro
}

function criarAreaCadastro(modal) {
    const containerInput = document.createElement('div')
    containerInput.classList.add('container-input')

    const inputs = [
        { placeholder: "Nome completo" },
        { placeholder: "Nome de usuário" },
        { placeholder: "Email" },
        { placeholder: "Data de nascimento", type: 'date'}, 
        { placeholder: "Senha", type: "password" },
        { placeholder: "Confirme a senha", type: "password" }
    ]

    inputs.forEach(dados => {
        const input = document.createElement('input')
        input.classList.add('input-cadastro')
        input.placeholder = dados.placeholder
        if (dados.type) input.type = dados.type
        containerInput.appendChild(input)
    })

    const containerBotoes = document.createElement('div')
    containerBotoes.classList.add('container-botao')

    const btnCancelar = document.createElement('button')
    btnCancelar.classList.add('btn-cancelar')
    btnCancelar.textContent = 'Cancelar'
    btnCancelar.id = 'btn-cancelar'

    btnCancelar.addEventListener('click', () => {
        const overlay = document.getElementById('modalCadastroOverlay')
        if (overlay) {
            overlay.remove() 
        }
    })

    const btnConfirmar = document.createElement('button')
    btnConfirmar.classList.add('btn-cadastre')
    btnConfirmar.textContent = 'Cadastrar-se' 
    btnConfirmar.id = 'btn-confirmar'

    containerBotoes.appendChild(btnCancelar)
    containerBotoes.appendChild(btnConfirmar)
    
    modal.appendChild(containerInput)
    modal.appendChild(containerBotoes)
}

const btnCadastro = document.getElementById('cadastrar')

btnCadastro.addEventListener('click', (e) => {
    e.preventDefault() 
    const modal = criarModalCadastro()
    criarAreaCadastro(modal)
})


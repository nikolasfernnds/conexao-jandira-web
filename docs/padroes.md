# 📏 Manual de Padronização e Workflow - GNN Jandira

Este documento estabelece as diretrizes oficiais de versionamento, codificação e fluxo de trabalho para o projeto **GNN Jandira**. O objetivo é garantir a consistência do código, facilitar a revisão e manter um histórico limpo.

---

## 1. Padrão de Ramificação (Branching Strategy)

Utilizamos um fluxo simplificado baseado no **Git Flow**. A branch `main` é protegida e contém apenas código estável e aprovado.

### Regra de Ouro
🚫 **Nunca** realize commits diretamente na branch `main`.
✅ Sempre crie uma nova branch para cada tarefa.

### Nomenclatura de Branches
O nome da branch deve descrever claramente seu propósito, utilizando o formato:
`tipo/contexto-breve`

| Prefixo | Finalidade | Exemplo |
| :--- | :--- | :--- |
| **`feat/`** | Desenvolvimento de uma nova funcionalidade ou tela. | `feat/tela-login`, `feat/integracao-mapa` |
| **`fix/`** | Correção de erros (bugs) ou falhas de layout. | `fix/botao-quebrado`, `fix/erro-api-cep` |
| **`style/`** | Ajustes puramente visuais (CSS, formatação) que não alteram lógica. | `style/ajuste-cores`, `style/responsividade-home` |
| **`docs/`** | Criação ou atualização de documentação. | `docs/atualiza-readme`, `docs/diagrama-banco` |
| **`chore/`** | Configurações, manutenção de dependências e tarefas técnicas. | `chore/setup-inicial`, `chore/organizacao-pastas` |
| **`db/`** | Alterações estruturais no Banco de Dados (Schema). | `db/create-table-usuarios` |
| **`refactor/`** | Reescrita de código para melhoria de performance/leitura sem mudar o comportamento. | `refactor/logica-validacao` |

---

## 2. Padrão de Commits (Conventional Commits)

Adotamos o padrão **Conventional Commits** para manter um histórico legível e automatizável.

### Estrutura da Mensagem
```text
<tipo>(<escopo>): <descrição breve no imperativo>

[corpo opcional: detalhes técnicos ou lista de mudanças]
````

### Tipos Permitidos (`<tipo>`)

  * `feat`: Nova feature para o usuário.
  * `fix`: Correção de bug.
  * `docs`: Mudanças na documentação.
  * `style`: Formatação, ponto e vírgula, CSS (sem impacto na lógica).
  * `refactor`: Refatoração de código de produção.
  * `test`: Adição ou correção de testes.
  * `chore`: Atualização de tarefas de build, configs, etc.

### Exemplos Práticos

**✅ Correto:**

  * `feat(auth): implementa validação de senha no login`
  * `fix(css): corrige alinhamento do header no mobile`
  * `docs(readme): adiciona instruções de instalação`

**❌ Incorreto:**

  * `fiz o login`
  * `ajustes finais`
  * `corrigindo bug` (Evite gerúndio, use imperativo: "corrige")

-----

## 3\. Fluxo de Trabalho (Workflow)

Para garantir que o trabalho de um desenvolvedor não sobrescreva o de outro, siga este ciclo para **toda** tarefa:

### Passo 1: Preparação

Antes de começar, garanta que seu ambiente está atualizado com a versão mais recente do projeto.

```bash
git checkout main
git pull origin main
```

### Passo 2: Desenvolvimento

Crie sua branch e trabalhe nela.

```bash
git checkout -b feat/nome-da-tarefa
# ...codificando...
git add .
git commit -m "feat(escopo): descrição do que fiz"
```

### Passo 3: Envio e Revisão

Envie sua branch para o repositório remoto.

```bash
git push -u origin feat/nome-da-tarefa
```

1.  Acesse o GitHub.
2.  Abra um **Pull Request (PR)** da sua branch para a `main`.
3.  Descreva o que foi feito.
4.  Solicite a revisão de um colega (se possível) ou revise você mesmo.
5.  Realize o **Merge**.

### Passo 4: Limpeza

Após o merge aprovado:

1.  Delete a branch remota (no GitHub).
2.  Atualize seu local e delete a branch antiga do seu computador.

<!-- end list -->

```bash
git checkout main
git pull origin main
git branch -d feat/nome-da-tarefa
```

-----

## 4\. Padrões de Código (Front-end)

  * **CSS:** Utilize a abordagem **Mobile-First**. Estilos base para telas pequenas, `@media (min-width: ...)` para telas maiores.
  * **Variáveis:** Utilize sempre as variáveis CSS definidas em `global.css` para cores e fontes. Evite *hardcode* (ex: `#FFC107`).
  * **Imagens:** Nomes de arquivos em `kebab-case` (ex: `minha-imagem.png`), sem espaços ou acentos.



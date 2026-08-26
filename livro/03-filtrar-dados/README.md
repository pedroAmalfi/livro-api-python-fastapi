# Capítulo 3 — Filtrando os Dados e Melhorando a Interface

> **Projeto:** Sistema de Gestão Escolar com FastAPI, MySQL, HTML, JavaScript e Bootstrap  
> **Objetivo:** evoluir o projeto criado nos capítulos anteriores, permitindo consultar registros com filtros e deixando as páginas mais organizadas e agradáveis de utilizar.

---

## 1. Objetivo deste capítulo

No capítulo anterior, o projeto já era capaz de:

- cadastrar alunos;
- cadastrar professores;
- cadastrar funcionários;
- consultar os registros;
- utilizar FastAPI para disponibilizar a API;
- utilizar JavaScript para consumir a API;
- armazenar os dados no MySQL;
- separar as páginas de cadastro e consulta.

Neste capítulo vamos dar um passo importante na evolução do sistema.

Imagine uma escola real com:

- 500 alunos;
- 80 professores;
- 40 funcionários.

Se a página simplesmente apresentar todos os registros em uma tabela, localizar uma pessoa específica ficará cada vez mais difícil.

Por isso, vamos implementar um **filtro de dados**.

O usuário poderá escolher uma coluna e informar o valor que deseja pesquisar.

Por exemplo:

```text
Filtrar por: Cidade

Pesquisar: mococa
```

O sistema apresentará somente os alunos cuja cidade contenha `mococa`.

Além do filtro, vamos melhorar a aparência das páginas utilizando:

- Bootstrap 5;
- um arquivo CSS próprio;
- cards;
- botões;
- tabelas responsivas;
- campos de formulário estilizados;
- barra de navegação;
- layout responsivo;
- uma página inicial em formato de dashboard.

---

# 2. Como o projeto ficará

Ao final deste capítulo, a estrutura do frontend deverá ser semelhante a:

```text
cadastro-alunos/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   └── schemas.py
│
├── frontend/
│   ├── index.html
│   ├── alunos.html
│   ├── professores.html
│   ├── funcionarios.html
│   ├── cadastrodealuno.html
│   ├── cadastrodeprofessor.html
│   ├── cadastrodefuncionario.html
│   │
│   ├── css/
│   │   └── estilo.css
│   │
│   └── js/
│       ├── app.js
│       ├── aluno.js
│       ├── professor.js
│       └── funcionario.js
│
├── fatec.sql
├── .env
├── .gitignore
└── venv/
```

### Atenção

Neste capítulo vamos trabalhar principalmente com:

```text
frontend/
```

Não será necessário alterar a conexão com o MySQL para criar o primeiro filtro.

O filtro será realizado no **JavaScript**, utilizando os dados que a API já retornou.

---

# 3. Entendendo o problema

Atualmente, quando a página `alunos.html` é aberta, o JavaScript executa:

```javascript
const resposta = await fetch("/alunos");
```

A API consulta o banco:

```sql
SELECT * FROM alunos
```

e devolve os registros.

O fluxo é:

```text
alunos.html
     ↓
aluno.js
     ↓
GET /alunos
     ↓
FastAPI
     ↓
MySQL
     ↓
lista de alunos
     ↓
JavaScript
     ↓
tabela HTML
```

Isso funciona muito bem para apresentar os registros.

Porém, quando temos muitos registros, precisamos de uma maneira de localizar rapidamente determinado aluno.

É aí que entra o filtro.

---

# 4. Como será o filtro

Vamos criar três elementos:

```html
<select id="campoFiltro">
```

para escolher o campo;

```html
<input id="textoFiltro">
```

para informar o que deseja pesquisar;

e:

```html
<button id="btnLimparFiltro">
```

para remover o filtro.

Visualmente teremos algo parecido com:

```text
┌─────────────────────────────────────────────────────────────┐
│ 🔎 Filtrar alunos                                           │
│                                                             │
│ Filtrar por       Pesquisar                                │
│ [ Cidade ▼ ]      [ mococa................ ] [ Limpar ]    │
└─────────────────────────────────────────────────────────────┘
```

---

# 5. Alterando `alunos.html`

Abra:

```text
frontend/alunos.html
```

A página deverá possuir o Bootstrap e o nosso arquivo CSS.

## 5.1 Adicionando o Bootstrap

Dentro do `<head>`, adicione:

```html
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
>
```

O Bootstrap é uma biblioteca que fornece classes CSS prontas para criação de interfaces.

Por exemplo:

```html
class="btn btn-primary"
```

transforma um link ou botão em um botão visualmente estilizado.

Outro exemplo:

```html
class="table table-hover table-striped"
```

aplica estilos prontos a uma tabela.

---

# 6. Adicionando o nosso CSS

Logo depois do Bootstrap, adicione:

```html
<link
    rel="stylesheet"
    href="/frontend/css/estilo.css"
>
```

A ordem é importante:

```html
Bootstrap
    ↓
estilo.css
```

O Bootstrap fornece a estrutura visual geral.

O `estilo.css` permite personalizar o projeto.

---

# 7. Criando a área de filtro

Dentro do `<body>`, antes da tabela, crie:

```html
<div class="card shadow-sm border-0 mb-4">

    <div class="card-body">

        <h5 class="card-title fw-bold mb-3">
            🔎 Filtrar alunos
        </h5>

        <div class="row g-3 align-items-end">

            <div class="col-md-3">

                <label
                    for="campoFiltro"
                    class="form-label"
                >
                    Filtrar por
                </label>

                <select
                    id="campoFiltro"
                    class="form-select"
                >

                    <option value="codAluno">
                        Código
                    </option>

                    <option value="nome">
                        Nome
                    </option>

                    <option value="cpf">
                        CPF
                    </option>

                    <option value="email">
                        E-mail
                    </option>

                    <option value="data_nascimento">
                        Data de nascimento
                    </option>

                    <option value="telefone">
                        Telefone
                    </option>

                    <option value="cidade">
                        Cidade
                    </option>

                </select>

            </div>

            <div class="col-md-7">

                <label
                    for="textoFiltro"
                    class="form-label"
                >
                    Pesquisar
                </label>

                <input
                    type="text"
                    id="textoFiltro"
                    class="form-control"
                    placeholder="Digite o que deseja pesquisar..."
                >

            </div>

            <div class="col-md-2">

                <button
                    type="button"
                    id="btnLimparFiltro"
                    class="btn btn-secondary w-100"
                >
                    Limpar
                </button>

            </div>

        </div>

    </div>

</div>
```

---

# 8. Entendendo o `<select>`

O elemento:

```html
<select id="campoFiltro">
```

cria uma lista de opções.

Por exemplo:

```html
<option value="nome">
    Nome
</option>
```

O usuário vê:

```text
Nome
```

mas o JavaScript recebe:

```text
nome
```

Isso é importante porque `nome` é exatamente o nome da propriedade que vem no JSON da API.

O mesmo acontece com:

```html
<option value="cidade">
    Cidade
</option>
```

Quando o usuário escolher Cidade, o JavaScript receberá:

```javascript
campo = "cidade";
```

---

# 9. Entendendo o campo de pesquisa

O campo:

```html
<input
    type="text"
    id="textoFiltro"
>
```

será utilizado para receber o texto digitado.

Por exemplo:

```text
mococa
```

O JavaScript poderá então comparar esse texto com a propriedade selecionada.

---

# 10. Mantendo a tabela

A tabela continua utilizando:

```html
<tbody id="listaAlunos">
</tbody>
```

Esse `id` é muito importante.

O JavaScript encontra esse elemento através de:

```javascript
document.getElementById("listaAlunos");
```

e insere as linhas dinamicamente.

A tabela completa pode utilizar Bootstrap:

```html
<table class="table table-hover table-striped align-middle">
```

As classes significam:

| Classe | Função |
|---|---|
| `table` | aplica o estilo básico de tabela |
| `table-hover` | destaca a linha quando o mouse passa sobre ela |
| `table-striped` | cria linhas alternadas |
| `align-middle` | centraliza verticalmente o conteúdo |

---

# 11. Criando o filtro no `aluno.js`

Abra:

```text
frontend/js/aluno.js
```

Primeiro precisamos ter uma variável para guardar os alunos:

```javascript
let alunos = [];
```

Quando a API responder:

```javascript
alunos = await resposta.json();
```

os dados ficam armazenados nessa variável.

Isso é importante porque agora poderemos pesquisar nessa lista sem precisar fazer uma nova requisição ao banco a cada tecla digitada.

---

# 12. Separando a função de exibição

É importante separar duas responsabilidades:

```text
carregarAlunos()
```

busca os dados da API.

Já:

```text
exibirAlunos()
```

mostra os dados na tabela.

Crie:

```javascript
function exibirAlunos(listaAlunos) {

    const tabela = document.getElementById("listaAlunos");

    if (!tabela) {
        return;
    }

    tabela.innerHTML = "";

    listaAlunos.forEach(aluno => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${aluno.codAluno}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.cpf}</td>
            <td>${aluno.email}</td>
            <td>${aluno.data_nascimento}</td>
            <td>${aluno.telefone}</td>
            <td>${aluno.ra}</td>
            <td>${aluno.cidade}</td>
        `;

        tabela.appendChild(linha);

    });
}
```

Agora podemos chamar:

```javascript
exibirAlunos(alunos);
```

para mostrar todos.

Ou:

```javascript
exibirAlunos(alunosFiltrados);
```

para mostrar somente os resultados encontrados.

---

# 13. Atualizando `carregarAlunos()`

A função de carregamento deverá fazer:

```javascript
async function carregarAlunos() {

    const tabela = document.getElementById("listaAlunos");

    if (!tabela) {
        return;
    }

    try {

        const resposta = await fetch("/alunos");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar alunos.");
        }

        alunos = await resposta.json();

        exibirAlunos(alunos);

    } catch (erro) {

        console.error("Erro ao carregar alunos:", erro);

        tabela.innerHTML = `
            <tr>
                <td colspan="8">
                    Erro ao carregar os alunos.
                </td>
            </tr>
        `;
    }
}
```

Observe que agora não precisamos repetir o código responsável pela construção da tabela.

A função:

```javascript
exibirAlunos(alunos);
```

fica responsável por isso.

---

# 14. Criando a função `filtrarAlunos()`

Agora vamos criar a parte principal do capítulo.

```javascript
function filtrarAlunos() {

    const campoElemento =
        document.getElementById("campoFiltro");

    const textoElemento =
        document.getElementById("textoFiltro");

    if (!campoElemento || !textoElemento) {
        return;
    }

    const campo = campoElemento.value;

    const texto = textoElemento.value
        .toLowerCase()
        .trim();

    const alunosFiltrados = alunos.filter(aluno => {

        const valor = aluno[campo];

        if (valor === null || valor === undefined) {
            return false;
        }

        return String(valor)
            .toLowerCase()
            .includes(texto);
    });

    exibirAlunos(alunosFiltrados);
}
```

---

# 15. Entendendo `filter()`

O método:

```javascript
filter()
```

é utilizado para criar uma nova lista contendo somente os elementos que atendem a uma determinada condição.

Imagine:

```javascript
const numeros = [10, 15, 20, 25, 30];
```

Podemos fazer:

```javascript
const maiores = numeros.filter(numero => numero > 20);
```

Resultado:

```javascript
[25, 30]
```

No nosso projeto, fazemos a mesma ideia com alunos.

```javascript
const alunosFiltrados = alunos.filter(aluno => {
    ...
});
```

Para cada aluno, o JavaScript verifica uma condição.

Se a condição for verdadeira:

```javascript
true
```

o aluno permanece na lista.

Se for falsa:

```javascript
false
```

o aluno é removido da lista filtrada.

---

# 16. Como escolhemos a coluna?

Temos:

```javascript
const campo = campoElemento.value;
```

Se o usuário escolheu:

```text
Cidade
```

o valor será:

```javascript
"cidade"
```

Então podemos utilizar:

```javascript
aluno[campo]
```

que equivale a:

```javascript
aluno["cidade"]
```

Se o aluno for:

```javascript
{
    codAluno: 1,
    nome: "João",
    cidade: "Mococa"
}
```

então:

```javascript
aluno["cidade"]
```

resultará em:

```text
Mococa
```

---

# 17. Entendendo `toLowerCase()`

Utilizamos:

```javascript
.toLowerCase()
```

para transformar o texto em letras minúsculas.

Assim:

```text
Mococa
MOCOCA
mococa
MoCoCa
```

passam a ser comparados como:

```text
mococa
```

Isso deixa a pesquisa mais amigável.

---

# 18. Entendendo `trim()`

Também utilizamos:

```javascript
.trim()
```

O `trim()` remove espaços desnecessários no início e no final do texto.

Por exemplo:

```text
"   mococa   "
```

vira:

```text
"mococa"
```

---

# 19. Entendendo `includes()`

A comparação final utiliza:

```javascript
.includes(texto)
```

Isso significa:

> O valor contém o texto pesquisado?

Por exemplo:

```javascript
"Mococa".toLowerCase().includes("moco")
```

resulta em:

```text
true
```

Isso permite pesquisas parciais.

Por exemplo:

```text
Pesquisa: moco
```

pode encontrar:

```text
Mococa
```

Da mesma forma:

```text
Pesquisa: silva
```

pode encontrar:

```text
João Silva
Maria Silva
Carlos Silva
```

---

# 20. Resultado do filtro

Imagine que a API retornou:

```javascript
[
    {
        codAluno: 1,
        nome: "João",
        cidade: "Mococa"
    },
    {
        codAluno: 2,
        nome: "Maria",
        cidade: "Itapira"
    },
    {
        codAluno: 3,
        nome: "Carlos",
        cidade: "Mococa"
    }
]
```

O usuário escolhe:

```text
Cidade
```

e digita:

```text
mococa
```

O resultado será:

```javascript
[
    {
        codAluno: 1,
        nome: "João",
        cidade: "Mococa"
    },
    {
        codAluno: 3,
        nome: "Carlos",
        cidade: "Mococa"
    }
]
```

Somente esses registros serão enviados para:

```javascript
exibirAlunos(alunosFiltrados);
```

---

# 21. Fazendo o filtro funcionar automaticamente

Queremos que o filtro aconteça enquanto o usuário digita.

Para isso:

```javascript
const textoFiltro =
    document.getElementById("textoFiltro");

if (textoFiltro) {

    textoFiltro.addEventListener(
        "input",
        filtrarAlunos
    );

}
```

O evento:

```text
input
```

é disparado quando o conteúdo do campo é alterado.

Assim, ao digitar:

```text
m
```

o filtro é executado.

Depois:

```text
mo
```

o filtro é executado novamente.

Depois:

```text
moc
```

e assim por diante.

---

# 22. Reagir à mudança do campo

Também queremos que o filtro seja atualizado quando o usuário trocar a coluna.

Para isso:

```javascript
const campoFiltro =
    document.getElementById("campoFiltro");

if (campoFiltro) {

    campoFiltro.addEventListener(
        "change",
        filtrarAlunos
    );

}
```

O evento:

```text
change
```

é executado quando o usuário muda a opção selecionada.

---

# 23. Criando o botão Limpar

Agora precisamos permitir que o usuário volte a visualizar todos os alunos.

```javascript
const btnLimparFiltro =
    document.getElementById("btnLimparFiltro");

if (btnLimparFiltro) {

    btnLimparFiltro.addEventListener(
        "click",
        function() {

            document.getElementById(
                "textoFiltro"
            ).value = "";

            exibirAlunos(alunos);

        }
    );

}
```

O botão faz duas coisas:

1. limpa o campo de pesquisa;
2. exibe novamente todos os alunos.

---

# 24. Por que usamos `if` no JavaScript?

O arquivo:

```text
aluno.js
```

é utilizado tanto em:

```text
cadastrodealuno.html
```

quanto em:

```text
alunos.html
```

Na página de cadastro não existem:

```html
<input id="textoFiltro">
<select id="campoFiltro">
<button id="btnLimparFiltro">
```

Por isso não podemos fazer diretamente:

```javascript
document
    .getElementById("textoFiltro")
    .addEventListener(...)
```

sem verificar se o elemento existe.

Caso contrário, o JavaScript poderá tentar executar:

```javascript
null.addEventListener(...)
```

e gerar um erro.

Por isso utilizamos:

```javascript
if (textoFiltro) {
    textoFiltro.addEventListener(...);
}
```

Essa é uma boa prática quando o mesmo arquivo JavaScript atende diferentes páginas.

---

# 25. Código completo da parte do filtro de `aluno.js`

A parte responsável pela listagem e filtro deverá ficar semelhante a:

```javascript
let alunos = [];

async function carregarAlunos() {

    const tabela = document.getElementById("listaAlunos");

    if (!tabela) {
        return;
    }

    try {

        const resposta = await fetch("/alunos");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar alunos.");
        }

        alunos = await resposta.json();

        exibirAlunos(alunos);

    } catch (erro) {

        console.error("Erro ao carregar alunos:", erro);

        tabela.innerHTML = `
            <tr>
                <td colspan="8">
                    Erro ao carregar os alunos.
                </td>
            </tr>
        `;
    }
}


function exibirAlunos(listaAlunos) {

    const tabela = document.getElementById("listaAlunos");

    if (!tabela) {
        return;
    }

    tabela.innerHTML = "";

    listaAlunos.forEach(aluno => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${aluno.codAluno}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.cpf}</td>
            <td>${aluno.email}</td>
            <td>${aluno.data_nascimento}</td>
            <td>${aluno.telefone}</td>
            <td>${aluno.ra}</td>
            <td>${aluno.cidade}</td>
        `;

        tabela.appendChild(linha);

    });
}


function filtrarAlunos() {

    const campoElemento =
        document.getElementById("campoFiltro");

    const textoElemento =
        document.getElementById("textoFiltro");

    if (!campoElemento || !textoElemento) {
        return;
    }

    const campo = campoElemento.value;

    const texto = textoElemento.value
        .toLowerCase()
        .trim();

    const alunosFiltrados = alunos.filter(aluno => {

        const valor = aluno[campo];

        if (valor === null || valor === undefined) {
            return false;
        }

        return String(valor)
            .toLowerCase()
            .includes(texto);

    });

    exibirAlunos(alunosFiltrados);
}


const textoFiltro =
    document.getElementById("textoFiltro");

if (textoFiltro) {

    textoFiltro.addEventListener(
        "input",
        filtrarAlunos
    );

}


const campoFiltro =
    document.getElementById("campoFiltro");

if (campoFiltro) {

    campoFiltro.addEventListener(
        "change",
        filtrarAlunos
    );

}


const btnLimparFiltro =
    document.getElementById("btnLimparFiltro");

if (btnLimparFiltro) {

    btnLimparFiltro.addEventListener(
        "click",
        function() {

            document.getElementById(
                "textoFiltro"
            ).value = "";

            exibirAlunos(alunos);

        }
    );

}


carregarAlunos();
```

A parte de cadastro e tratamento de erros já existente no `aluno.js` deverá permanecer.

---

# 26. Aplicando o mesmo filtro aos professores

O mesmo conceito pode ser utilizado na página:

```text
frontend/professores.html
```

e no arquivo:

```text
frontend/js/professor.js
```

A diferença é que os professores possuem os campos:

```text
codProf
nome
cpf
email
data_nascimento
telefone
cidade
```

## 26.1 Filtro no `professores.html`

Adicione:

```html
<div class="card shadow-sm border-0 mb-4">

    <div class="card-body">

        <h5 class="card-title fw-bold mb-3">
            🔎 Filtrar professores
        </h5>

        <div class="row g-3 align-items-end">

            <div class="col-md-3">

                <label
                    for="campoFiltro"
                    class="form-label"
                >
                    Filtrar por
                </label>

                <select
                    id="campoFiltro"
                    class="form-select"
                >

                    <option value="codProf">
                        Código
                    </option>

                    <option value="nome">
                        Nome
                    </option>

                    <option value="cpf">
                        CPF
                    </option>

                    <option value="email">
                        E-mail
                    </option>

                    <option value="data_nascimento">
                        Data de nascimento
                    </option>

                    <option value="telefone">
                        Telefone
                    </option>

                    <option value="cidade">
                        Cidade
                    </option>

                </select>

            </div>

            <div class="col-md-7">

                <label
                    for="textoFiltro"
                    class="form-label"
                >
                    Pesquisar
                </label>

                <input
                    type="text"
                    id="textoFiltro"
                    class="form-control"
                    placeholder="Digite o que deseja pesquisar..."
                >

            </div>

            <div class="col-md-2">

                <button
                    type="button"
                    id="btnLimparFiltro"
                    class="btn btn-secondary w-100"
                >
                    Limpar
                </button>

            </div>

        </div>

    </div>

</div>
```

## 26.2 Criando o filtro no `professor.js`

Use:

```javascript
let professores = [];

function exibirProfessores(listaProfessores) {

    const tabela =
        document.getElementById("listaProfessores");

    if (!tabela) {
        return;
    }

    tabela.innerHTML = "";

    listaProfessores.forEach(professor => {

        const linha =
            document.createElement("tr");

        linha.innerHTML = `
            <td>${professor.codProf}</td>
            <td>${professor.nome}</td>
            <td>${professor.cpf}</td>
            <td>${professor.email}</td>
            <td>${professor.data_nascimento}</td>
            <td>${professor.telefone}</td>
            <td>${professor.cidade}</td>
        `;

        tabela.appendChild(linha);

    });
}


async function carregarProfessores() {

    const tabela =
        document.getElementById("listaProfessores");

    if (!tabela) {
        return;
    }

    try {

        const resposta =
            await fetch("/professores");

        if (!resposta.ok) {
            throw new Error(
                "Erro ao buscar professores."
            );
        }

        professores = await resposta.json();

        exibirProfessores(professores);

    } catch (erro) {

        console.error(
            "Erro ao carregar professores:",
            erro
        );

        tabela.innerHTML = `
            <tr>
                <td colspan="7">
                    Erro ao carregar os professores.
                </td>
            </tr>
        `;
    }
}


function filtrarProfessores() {

    const campoElemento =
        document.getElementById("campoFiltro");

    const textoElemento =
        document.getElementById("textoFiltro");

    if (!campoElemento || !textoElemento) {
        return;
    }

    const campo = campoElemento.value;

    const texto =
        textoElemento.value
            .toLowerCase()
            .trim();

    const professoresFiltrados =
        professores.filter(professor => {

            const valor =
                professor[campo];

            if (
                valor === null ||
                valor === undefined
            ) {
                return false;
            }

            return String(valor)
                .toLowerCase()
                .includes(texto);

        });

    exibirProfessores(professoresFiltrados);
}


const textoFiltro =
    document.getElementById("textoFiltro");

if (textoFiltro) {

    textoFiltro.addEventListener(
        "input",
        filtrarProfessores
    );

}


const campoFiltro =
    document.getElementById("campoFiltro");

if (campoFiltro) {

    campoFiltro.addEventListener(
        "change",
        filtrarProfessores
    );

}


const btnLimparFiltro =
    document.getElementById("btnLimparFiltro");

if (btnLimparFiltro) {

    btnLimparFiltro.addEventListener(
        "click",
        function() {

            document.getElementById(
                "textoFiltro"
            ).value = "";

            exibirProfessores(professores);

        }
    );

}


carregarProfessores();
```

A parte de cadastro de professor e a função `obterMensagemErro()` deverá permanecer no arquivo.

---

# 27. Aplicando o filtro aos funcionários

O mesmo procedimento será realizado em:

```text
frontend/funcionarios.html
```

e:

```text
frontend/js/funcionario.js
```

Os campos disponíveis são:

```text
codFunc
nome
cpf
email
data_nascimento
telefone
cidade
```

## 27.1 Filtro no `funcionarios.html`

Utilize:

```html
<div class="card shadow-sm border-0 mb-4">

    <div class="card-body">

        <h5 class="card-title fw-bold mb-3">
            🔎 Filtrar funcionários
        </h5>

        <div class="row g-3 align-items-end">

            <div class="col-md-3">

                <label
                    for="campoFiltro"
                    class="form-label"
                >
                    Filtrar por
                </label>

                <select
                    id="campoFiltro"
                    class="form-select"
                >

                    <option value="codFunc">
                        Código
                    </option>

                    <option value="nome">
                        Nome
                    </option>

                    <option value="cpf">
                        CPF
                    </option>

                    <option value="email">
                        E-mail
                    </option>

                    <option value="data_nascimento">
                        Data de nascimento
                    </option>

                    <option value="telefone">
                        Telefone
                    </option>

                    <option value="cidade">
                        Cidade
                    </option>

                </select>

            </div>

            <div class="col-md-7">

                <label
                    for="textoFiltro"
                    class="form-label"
                >
                    Pesquisar
                </label>

                <input
                    type="text"
                    id="textoFiltro"
                    class="form-control"
                    placeholder="Digite o que deseja pesquisar..."
                >

            </div>

            <div class="col-md-2">

                <button
                    type="button"
                    id="btnLimparFiltro"
                    class="btn btn-secondary w-100"
                >
                    Limpar
                </button>

            </div>

        </div>

    </div>

</div>
```

## 27.2 Criando o filtro no `funcionario.js`

A lógica é a mesma:

```javascript
let funcionarios = [];

function exibirFuncionarios(listaFuncionarios) {

    const tabela =
        document.getElementById("listaFuncionarios");

    if (!tabela) {
        return;
    }

    tabela.innerHTML = "";

    listaFuncionarios.forEach(funcionario => {

        const linha =
            document.createElement("tr");

        linha.innerHTML = `
            <td>${funcionario.codFunc}</td>
            <td>${funcionario.nome}</td>
            <td>${funcionario.cpf}</td>
            <td>${funcionario.email}</td>
            <td>${funcionario.data_nascimento}</td>
            <td>${funcionario.telefone}</td>
            <td>${funcionario.cidade}</td>
        `;

        tabela.appendChild(linha);

    });
}


async function carregarFuncionarios() {

    const tabela =
        document.getElementById("listaFuncionarios");

    if (!tabela) {
        return;
    }

    try {

        const resposta =
            await fetch("/funcionarios");

        if (!resposta.ok) {
            throw new Error(
                "Erro ao buscar funcionários."
            );
        }

        funcionarios =
            await resposta.json();

        exibirFuncionarios(funcionarios);

    } catch (erro) {

        console.error(
            "Erro ao carregar funcionários:",
            erro
        );

        tabela.innerHTML = `
            <tr>
                <td colspan="7">
                    Erro ao carregar os funcionários.
                </td>
            </tr>
        `;
    }
}


function filtrarFuncionarios() {

    const campoElemento =
        document.getElementById("campoFiltro");

    const textoElemento =
        document.getElementById("textoFiltro");

    if (!campoElemento || !textoElemento) {
        return;
    }

    const campo = campoElemento.value;

    const texto =
        textoElemento.value
            .toLowerCase()
            .trim();

    const funcionariosFiltrados =
        funcionarios.filter(funcionario => {

            const valor =
                funcionario[campo];

            if (
                valor === null ||
                valor === undefined
            ) {
                return false;
            }

            return String(valor)
                .toLowerCase()
                .includes(texto);

        });

    exibirFuncionarios(funcionariosFiltrados);
}


const textoFiltro =
    document.getElementById("textoFiltro");

if (textoFiltro) {

    textoFiltro.addEventListener(
        "input",
        filtrarFuncionarios
    );

}


const campoFiltro =
    document.getElementById("campoFiltro");

if (campoFiltro) {

    campoFiltro.addEventListener(
        "change",
        filtrarFuncionarios
    );

}


const btnLimparFiltro =
    document.getElementById("btnLimparFiltro");

if (btnLimparFiltro) {

    btnLimparFiltro.addEventListener(
        "click",
        function() {

            document.getElementById(
                "textoFiltro"
            ).value = "";

            exibirFuncionarios(funcionarios);

        }
    );

}


carregarFuncionarios();
```

Mais uma vez, mantenha o código já existente responsável pelo cadastro e pelas mensagens de erro.

---

# 28. Criando a pasta `css`

Agora vamos melhorar a aparência do sistema.

Dentro de:

```text
frontend/
```

crie:

```text
css/
```

E dentro dela:

```text
estilo.css
```

A estrutura será:

```text
frontend/
│
├── css/
│   └── estilo.css
│
└── js/
```

---

# 29. Por que criar um CSS separado?

Poderíamos colocar CSS diretamente dentro de cada HTML:

```html
<style>
    ...
</style>
```

Porém isso faria com que o mesmo código fosse repetido em várias páginas.

Imagine:

```text
index.html
    ↓
CSS

alunos.html
    ↓
mesmo CSS

professores.html
    ↓
mesmo CSS

funcionarios.html
    ↓
mesmo CSS
```

Seria melhor manter uma única folha de estilos:

```text
estilo.css
```

Assim:

```text
                    estilo.css
                   ↙    ↓    ↘
                  /     |     \
            alunos  professores funcionários
```

Se quisermos alterar uma característica visual, podemos fazer isso em um único arquivo.

---

# 30. Criando o `estilo.css`

Abra:

```text
frontend/css/estilo.css
```

e coloque:

```css
/* =========================================================
   ESTILO GERAL - SISTEMA DE GESTÃO ESCOLAR
   ========================================================= */

body {
    background-color: #f5f7fa;
    color: #212529;
    font-family: Arial, Helvetica, sans-serif;
}


/* =========================================================
   MENU
   ========================================================= */

.navbar {
    min-height: 64px;
}

.navbar-brand {
    font-size: 1.25rem;
    letter-spacing: 0.3px;
}


/* =========================================================
   TÍTULOS
   ========================================================= */

h1 {
    color: #212529;
}


/* =========================================================
   CARDS
   ========================================================= */

.card {
    border-radius: 12px;
}

.card-title {
    color: #212529;
}


/* =========================================================
   FORMULÁRIOS
   ========================================================= */

.form-label {
    font-weight: 600;
}

.form-control,
.form-select {
    border-radius: 8px;
}

.form-control:focus,
.form-select:focus {
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
}


/* =========================================================
   BOTÕES
   ========================================================= */

.btn {
    border-radius: 8px;
}

.btn-primary {
    font-weight: 600;
}


/* =========================================================
   TABELAS
   ========================================================= */

.table {
    margin-bottom: 0;
}

.table thead th {
    white-space: nowrap;
}

.table tbody td {
    vertical-align: middle;
}


/* =========================================================
   FILTRO
   ========================================================= */

.filtro-alunos {
    border-radius: 12px;
}


/* =========================================================
   MENSAGENS
   ========================================================= */

#mensagem {
    font-weight: 600;
}


/* =========================================================
   RESPONSIVIDADE
   ========================================================= */

@media (max-width: 768px) {

    main.container {
        padding-left: 15px;
        padding-right: 15px;
    }

    h1 {
        font-size: 1.7rem;
    }

    .navbar-brand {
        font-size: 1.1rem;
    }

}


/* =========================================================
   DASHBOARD
   ========================================================= */

.card {
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
}

.card:hover {
    transform: translateY(-4px);

    box-shadow:
        0 0.5rem 1rem
        rgba(0, 0, 0, 0.12) !important;
}
```

---

# 31. Entendendo o `body`

O trecho:

```css
body {
    background-color: #f5f7fa;
    color: #212529;
    font-family: Arial, Helvetica, sans-serif;
}
```

define características gerais da página.

### `background-color`

Define a cor do fundo.

```css
background-color: #f5f7fa;
```

Em vez de deixar o fundo completamente branco, utilizamos um tom muito claro.

### `color`

Define a cor padrão dos textos.

### `font-family`

Define a família de fontes utilizada.

---

# 32. Estilizando o menu

Temos:

```css
.navbar {
    min-height: 64px;
}
```

Isso garante uma altura mínima para a barra de navegação.

Também temos:

```css
.navbar-brand {
    font-size: 1.25rem;
    letter-spacing: 0.3px;
}
```

A classe `.navbar-brand` é utilizada pelo Bootstrap para representar a marca ou nome do sistema.

---

# 33. Estilizando os cards

O Bootstrap já possui a classe:

```text
card
```

Nosso CSS complementa:

```css
.card {
    border-radius: 12px;
}
```

Isso deixa os cantos arredondados.

Também adicionamos um efeito quando o mouse passa sobre um card:

```css
.card:hover {
    transform: translateY(-4px);
}
```

O card sobe levemente.

---

# 34. Estilizando os formulários

Temos:

```css
.form-label {
    font-weight: 600;
}
```

Isso deixa os rótulos dos campos mais destacados.

Também:

```css
.form-control,
.form-select {
    border-radius: 8px;
}
```

arredonda os campos.

---

# 35. Estilizando os botões

O Bootstrap já fornece:

```text
btn
btn-primary
btn-secondary
btn-outline-primary
```

Nosso CSS adiciona:

```css
.btn {
    border-radius: 8px;
}
```

Assim todos os botões seguem o mesmo padrão.

---

# 36. Responsividade

Utilizamos:

```css
@media (max-width: 768px) {
    ...
}
```

Isso significa que determinadas regras serão aplicadas quando a largura da tela for igual ou inferior a 768 pixels.

Essa técnica permite melhorar a visualização em:

- notebooks;
- tablets;
- celulares.

---

# 37. Melhorando `index.html`

A página inicial também foi reformulada.

Antes tínhamos vários links simples:

```html
<nav>
    <a href="/frontend/alunos.html">
        Ver todos os Alunos
    </a>
</nav>
```

Agora utilizamos Bootstrap para transformar a página em um pequeno dashboard.

A estrutura geral é:

```text
index.html
     ↓
navbar
     ↓
título
     ↓
cards
     ↓
Alunos
Professores
Funcionários
```

---

# 38. Criando os cards do dashboard

Um card de aluno utiliza:

```html
<div class="col-md-4">

    <div class="card h-100 shadow-sm border-0">

        <div class="card-body text-center p-4">

            <div class="display-4 mb-3">
                👨‍🎓
            </div>

            <h2 class="h4 fw-bold">
                Alunos
            </h2>

            <p class="text-muted">
                Consulte os alunos cadastrados
                ou realize um novo cadastro.
            </p>

            <div class="d-grid gap-2 mt-4">

                <a
                    href="/frontend/alunos.html"
                    class="btn btn-primary"
                >
                    Ver alunos
                </a>

                <a
                    href="/frontend/cadastrodealuno.html"
                    class="btn btn-outline-primary"
                >
                    Cadastrar aluno
                </a>

            </div>

        </div>

    </div>

</div>
```

O mesmo padrão é utilizado para professores e funcionários.

---

# 39. Entendendo `col-md-4`

O Bootstrap utiliza um sistema de grid.

A classe:

```text
col-md-4
```

significa que, a partir do tamanho médio de tela, o elemento ocupará 4 das 12 colunas.

Temos:

```text
12 / 3 = 4
```

Por isso conseguimos colocar três cards lado a lado:

```text
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Alunos   │ │Professor │ │Funcionário│
│ 4 colunas│ │4 colunas │ │4 colunas │
└──────────┘ └──────────┘ └──────────┘
```

Em telas menores, os cards passam a ocupar uma largura maior e ficam empilhados.

---

# 40. Alterando as páginas de cadastro

As páginas:

```text
cadastrodealuno.html
cadastrodeprofessor.html
cadastrodefuncionario.html
```

também devem utilizar Bootstrap.

No `<head>`:

```html
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
>

<link
    rel="stylesheet"
    href="/frontend/css/estilo.css"
>
```

---

# 41. Organizando o formulário com Bootstrap

Em vez de deixar todos os campos simplesmente um abaixo do outro, utilizamos:

```html
<div class="row g-3">
```

e:

```html
<div class="col-md-6">
```

Isso permite organizar os campos em duas colunas em telas maiores.

Por exemplo:

```text
┌────────────────────┐ ┌────────────────────┐
│ Nome               │ │ CPF                │
└────────────────────┘ └────────────────────┘

┌────────────────────┐ ┌────────────────────┐
│ E-mail             │ │ Data nascimento    │
└────────────────────┘ └────────────────────┘

┌────────────────────┐ ┌────────────────────┐
│ Telefone           │ │ RA                 │
└────────────────────┘ └────────────────────┘

┌─────────────────────────────────────────────┐
│ Cidade                                      │
└─────────────────────────────────────────────┘
```

---

# 42. Não altere os `id` dos campos

Este é um ponto muito importante.

O JavaScript procura os campos utilizando:

```javascript
document.getElementById("nome")
```

```javascript
document.getElementById("cpf")
```

```javascript
document.getElementById("email")
```

etc.

Portanto, ao aplicar Bootstrap, devemos adicionar classes:

```html
class="form-control"
```

mas manter:

```html
id="nome"
```

Por exemplo:

```html
<input
    type="text"
    id="nome"
    class="form-control"
    required
>
```

Não faça:

```html
<input
    type="text"
    id="nomeAluno"
>
```

sem alterar o JavaScript.

---

# 43. O mesmo vale para os formulários

Também precisamos manter:

```html
<form id="form-aluno">
```

```html
<form id="form-professor">
```

```html
<form id="form-funcionario">
```

Esses IDs são utilizados pelos respectivos arquivos JavaScript.

---

# 44. O mesmo vale para as tabelas

Na listagem de alunos:

```html
<tbody id="listaAlunos">
</tbody>
```

Professores:

```html
<tbody id="listaProfessores">
</tbody>
```

Funcionários:

```html
<tbody id="listaFuncionarios">
</tbody>
```

Não altere esses IDs sem alterar também o JavaScript.

---

# 45. Bootstrap não substitui JavaScript

É importante compreender a diferença entre as tecnologias.

O Bootstrap é utilizado principalmente para:

```text
aparência
layout
responsividade
botões
cards
tabelas
formulários
```

Já o JavaScript continua responsável por:

```text
buscar dados
enviar dados
filtrar dados
manipular a tabela
responder a eventos
```

Podemos representar:

```text
HTML
 ↓
estrutura

Bootstrap + CSS
 ↓
aparência

JavaScript
 ↓
comportamento

FastAPI
 ↓
API

MySQL
 ↓
dados
```

---

# 46. Testando o filtro

Depois de realizar as alterações, execute a aplicação:

```cmd
uvicorn backend.main:app --reload
```

Abra:

```text
http://127.0.0.1:8000/
```

Entre em:

```text
Alunos
```

Agora teste:

### Teste 1 — cidade

Selecione:

```text
Cidade
```

Digite:

```text
mococa
```

O sistema deverá mostrar somente alunos de Mococa.

### Teste 2 — nome

Selecione:

```text
Nome
```

Digite:

```text
joão
```

O sistema deverá apresentar alunos cujo nome contenha `joão`.

### Teste 3 — e-mail

Selecione:

```text
E-mail
```

Digite:

```text
gmail
```

O sistema deverá apresentar alunos cujo e-mail contenha `gmail`.

### Teste 4 — limpar

Clique:

```text
Limpar
```

Todos os alunos deverão voltar a aparecer.

---

# 47. Testando professores e funcionários

Depois de implementar o mesmo mecanismo, faça os testes em:

```text
Professores
```

e:

```text
Funcionários
```

Por exemplo:

```text
Filtrar por: Cidade
Pesquisar: mococa
```

O comportamento esperado é:

```text
API
 ↓
lista completa
 ↓
JavaScript
 ↓
filter()
 ↓
lista filtrada
 ↓
tabela
```

---

# 48. O filtro é feito no banco?

Não.

Nesta versão do projeto, o filtro é realizado no navegador.

O fluxo é:

```text
MySQL
 ↓
FastAPI
 ↓
GET /alunos
 ↓
todos os alunos
 ↓
JavaScript
 ↓
filter()
 ↓
resultado
```

Isso foi escolhido neste momento porque é uma forma simples e didática de aprender:

- arrays;
- objetos;
- `filter()`;
- funções;
- eventos;
- manipulação do DOM;
- `includes()`;
- `toLowerCase()`;
- `trim()`.

---

# 49. E se a escola tiver muitos registros?

Em uma aplicação real, carregar todos os registros pode não ser a melhor solução.

Imagine:

```text
1.000.000 alunos
```

Não seria interessante enviar um milhão de registros para o navegador apenas para encontrar alunos de uma cidade.

Uma evolução futura seria criar:

```text
GET /alunos?cidade=mococa
```

e fazer o FastAPI consultar diretamente:

```sql
SELECT *
FROM alunos
WHERE cidade LIKE '%mococa%';
```

Nesse caso:

```text
Usuário
 ↓
filtro
 ↓
FastAPI
 ↓
MySQL
 ↓
somente os registros necessários
 ↓
navegador
```

Essa será uma evolução natural do projeto.

---

# 50. Diferença entre as duas abordagens

## Filtro no JavaScript

```text
GET /alunos
      ↓
todos os registros
      ↓
JavaScript filter()
```

### Vantagens

- simples;
- ótimo para aprendizagem;
- não exige alteração na API;
- demonstra conceitos importantes de JavaScript.

### Desvantagem

Pode ficar pesado com muitos registros.

---

## Filtro no banco

```text
GET /alunos?cidade=mococa
      ↓
FastAPI
      ↓
WHERE cidade LIKE ...
      ↓
MySQL
```

### Vantagens

- mais adequado para grandes volumes;
- reduz dados transferidos;
- banco trabalha na filtragem.

### Desvantagem

Exige alterações no backend e na consulta SQL.

---

# 51. Estrutura final do frontend

Ao terminar este capítulo, o frontend deverá estar organizado aproximadamente assim:

```text
frontend/
│
├── index.html
│
├── alunos.html
├── professores.html
├── funcionarios.html
│
├── cadastrodealuno.html
├── cadastrodeprofessor.html
├── cadastrodefuncionario.html
│
├── css/
│   └── estilo.css
│
└── js/
    ├── app.js
    ├── aluno.js
    ├── professor.js
    └── funcionario.js
```

---

# 52. Checklist da atividade

Antes de considerar o capítulo concluído, confira:

- [ ] Criou `frontend/css/`.
- [ ] Criou `frontend/css/estilo.css`.
- [ ] Adicionou Bootstrap nas páginas.
- [ ] Adicionou `estilo.css` nas páginas.
- [ ] Atualizou `index.html`.
- [ ] Criou o dashboard com Alunos, Professores e Funcionários.
- [ ] Atualizou `alunos.html`.
- [ ] Criou o filtro de alunos.
- [ ] Atualizou `aluno.js`.
- [ ] Criou `exibirAlunos()`.
- [ ] Criou `filtrarAlunos()`.
- [ ] Utilizou `filter()`.
- [ ] Utilizou `includes()`.
- [ ] Utilizou `toLowerCase()`.
- [ ] Utilizou `trim()`.
- [ ] Adicionou o evento `input`.
- [ ] Adicionou o evento `change`.
- [ ] Criou o botão Limpar.
- [ ] Testou filtro por nome.
- [ ] Testou filtro por cidade.
- [ ] Testou filtro por e-mail.
- [ ] Testou o botão Limpar.
- [ ] Aplicou o mesmo conceito aos professores.
- [ ] Aplicou o mesmo conceito aos funcionários.
- [ ] Testou as três telas.
- [ ] Verificou se os cadastros continuam funcionando.
- [ ] Verificou se os links entre as páginas estão funcionando.

---

# 53. O que aprendemos neste capítulo?

Neste capítulo aprendemos a integrar conceitos de **HTML, CSS, Bootstrap e JavaScript** para transformar uma aplicação funcional em uma aplicação mais organizada e agradável.

Os principais conceitos foram:

### HTML

```text
select
option
input
button
table
div
```

### Bootstrap

```text
container
row
col-md-*
card
btn
table
form-control
form-select
```

### CSS

```text
background-color
font-family
border-radius
box-shadow
:hover
@media
```

### JavaScript

```text
filter()
includes()
toLowerCase()
trim()
addEventListener()
getElementById()
```

### Arquitetura

```text
Frontend
    ↓
JavaScript
    ↓
FastAPI
    ↓
MySQL
```

---

# 54. Exercício para Exercitar o Conteúdo Aprendido

Até este momento, o filtro foi desenvolvido passo a passo utilizando a página de **Alunos** como exemplo.

Agora é a sua vez de colocar o conhecimento em prática.

Sua tarefa será **aplicar o mesmo mecanismo de filtro nas páginas de Professores e Funcionários**.

O objetivo é que as três entidades do sistema possuam uma experiência semelhante de pesquisa:

```text
Alunos
    ↓
Filtro

Professores
    ↓
Filtro

Funcionários
    ↓
Filtro
```

## 54.1 Filtro de Professores

Acesse:

```text
frontend/professores.html
```

e implemente um filtro semelhante ao que foi desenvolvido para `alunos.html`.

O usuário deverá conseguir escolher o campo que deseja pesquisar e informar o texto desejado.

Utilize os campos existentes na entidade Professor:

```text
Código
Nome
CPF
E-mail
Data de nascimento
Telefone
Cidade
```

Por exemplo:

```text
Filtrar por: Cidade

Pesquisar: mococa
```

O sistema deverá apresentar somente os professores cuja cidade corresponda à pesquisa.

### O que você deverá fazer

- [ ] Adicionar o `<select>` para escolher o campo.
- [ ] Adicionar o `<input>` para realizar a pesquisa.
- [ ] Adicionar o botão **Limpar**.
- [ ] Utilizar as classes do Bootstrap para organizar visualmente o filtro.
- [ ] Criar ou adaptar a função `filtrarProfessores()`.
- [ ] Utilizar o método `filter()`.
- [ ] Utilizar `toLowerCase()`.
- [ ] Utilizar `trim()`.
- [ ] Utilizar `includes()`.
- [ ] Utilizar o evento `input`.
- [ ] Utilizar o evento `change`.
- [ ] Fazer o botão **Limpar** apresentar novamente todos os professores.

---

## 54.2 Filtro de Funcionários

Depois de concluir o filtro dos professores, faça o mesmo na página:

```text
frontend/funcionarios.html
```

Utilize os campos existentes na entidade Funcionário:

```text
Código
Nome
CPF
E-mail
Data de nascimento
Telefone
Cidade
```

Por exemplo:

```text
Filtrar por: Nome

Pesquisar: maria
```

O sistema deverá apresentar somente os funcionários cujo nome contenha o texto pesquisado.

### O que você deverá fazer

- [ ] Adicionar o `<select>` para escolher o campo.
- [ ] Adicionar o `<input>` para realizar a pesquisa.
- [ ] Adicionar o botão **Limpar**.
- [ ] Utilizar as classes do Bootstrap.
- [ ] Criar ou adaptar a função `filtrarFuncionarios()`.
- [ ] Utilizar o método `filter()`.
- [ ] Utilizar `toLowerCase()`.
- [ ] Utilizar `trim()`.
- [ ] Utilizar `includes()`.
- [ ] Utilizar o evento `input`.
- [ ] Utilizar o evento `change`.
- [ ] Fazer o botão **Limpar** apresentar novamente todos os funcionários.

---

## 54.3 Atenção aos campos de cada entidade

Não copie o código de `aluno.js` simplesmente trocando o nome da função.

Observe que cada entidade possui seus próprios campos.

### Alunos

```text
codAluno
nome
cpf
email
data_nascimento
telefone
ra
cidade
```

### Professores

```text
codProf
nome
cpf
email
data_nascimento
telefone
cidade
```

### Funcionários

```text
codFunc
nome
cpf
email
data_nascimento
telefone
cidade
```

Perceba que **Alunos possuem o campo `ra`**, enquanto Professores e Funcionários não possuem esse campo.

Por isso, você deverá adaptar o código JavaScript de acordo com a estrutura de cada entidade.

---

## 54.4 Testando o filtro dos Professores

Depois de implementar o filtro, realize pelo menos estes testes.

### Teste 1 — Nome

```text
Filtrar por: Nome
Pesquisar: João
```

Verifique se somente professores que possuem `João` no nome aparecem.

### Teste 2 — Cidade

```text
Filtrar por: Cidade
Pesquisar: Mococa
```

Verifique se somente professores da cidade informada aparecem.

### Teste 3 — E-mail

```text
Filtrar por: E-mail
Pesquisar: gmail
```

Verifique se os professores cujo e-mail contém `gmail` aparecem.

### Teste 4 — Limpar

Clique no botão:

```text
Limpar
```

Todos os professores deverão voltar a aparecer.

---

## 54.5 Testando o filtro dos Funcionários

Repita os testes na página de funcionários.

### Teste 1 — Nome

```text
Filtrar por: Nome
Pesquisar: Maria
```

### Teste 2 — Cidade

```text
Filtrar por: Cidade
Pesquisar: Mococa
```

### Teste 3 — E-mail

```text
Filtrar por: E-mail
Pesquisar: gmail
```

### Teste 4 — Limpar

Clique no botão:

```text
Limpar
```

Todos os funcionários deverão voltar a aparecer.

---

## 54.6 Desafio adicional

Depois que os três filtros estiverem funcionando, tente melhorar a experiência do usuário.

Faça com que o sistema apresente uma mensagem quando nenhum registro for encontrado.

Por exemplo:

```text
Nenhum professor encontrado para a pesquisa realizada.
```

ou:

```text
Nenhum funcionário encontrado.
```

Uma possibilidade é verificar a quantidade de registros encontrados:

```javascript
if (listaFiltrada.length === 0) {
    // apresentar mensagem
}
```

Você deverá decidir como apresentar essa mensagem na tabela.

---

## 54.7 O que será avaliado?

Ao finalizar a atividade, você deverá demonstrar que consegue:

- utilizar Bootstrap para organizar a interface;
- utilizar um arquivo CSS externo;
- manipular elementos HTML com JavaScript;
- trabalhar com arrays de objetos;
- utilizar `filter()`;
- utilizar `includes()`;
- utilizar `toLowerCase()`;
- utilizar `trim()`;
- trabalhar com eventos;
- adaptar uma lógica existente para outra entidade;
- testar e corrigir seu próprio código.

> **Importante:** a implementação dos **Alunos** serve como referência e exemplo. A atividade consiste em utilizar o mesmo conceito para criar os filtros de **Professores e Funcionários**, respeitando os campos existentes em cada entidade.

---

# 55. Próxima etapa

O projeto agora possui:

```text
Cadastro
     +
Consulta
     +
Filtro
     +
Interface estilizada
```

A próxima evolução natural será implementar operações completas de CRUD.

Até o momento temos principalmente:

```text
CREATE → cadastrar
READ   → consultar
```

As próximas operações serão:

```text
UPDATE → atualizar
DELETE → excluir
```

Com isso, o sistema passará a permitir:

```text
┌──────────────────────────────────────┐
│          GESTÃO ESCOLAR              │
├──────────────────────────────────────┤
│                                      │
│  Cadastrar                            │
│  Consultar                            │
│  Filtrar                              │
│  Atualizar                            │
│  Excluir                              │
│                                      │
└──────────────────────────────────────┘
```

Esse processo permitirá que o projeto deixe de ser apenas um cadastro simples e evolua para um verdadeiro **Sistema de Gestão Escolar**, integrando frontend, JavaScript, API REST, FastAPI e banco de dados MySQL.

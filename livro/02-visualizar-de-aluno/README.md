# Capítulo 02 - Sistema Escolar com FastAPI -- Visualização de Alunos

## Objetivo

Nesta etapa do projeto, o sistema que inicialmente permitia apenas o
**cadastro de Alunos, Professores e Funcionários** será ampliado para
permitir também a **visualização dos registros cadastrados**.

A implementação será feita primeiro para **Alunos**, utilizando como
referência a estrutura já existente no projeto.

Ao final da atividade, o aluno deverá ser capaz de reproduzir o mesmo
procedimento para:

-   Professores;
-   Funcionários.

------------------------------------------------------------------------

# 1. Antes de começar

Antes de fazer qualquer alteração no projeto, é necessário ativar o
ambiente virtual, instalar as dependências e iniciar o servidor FastAPI.

Abra o terminal do VS Code na pasta do projeto.

A estrutura esperada é semelhante a:

``` text
cadastro-alunos/
├── backend/
├── frontend/
├── .env
├── fatec.sql
└── venv/
```

## 1.1 Ativando o ambiente virtual

No Windows, utilizando o CMD:

``` cmd
venv\Scripts\activate
```

No PowerShell:

``` powershell
.\venv\Scripts\Activate.ps1
```

Se o ambiente foi ativado corretamente, aparecerá `(venv)` no início da
linha do terminal:

``` text
(venv) C:\...\cadastro-alunos>
```

> **Atenção:** se `(venv)` não aparecer, o ambiente virtual não está
> ativo.

------------------------------------------------------------------------

# 2. Instalando as dependências

Com o ambiente virtual ativado, instale as bibliotecas necessárias:

``` cmd
python -m pip install fastapi uvicorn mysql-connector-python python-dotenv email-validator
```

As principais bibliotecas utilizadas pelo projeto são:

-   **FastAPI** -- criação da API;
-   **Uvicorn** -- servidor responsável por executar a aplicação
    FastAPI;
-   **mysql-connector-python** -- comunicação entre Python e MySQL;
-   **python-dotenv** -- leitura das configurações do arquivo `.env`;
-   **email-validator** -- validação dos campos `EmailStr` utilizados
    pelo Pydantic.

------------------------------------------------------------------------

# 3. Iniciando o servidor

Ainda com o `(venv)` ativado, execute:

``` cmd
python -m uvicorn backend.main:app --reload
```

Se tudo estiver correto, aparecerá uma mensagem semelhante a:

``` text
Uvicorn running on http://127.0.0.1:8000
```

O parâmetro `--reload` faz com que o servidor seja reiniciado
automaticamente quando os arquivos Python forem alterados.

Abra no navegador:

``` text
http://127.0.0.1:8000/
```

------------------------------------------------------------------------

# 4. Como o projeto estava antes

Até esta etapa, o projeto já possuía páginas para cadastrar:

``` text
Aluno
Professor
Funcionário
```

O cadastro de aluno, por exemplo, utiliza:

``` text
cadastrodealuno.html
        ↓
aluno.js
        ↓
POST /alunos
        ↓
FastAPI
        ↓
MySQL
```

O JavaScript coleta os dados do formulário:

``` javascript
const aluno = {
    nome: document.getElementById("nome").value,
    cpf: document.getElementById("cpf").value,
    email: document.getElementById("email").value,
    data_nascimento: document.getElementById("data_nascimento").value,
    telefone: document.getElementById("telefone").value,
    ra: document.getElementById("ra").value,
    cidade: document.getElementById("cidade").value
};
```

Depois envia os dados para a API:

``` javascript
const resposta = await fetch("/alunos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(aluno)
});
```

Agora vamos acrescentar a operação de **visualização**.

------------------------------------------------------------------------

# 5. Entendendo a diferença entre cadastro e visualização

Para cadastrar um aluno utilizamos:

``` text
POST /alunos
```

Para visualizar os alunos utilizamos:

``` text
GET /alunos
```

A diferença é importante:

  Operação            Método HTTP   Endpoint    Objetivo
  ------------------- ------------- ----------- ------------------------------
  Cadastrar aluno     POST          `/alunos`   Enviar um novo aluno
  Visualizar alunos   GET           `/alunos`   Buscar os alunos cadastrados

O backend já possui a rota:

``` python
@app.get("/alunos", response_model=list[AlunoResponse])
def listar_alunos():
```

Essa função consulta o banco:

``` python
cursor.execute("SELECT * FROM alunos")
```

e devolve os registros para o frontend.

Portanto, **não é necessário criar uma nova rota para a API**.

------------------------------------------------------------------------

# 6. Testando a API antes de criar a tela

Antes de criar a visualização, teste a API diretamente no navegador.

Acesse:

``` text
http://127.0.0.1:8000/alunos
```

Se houver alunos cadastrados, será retornado um JSON semelhante a:

``` json
[
    {
        "codAluno": 1,
        "nome": "Marcelo",
        "cpf": "123456",
        "email": "marcelo@teste.com",
        "data_nascimento": "1980-02-04",
        "telefone": "123456",
        "ra": "987654",
        "cidade": "Mococa"
    }
]
```

Se os dados aparecerem, significa que a comunicação:

``` text
FastAPI → MySQL
```

está funcionando.

------------------------------------------------------------------------

# 7. Criando a página de visualização

Agora vamos criar uma nova página:

``` text
frontend/alunos.html
```

Essa página será responsável somente pela apresentação dos dados.

Crie o arquivo `alunos.html` dentro da pasta `frontend`.

Utilize:

``` html
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Alunos Cadastrados</title>
</head>

<body>

    <h1>Alunos Cadastrados</h1>

    <a href="/">Voltar</a>
    <br><br>

    <table border="1">

        <thead>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Data de Nascimento</th>
                <th>Telefone</th>
                <th>RA</th>
                <th>Cidade</th>
            </tr>
        </thead>

        <tbody id="listaAlunos">
        </tbody>

    </table>

    <script src="/frontend/js/aluno.js"></script>

</body>

</html>
```

## 7.1 Entendendo o `<tbody>`

Observe:

``` html
<tbody id="listaAlunos">
</tbody>
```

Neste momento o corpo da tabela está vazio.

O JavaScript será responsável por criar as linhas dinamicamente.

------------------------------------------------------------------------

# 8. Criando o link no menu principal

Abra:

``` text
frontend/index.html
```

Na área de entidades, adicione:

``` html
<h2>Entidades</h2>

<nav>
    <a href="/frontend/alunos.html">
        Ver todos os Alunos
    </a>
</nav>
```

Agora, quando o usuário clicar em **Ver todos os Alunos**, o navegador
abrirá:

``` text
http://127.0.0.1:8000/frontend/alunos.html
```

------------------------------------------------------------------------

# 9. Alterando o JavaScript do aluno

O arquivo utilizado pelo cadastro já é:

``` text
frontend/js/aluno.js
```

Ele continuará responsável pelo cadastro.

Porém, agora vamos acrescentar uma segunda responsabilidade: **carregar
os alunos cadastrados**.

É importante observar que o mesmo arquivo JavaScript pode ser utilizado
nas duas páginas:

``` text
cadastrodealuno.html
        ↓
aluno.js
        ↓
cadastro

alunos.html
        ↓
aluno.js
        ↓
visualização
```

------------------------------------------------------------------------

# 10. Evitando erro na página de cadastro

Na página de cadastro existe:

``` html
<form id="form-aluno">
```

Porém, na página `alunos.html` esse formulário não existe.

Por isso, o código de cadastro deve ser protegido por:

``` javascript
const formulario = document.getElementById("form-aluno");

if (formulario) {

    formulario.addEventListener("submit", async function(evento) {

        // código do cadastro

    });

}
```

Dessa maneira:

-   se o formulário existir, o código de cadastro será executado;
-   se o formulário não existir, o código será ignorado.

Isso permite que o mesmo `aluno.js` seja utilizado nas duas páginas.

------------------------------------------------------------------------

# 11. Criando a função para carregar os alunos

No final do `aluno.js`, acrescente:

``` javascript
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

        const alunos = await resposta.json();

        tabela.innerHTML = "";

        alunos.forEach(aluno => {

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

carregarAlunos();
```

------------------------------------------------------------------------

# 12. Entendendo o funcionamento do JavaScript

Primeiro procuramos o elemento:

``` javascript
const tabela = document.getElementById("listaAlunos");
```

Ele corresponde ao:

``` html
<tbody id="listaAlunos">
```

Depois fazemos a requisição para a API:

``` javascript
const resposta = await fetch("/alunos");
```

O navegador solicita:

``` text
GET http://127.0.0.1:8000/alunos
```

A API consulta o banco de dados:

``` sql
SELECT * FROM alunos
```

e devolve os registros.

------------------------------------------------------------------------

# 13. Convertendo a resposta para JSON

Utilizamos:

``` javascript
const alunos = await resposta.json();
```

Agora a variável `alunos` contém os registros retornados pela API.

Podemos percorrer os registros utilizando:

``` javascript
alunos.forEach(aluno => {
```

------------------------------------------------------------------------

# 14. Criando uma linha da tabela

Para cada aluno criamos:

``` javascript
const linha = document.createElement("tr");
```

Depois inserimos as células:

``` javascript
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
```

Finalmente adicionamos a linha ao `<tbody>`:

``` javascript
tabela.appendChild(linha);
```

------------------------------------------------------------------------

# 15. Fluxo completo da aplicação

Depois dessa alteração, o funcionamento será:

``` text
                    INDEX.HTML
                        │
                        │
              Ver todos os Alunos
                        │
                        ▼
                  ALUNOS.HTML
                        │
                        │ carrega
                        ▼
                    ALUNO.JS
                        │
                        │ fetch("/alunos")
                        ▼
                  FASTAPI
                        │
                        │ GET /alunos
                        ▼
                     MYSQL
                        │
                        │ SELECT * FROM alunos
                        ▼
                  FASTAPI
                        │
                        │ JSON
                        ▼
                    ALUNO.JS
                        │
                        │ cria <tr>
                        ▼
                   TABELA HTML
```

------------------------------------------------------------------------

# 16. Como testar

Depois de salvar as alterações:

### Teste 1 -- Página inicial

Acesse:

``` text
http://127.0.0.1:8000/
```

Verifique se aparece:

``` text
Ver todos os Alunos
```

### Teste 2 -- API

Acesse:

``` text
http://127.0.0.1:8000/alunos
```

Verifique se o JSON dos alunos aparece.

### Teste 3 -- Página de visualização

Clique em:

``` text
Ver todos os Alunos
```

ou acesse diretamente:

``` text
http://127.0.0.1:8000/frontend/alunos.html
```

A tabela deverá apresentar os alunos cadastrados.

------------------------------------------------------------------------

# 17. Se os alunos não aparecerem

Utilize o navegador para investigar o problema.

Pressione:

``` text
F12
```

e abra a aba:

``` text
Console
```

Também é possível acessar diretamente:

``` text
http://127.0.0.1:8000/alunos
```

Se o JSON aparecer, o backend está funcionando e o problema
provavelmente está no HTML ou JavaScript.

Confira principalmente:

### O HTML possui:

``` html
<tbody id="listaAlunos">
</tbody>
```

### O HTML carrega:

``` html
<script src="/frontend/js/aluno.js"></script>
```

### O JavaScript realiza:

``` javascript
fetch("/alunos")
```

------------------------------------------------------------------------

# 18. O que foi aprendido

Nesta atividade foram trabalhados conceitos importantes:

-   criação de uma página HTML para visualização;
-   criação de links entre páginas;
-   utilização do método HTTP `GET`;
-   utilização do `fetch()` do JavaScript;
-   consumo de uma API FastAPI;
-   conversão da resposta para JSON;
-   utilização de `forEach()`;
-   criação dinâmica de elementos HTML;
-   preenchimento de tabelas com dados vindos da API;
-   integração entre frontend, backend e banco de dados;
-   reutilização de um arquivo JavaScript em diferentes páginas.

A principal ideia é compreender que o frontend não acessa diretamente o
banco de dados.

A comunicação ocorre por meio da API:

``` text
Frontend → FastAPI → MySQL
Frontend ← FastAPI ← MySQL
```

------------------------------------------------------------------------

# 19. Exercício de fixação -- Visualização de Professores

Agora que a visualização de alunos está funcionando, você deverá
implementar o mesmo procedimento para **Professores**.

O objetivo é criar uma página:

``` text
frontend/professores.html
```

que permita visualizar os professores cadastrados.

## Requisitos

1.  Criar `professores.html`.

2.  Criar uma tabela contendo:

    -   Código;
    -   Nome;
    -   CPF;
    -   E-mail;
    -   Data de Nascimento;
    -   Telefone;
    -   Cidade.

3.  Criar no `index.html` um link:

    ``` text
    Ver todos os Professores
    ```

4.  Utilizar a API:

    ``` text
    GET /professores
    ```

5.  Utilizar JavaScript para realizar o `fetch()`.

6.  Percorrer os professores recebidos.

7.  Criar dinamicamente as linhas da tabela.

8.  Exibir os dados retornados pela API.

9.  Testar a página pelo navegador.

------------------------------------------------------------------------

# 20. Exercício de fixação -- Visualização de Funcionários

Depois de finalizar a visualização de professores, faça o mesmo
procedimento para **Funcionários**.

Crie:

``` text
frontend/funcionarios.html
```

A tabela deverá apresentar:

-   Código;
-   Nome;
-   CPF;
-   E-mail;
-   Data de Nascimento;
-   Telefone;
-   Cidade.

Utilize a API:

``` text
GET /funcionarios
```

Crie também no `index.html` um link:

``` text
Ver todos os Funcionários
```

------------------------------------------------------------------------

# 21. Desafio final

Ao terminar os dois exercícios, o menu principal deverá permitir:

``` text
Sistema Escola

Entidades

Ver todos os Alunos
Ver todos os Professores
Ver todos os Funcionários

Cadastros

Cadastro de Alunos
Cadastro de Professores
Cadastro de Funcionários
```

O sistema deverá possuir, portanto, **cadastro e visualização das três
entidades**.

## Resultado esperado

``` text
              SISTEMA ESCOLA
                    │
        ┌───────────┴───────────┐
        │                       │
    CADASTROS               VISUALIZAÇÃO
        │                       │
   ┌────┼────┐             ┌────┼────┐
   │    │    │             │    │    │
Aluno Prof. Func.        Aluno Prof. Func.
```

> **Importante:** o exercício deve ser desenvolvido pelos alunos
> utilizando como referência a implementação da visualização de alunos.
> O objetivo é que eles compreendam o padrão utilizado e consigam
> reproduzi-lo para as demais entidades, em vez de simplesmente copiar o
> resultado final.



# 22. Próximo capítulo

No próximo capítulo vamos criar a aplicação e realizar o Filtrar Dados dos Alunos junto com o banco de dados.

[➡️ **Capítulo 03 — Filtrar Dados dos Alunos**](https://github.com/pedroAmalfi/livro-api-python-fastapi/tree/main/livro/03-filtrar-dados)

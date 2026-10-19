# Aula 07 --- Integração do React com FastAPI

## Projeto: Sistema de Gestão Escolar

Nesta aula, vamos criar uma aplicação **React** separada do backend
**FastAPI** já desenvolvido. O React será responsável pelas telas,
enquanto o FastAPI continuará responsável pelas rotas e pela comunicação
com o banco de dados MySQL.

Ao final da aula, a página inicial do React terá cartões para
**Alunos**, **Professores** e **Funcionários**. O módulo de alunos
deverá permitir apenas **visualizar/listar** os alunos cadastrados pela
API. Como exercício, cada aluno deverá implementar a listagem de
professores e funcionários.

------------------------------------------------------------------------

## 1. Estrutura geral do projeto

Crie uma pasta chamada `projeto` para organizar os dois projetos:

``` text
projeto/
├── cadastro-aluno/
│   ├── backend/
│   ├── frontend/
│   ├── .env
│   └── ...
└── cadastro-alunos-react/
    ├── public/
    ├── src/
    ├── package.json
    └── ...
```

> **Importante:** se o projeto FastAPI já existe com o nome
> `cadastro-alunos`, você pode manter esse nome. O nome da pasta não
> precisa ser alterado, desde que os comandos sejam executados dentro da
> pasta correta. Neste roteiro, usaremos `cadastro-aluno` como nome de
> referência.

## 2. Preparar o ambiente

Antes de começar, verifique se estão instalados:

-   **Python** e o ambiente virtual usado pelo projeto FastAPI.
-   **Node.js LTS**, que inclui o `npm`.
-   **Visual Studio Code**.
-   **XAMPP/MySQL**, caso o banco de dados esteja hospedado localmente.

Para conferir Node.js e npm, abra o terminal e execute:

``` bash
node -v
npm -v
```

Se os comandos mostrarem versões, as ferramentas estão disponíveis.

## 3. Executar e testar o FastAPI

Abra um terminal no VS Code e entre na pasta do projeto FastAPI. Ajuste
o caminho conforme a localização escolhida:

``` bat
cd C:\Users\SEU_USUARIO\Desktop\projeto\cadastro-aluno
```

Ative o ambiente virtual no Windows:

``` bat
venv\Scripts\activate
```

Se o ambiente virtual tiver outro nome ou ainda não existir, utilize as
instruções já adotadas no projeto FastAPI.

Inicie a API:

``` bash
python -m uvicorn backend.main:app --reload
```

Confira no navegador:

-   API de alunos: <http://127.0.0.1:8000/alunos>
-   Documentação interativa: <http://127.0.0.1:8000/docs>

O endpoint `/alunos` deve retornar uma lista em JSON. **Mantenha esse
terminal aberto** enquanto trabalha no React.

## 4. Criar o projeto React com Vite

Abra um **segundo terminal** e entre na pasta `projeto`, que é a pasta
que contém o projeto FastAPI:

``` bat
cd C:\Users\SEU_USUARIO\Desktop\projeto
```

Crie a aplicação React:

``` bash
npm create vite@latest cadastro-alunos-react -- --template react
```

Entre na nova pasta e instale as dependências:

``` bash
cd cadastro-alunos-react
npm install
```

Instale o React Router, que será usado para navegar entre as páginas:

``` bash
npm install react-router-dom
```

Inicie o servidor de desenvolvimento:

``` bash
npm run dev
```

Abra o endereço informado pelo terminal, normalmente
<http://localhost:5173>. Se a página inicial do Vite aparecer, a
instalação foi concluída.

> Para os comandos do React, use um terminal dentro de
> `cadastro-alunos-react`. Para os comandos do FastAPI, use outro
> terminal dentro da pasta do backend.

## 5. Quais arquivos podemos apagar?

O Vite cria arquivos de exemplo que não são necessários para esta
primeira atividade. **A exclusão é opcional.** Antes de apagar um
arquivo, verifique se ele é importado por outro arquivo.

Possíveis arquivos de demonstração que podem ser removidos, caso existam
e não sejam utilizados:

-   `src/assets/react.svg`
-   `public/vite.svg`
-   `src/assets/`, se ficar vazia e não houver importações dessa pasta.

Não apague:

-   `src/main.jsx`
-   `index.html`
-   `package.json`
-   `package-lock.json`
-   `vite.config.js`
-   `node_modules/`

Esses arquivos ou pastas são necessários para iniciar, configurar ou
instalar a aplicação. Também não apague o `README.md` do projeto sem
necessidade.

## 6. Organizar a pasta `src`

Dentro de `src`, crie estas pastas e arquivos:

``` text
src/
├── components/
│   ├── Cabecalho.jsx
│   └── MenuPrincipal.jsx
├── pages/
│   ├── Home.jsx
│   ├── Alunos.jsx
│   ├── Professores.jsx
│   └── Funcionarios.jsx
├── services/
│   └── api.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

Nesta aula, vamos usar principalmente `Home.jsx`, `Alunos.jsx`,
`api.js`, `App.jsx` e `App.css`. Os componentes de cabeçalho e menu
ficam preparados para atividades futuras; não é necessário utilizá-los
agora.

### Para que serve cada parte?

-   `pages/`: telas da aplicação.
-   `components/`: partes reutilizáveis da interface.
-   `services/api.js`: funções que fazem as requisições para o FastAPI.
-   `App.jsx`: define as rotas e quais páginas serão exibidas.
-   `App.css` e `index.css`: estilos visuais.
-   `main.jsx`: ponto de entrada que inicia a aplicação React.

## 7. Autorizar o React a acessar o FastAPI (CORS)

Como o React e o FastAPI usam endereços/portas diferentes durante o
desenvolvimento, o backend precisa permitir as requisições vindas do
React.

No arquivo `backend/main.py`, acrescente a importação:

``` python
from fastapi.middleware.cors import CORSMiddleware
```

Logo após a criação da aplicação:

``` python
app = FastAPI()
```

adicione:

``` python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Se o FastAPI estiver rodando, o `--reload` normalmente recarregará a
aplicação após salvar o arquivo. Confira no terminal se não houve erro.

## 8. Criar a página inicial

Abra `src/pages/Home.jsx` e insira:

``` jsx
import { Link } from "react-router-dom";

function Home() {
  const modulos = [
    {
      titulo: "Alunos",
      descricao: "Consulte os alunos cadastrados.",
      rota: "/alunos",
      icone: "🎓",
    },
    {
      titulo: "Professores",
      descricao: "Consulte os professores cadastrados.",
      rota: "/professores",
      icone: "👨‍🏫",
    },
    {
      titulo: "Funcionários",
      descricao: "Consulte os funcionários cadastrados.",
      rota: "/funcionarios",
      icone: "👔",
    },
  ];

  return (
    <main className="home">
      <h1>Sistema de Gestão Escolar</h1>
      <p className="subtitulo">
        Gerencie alunos, professores e funcionários de forma simples e organizada.
      </p>

      <section className="cards">
        {modulos.map((modulo) => (
          <article className="card" key={modulo.titulo}>
            <div className="icone">{modulo.icone}</div>
            <h2>{modulo.titulo}</h2>
            <p>{modulo.descricao}</p>
            <Link className="botao botao-principal" to={modulo.rota}>
              Ver {modulo.titulo.toLowerCase()}
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Home;
```

Nesta primeira aula, a página inicial terá apenas um botão **Ver** em
cada cartão. O botão de cada módulo abrirá a página correspondente.

## 9. Preparar a comunicação com a API

Abra `src/services/api.js` e insira:

``` javascript
const API_URL = "http://127.0.0.1:8000";

export async function listarAlunos() {
  const resposta = await fetch(`${API_URL}/alunos`);

  if (!resposta.ok) {
    throw new Error("Não foi possível listar os alunos.");
  }

  return resposta.json();
}
```

Essa função faz uma requisição HTTP `GET` para `/alunos` e retorna os
dados JSON enviados pelo FastAPI.

## 10. Criar a tela de listagem de alunos

Abra `src/pages/Alunos.jsx` e insira:

``` jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarAlunos } from "../services/api";

function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarAlunos() {
      try {
        const dados = await listarAlunos();
        setAlunos(dados);
      } catch (erro) {
        setErro(erro.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarAlunos();
  }, []);

  return (
    <main className="pagina">
      <Link to="/">← Voltar ao início</Link>
      <h1>Alunos cadastrados</h1>

      {carregando && <p>Carregando alunos...</p>}
      {erro && <p className="mensagem-erro">{erro}</p>}

      {!carregando && !erro && (
        <div className="tabela-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Data de nascimento</th>
                <th>Telefone</th>
                <th>RA</th>
                <th>Cidade</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.codAluno}>
                  <td>{aluno.codAluno}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.cpf}</td>
                  <td>{aluno.email}</td>
                  <td>{String(aluno.data_nascimento).slice(0, 10)}</td>
                  <td>{aluno.telefone}</td>
                  <td>{aluno.ra}</td>
                  <td>{aluno.cidade}</td>
                </tr>
              ))}

              {alunos.length === 0 && (
                <tr>
                  <td colSpan="8">Nenhum aluno cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default Alunos;
```

Esta página **somente consulta e exibe** os alunos. Não há formulário
para cadastrar, alterar ou excluir registros nesta atividade.

## 11. Criar páginas provisórias para os outros módulos

Os arquivos importados pelo `App.jsx` precisam exportar componentes.
Para que a aplicação funcione enquanto os alunos desenvolvem o
exercício, coloque temporariamente o seguinte em
`src/pages/Professores.jsx`:

``` jsx
import { Link } from "react-router-dom";

function Professores() {
  return (
    <main className="pagina">
      <Link to="/">← Voltar ao início</Link>
      <h1>Professores</h1>
      <p>Atividade: implementar a listagem de professores.</p>
    </main>
  );
}

export default Professores;
```

Em `src/pages/Funcionarios.jsx`:

``` jsx
import { Link } from "react-router-dom";

function Funcionarios() {
  return (
    <main className="pagina">
      <Link to="/">← Voltar ao início</Link>
      <h1>Funcionários</h1>
      <p>Atividade: implementar a listagem de funcionários.</p>
    </main>
  );
}

export default Funcionarios;
```

Essas páginas são apenas provisórias. Os alunos deverão substituir o
conteúdo delas pela implementação solicitada no exercício.

## 12. Configurar as rotas

Abra `src/App.jsx` e insira:

``` jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Alunos from "./pages/Alunos";
import Professores from "./pages/Professores";
import Funcionarios from "./pages/Funcionarios";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/professores" element={<Professores />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## 13. Estilizar a aplicação

Abra `src/App.css` e insira:

``` css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f3f6fb;
  color: #263238;
}

.home,
.pagina {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.home {
  text-align: center;
}

.home h1 {
  color: #174ea6;
  margin-bottom: 8px;
}

.subtitulo {
  color: #4b5563;
  margin-bottom: 40px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icone {
  font-size: 3rem;
}

.card h2 {
  color: #174ea6;
}

.card p {
  line-height: 1.5;
  flex-grow: 1;
}

.botao {
  display: inline-block;
  padding: 12px 16px;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
}

.botao-principal {
  background: #1769ff;
  color: white;
}

.tabela-container {
  width: 100%;
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
}

th {
  background: #174ea6;
  color: white;
}

tbody tr:hover {
  background: #eef4ff;
}

.mensagem-erro {
  padding: 12px;
  color: #991b1b;
  background: #fee2e2;
  border-radius: 6px;
}

@media (max-width: 750px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
```

Se houver regras antigas em `App.css`, substitua-as pelo conteúdo acima
para evitar conflitos nesta primeira versão.

## 14. Conferir o arquivo `src/main.jsx`

O arquivo criado pelo Vite normalmente já está correto. Ele deve conter
algo semelhante a:

``` jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Não é necessário alterar esse arquivo se ele já estiver assim.

## 15. Executar e testar

Mantenha os dois terminais abertos.

**Terminal 1 --- FastAPI**, na pasta do backend:

``` bash
python -m uvicorn backend.main:app --reload
```

**Terminal 2 --- React**, na pasta `cadastro-alunos-react`:

``` bash
npm run dev
```

Abra <http://localhost:5173> e teste:

1.  A página inicial mostra os cartões dos três módulos.
2.  Clique em **Ver alunos**.
3.  A tabela deve mostrar os dados retornados pelo FastAPI.
4.  Clique em **Voltar ao início**.
5.  Acesse Professores e Funcionários e confira as páginas provisórias.

Se houver erro de CORS, verifique a configuração do passo 7. Se a
listagem não carregar, confira se o endpoint
`http://127.0.0.1:8000/alunos` está respondendo.

------------------------------------------------------------------------

## 16. Exercício para os alunos

**Objetivo:** implementar a listagem de professores e funcionários
utilizando o mesmo padrão aprendido com alunos.

### Parte A --- Professores

1.  Criar uma função `listarProfessores()` em `src/services/api.js`.
2.  Fazer uma requisição `GET` para `/professores`.
3.  Implementar a tela em `src/pages/Professores.jsx`.
4.  Utilizar `useState` para armazenar os dados.
5.  Utilizar `useEffect` para consultar a API quando a página for
    aberta.
6.  Exibir os professores em uma tabela com os campos retornados pelo
    backend.

### Parte B --- Funcionários

1.  Criar uma função `listarFuncionarios()` em `src/services/api.js`.
2.  Fazer uma requisição `GET` para `/funcionarios`.
3.  Implementar a tela em `src/pages/Funcionarios.jsx`.
4.  Utilizar `useState` e `useEffect`.
5.  Exibir os funcionários em uma tabela.

### Critérios de conclusão

-   A página inicial apresenta os três módulos.
-   O botão de cada módulo abre a página correta.
-   A listagem de alunos funciona com dados reais da API.
-   A listagem de professores funciona com dados reais da API.
-   A listagem de funcionários funciona com dados reais da API.
-   As páginas apresentam uma mensagem de carregamento e uma mensagem de
    erro quando necessário.
-   O botão de voltar retorna à página inicial.

**Nesta aula, não implemente cadastro, edição ou exclusão em React.** O
objetivo é compreender como o React consome uma API REST já existente.
As operações de escrita serão trabalhadas em aulas posteriores.

------------------------------------------------------------------------

## 17. Conceitos que você deve compreender

Ao finalizar a atividade, você deverá saber explicar:

-   Qual é a responsabilidade do React?
-   Qual é a responsabilidade do FastAPI?
-   O que é uma API REST?
-   O que é uma requisição HTTP `GET`?
-   O que significa receber uma resposta JSON?
-   Para que servem `useState` e `useEffect`?
-   Por que precisamos configurar o CORS?
-   Qual é a função de `services/api.js`?
-   Por que separamos as telas na pasta `pages/`?

### Resultado esperado

Uma aplicação React independente do frontend antigo do FastAPI, com uma
página inicial organizada e três módulos. A listagem de alunos estará
funcional, enquanto professores e funcionários serão implementados pelos
estudantes como exercício.


# Próximo capítulo

No próximo capítulo vamos Realizar o Cadastro do projeto em REACT.

[➡️ **Capítulo 08 — Cadastro do Projeto em React**](https://github.com/pedroAmalfi/livro-api-python-fastapi/tree/main/livro/08-cadastrando-react)

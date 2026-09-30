# 🚀 React + FastAPI --- Preparação do Ambiente e Primeiro Projeto

Este material apresenta o passo a passo para preparar o computador para
trabalhar com **React** e, posteriormente, conectar o React à aplicação
**FastAPI** desenvolvida durante as aulas.

O objetivo desta etapa é garantir que todos os alunos tenham o ambiente
funcionando **antes de iniciarmos a integração entre Front-end e
Back-end**.

------------------------------------------------------------------------

# 1. 🎯 Objetivo desta atividade

Antes de começarmos a desenvolver nosso projeto completo, precisamos
verificar se o ambiente de desenvolvimento está funcionando
corretamente.

Nesta atividade iremos:

1.  Instalar o Node.js;
2.  Verificar o Node.js;
3.  Verificar o npm;
4.  Verificar o Git;
5.  Criar um projeto React utilizando Vite;
6.  Instalar as dependências;
7.  Executar o projeto;
8.  Abrir o projeto no navegador;
9.  Alterar o arquivo `App.jsx`;
10. Criar uma pequena interação com botão e contador;
11. Entender a estrutura básica de um projeto React;
12. Preparar o ambiente para, posteriormente, conectar o React à API
    FastAPI.

------------------------------------------------------------------------

# 2. ⚠️ Por que é importante fazer os testes em casa e na escola?

É **muito importante que cada aluno realize este procedimento em dois
ambientes**:

-   💻 Computador de casa;
-   🏫 Computador utilizado na escola/FATEC.

Isso é necessário porque um computador pode estar configurado de maneira
diferente de outro.

Por exemplo:

-   Um computador pode ter Node.js instalado e outro não;
-   Uma máquina pode possuir uma versão diferente do Node.js;
-   O PowerShell pode bloquear a execução do npm;
-   O Git pode não estar instalado;
-   Pode existir alguma restrição de rede;
-   O computador pode possuir configurações diferentes de permissões;
-   Uma instalação pode estar incompleta ou apresentar algum erro.

### 🚨 Não deixe para descobrir isso no dia do projeto!

Imagine que começamos a desenvolver o sistema e, durante a aula, um
aluno descobre que:

``` text
npm não funciona
```

ou:

``` text
node não foi encontrado
```

ou:

``` text
localhost:5173 não abre
```

Nesse caso, parte da aula será utilizada apenas para configurar o
computador.

Por isso, a proposta é:

> **Teste o ambiente em casa e na escola antes de começarmos o
> desenvolvimento do projeto React + FastAPI.**

Se ocorrer algum problema, registre a mensagem de erro e procure
solucioná-la antes da aula seguinte.

------------------------------------------------------------------------

# 3. 🧠 O que é React?

O **React** é uma biblioteca JavaScript utilizada principalmente para
construir **interfaces de usuário (User Interfaces --- UI)**.

Em termos simples:

> O React será responsável pela parte visual e interativa da nossa
> aplicação.

Por exemplo, imagine o nosso sistema de Gestão Escolar.

Podemos ter:

``` text
┌─────────────────────────────────────┐
│        SISTEMA DE GESTÃO ESCOLAR    │
├─────────────────────────────────────┤
│                                     │
│  Alunos                             │
│                                     │
│  [ + Novo aluno ]                   │
│                                     │
│  Código | Nome | E-mail | Cidade    │
│  ---------------------------------  │
│  001    | João | ...    | Itapira  │
│  002    | Maria| ...    | Mogi Guaçu│
│                                     │
└─────────────────────────────────────┘
```

Essa interface poderá ser construída utilizando React.

O React pode:

-   criar telas;
-   criar formulários;
-   apresentar tabelas;
-   criar botões;
-   responder a eventos;
-   atualizar informações na tela;
-   consumir APIs;
-   enviar dados para um Back-end;
-   receber dados de um Back-end;
-   organizar a aplicação em componentes.

------------------------------------------------------------------------

# 4. 🧠 E o que é FastAPI?

O **FastAPI** é um framework Python utilizado para desenvolver APIs.

No nosso projeto, o FastAPI representa o **Back-end**.

Por exemplo, já temos uma aplicação que possui uma rota:

``` text
GET /alunos
```

Essa rota pode consultar o banco de dados e retornar os alunos em
formato JSON.

Exemplo:

``` json
[
    {
        "codAluno": 1,
        "nome": "João",
        "email": "joao@email.com"
    },
    {
        "codAluno": 2,
        "nome": "Maria",
        "email": "maria@email.com"
    }
]
```

O FastAPI não precisa desenhar a tela para o usuário.

Ele pode ficar responsável por:

-   receber requisições;
-   executar regras de negócio;
-   acessar o banco de dados;
-   inserir dados;
-   alterar dados;
-   excluir dados;
-   consultar dados;
-   devolver respostas em JSON.

------------------------------------------------------------------------

# 5. 🔗 Como React e FastAPI irão conversar?

Uma das ideias mais importantes deste projeto é entender que **React e
FastAPI são partes diferentes da aplicação**.

Podemos imaginar:

``` text
                 USUÁRIO
                    │
                    ▼
              ┌───────────┐
              │   REACT   │
              │ Front-end │
              └─────┬─────┘
                    │
                    │ HTTP / JSON
                    ▼
              ┌───────────┐
              │  FASTAPI  │
              │  Back-end │
              └─────┬─────┘
                    │
                    │ SQL
                    ▼
              ┌───────────┐
              │   MYSQL   │
              │  Banco de │
              │   Dados   │
              └───────────┘
```

Por exemplo, o React pode solicitar:

``` text
GET http://localhost:8000/alunos
```

O FastAPI recebe essa requisição.

Ele consulta o MySQL.

Depois devolve:

``` json
[
    {
        "codAluno": 1,
        "nome": "João"
    },
    {
        "codAluno": 2,
        "nome": "Maria"
    }
]
```

O React recebe esses dados e utiliza as informações para montar uma
tabela na tela.

------------------------------------------------------------------------

# 6. 🌐 O que significa API?

API significa:

**Application Programming Interface**

Em nosso projeto, a API será uma espécie de "ponte" entre o Front-end e
o Back-end.

O React não precisa conhecer diretamente como o banco MySQL funciona.

Ele pode simplesmente solicitar:

``` text
GET /alunos
```

O FastAPI fica responsável por descobrir como buscar os dados.

Essa separação é muito importante no desenvolvimento de sistemas.

------------------------------------------------------------------------

# 7. 🛠️ O que precisamos instalar?

Para esta primeira etapa, recomendamos:

  Software             Finalidade
  -------------------- -----------------------------------
  Node.js              Executar o ambiente JavaScript
  npm                  Instalar e gerenciar pacotes
  Visual Studio Code   Editar o projeto
  Git                  Controle de versão e GitHub
  Google Chrome        Testar a aplicação
  Python               Executar posteriormente o FastAPI
  MySQL/XAMPP          Banco de dados do projeto

> Se Python, MySQL/XAMPP e Git já estão instalados devido às disciplinas
> anteriores, não é necessário reinstalá-los.

------------------------------------------------------------------------

# 8. 📦 Instalação do Node.js

Acesse o site oficial:

https://nodejs.org/

Baixe a versão **LTS (Long Term Support)**.

Durante a instalação, utilize as opções padrão do instalador.

Depois de concluir a instalação, feche e abra novamente o PowerShell ou
o terminal do VS Code.

------------------------------------------------------------------------

# 9. 🧪 Testando o Node.js

Abra o PowerShell.

Execute:

``` powershell
node --version
```

Exemplo:

``` text
v24.21.0
```

A versão pode ser diferente da apresentada neste material.

O mais importante é aparecer uma versão.

## O que esse comando faz?

``` text
node
```

é o programa Node.js.

``` text
--version
```

solicita ao Node.js que informe sua versão.

------------------------------------------------------------------------

# 10. 🧪 Testando o npm

Execute:

``` powershell
npm --version
```

Deve aparecer uma versão, por exemplo:

``` text
11.x.x
```

O número pode ser diferente.

## O que é npm?

npm significa:

**Node Package Manager**

É o gerenciador de pacotes do Node.js.

Ele será utilizado para instalar ferramentas e bibliotecas utilizadas
pelos nossos projetos.

Por exemplo:

``` powershell
npm install
```

instala as dependências de um projeto.

------------------------------------------------------------------------

# 11. ⚠️ Problema: PowerShell bloqueando o npm

Em alguns computadores, pode aparecer um erro semelhante a:

``` text
O arquivo npm.ps1 não pode ser carregado porque a execução de scripts
foi desabilitada neste sistema.
```

Isso significa que o PowerShell está impedindo a execução de scripts.

Uma alternativa rápida para testar é:

``` powershell
npm.cmd --version
```

Se aparecer a versão do npm, significa que o npm está instalado.

Para corrigir a utilização normal do comando `npm`, execute:

``` powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Quando o PowerShell solicitar confirmação, responda:

``` text
S
```

Depois feche o PowerShell, abra novamente e teste:

``` powershell
npm --version
```

> Caso o computador da escola possua políticas administrativas que
> impeçam essa alteração, não tente contornar as políticas da
> instituição. Registre o erro e solicite auxílio ao responsável pelo
> laboratório.

------------------------------------------------------------------------

# 12. 🧪 Testando o Git

Execute:

``` powershell
git --version
```

Deve aparecer algo semelhante a:

``` text
git version 2.x.x
```

O Git será utilizado posteriormente para controle de versão e integração
com o GitHub.

------------------------------------------------------------------------

# 13. 📁 Criando uma pasta para o projeto

Vamos criar uma pasta chamada:

``` text
projeto
```

Por exemplo, na Área de Trabalho:

``` powershell
cd C:\Users\SEU_USUARIO\Desktop
```

Depois:

``` powershell
mkdir projeto
```

Entre na pasta:

``` powershell
cd projeto
```

Verifique a localização:

``` powershell
pwd
```

O resultado será semelhante a:

``` text
C:\Users\SEU_USUARIO\Desktop\projeto
```

------------------------------------------------------------------------

# 14. ⚛️ Criando o primeiro projeto React

Agora vamos utilizar o **Vite** para criar o projeto.

Execute:

``` powershell
npm create vite@latest frontend
```

Esse comando poderá solicitar algumas informações.

------------------------------------------------------------------------

## 14.1 O que significa esse comando?

Vamos dividir:

``` text
npm
```

Utiliza o gerenciador de pacotes.

``` text
create
```

Solicita a criação de um projeto.

``` text
vite@latest
```

Utiliza a versão mais recente disponível do criador de projetos Vite.

``` text
frontend
```

É o nome da pasta que será criada para o nosso projeto.

O resultado será:

``` text
projeto/
└── frontend/
```

------------------------------------------------------------------------

# 15. 🧩 Escolhendo o framework

O Vite apresentará:

``` text
Select a framework:
```

Escolha:

``` text
React
```

O Vite permite criar projetos utilizando diferentes tecnologias. Nesta
disciplina estamos utilizando React.

------------------------------------------------------------------------

# 16. 🟨 Escolhendo JavaScript

Depois aparecerá:

``` text
Select a variant:
```

Escolha:

``` text
JavaScript
```

Neste momento não utilizaremos TypeScript.

A proposta é começar com JavaScript para que possamos concentrar nossa
atenção nos conceitos do React e na integração com FastAPI.

------------------------------------------------------------------------

# 17. 🔎 Escolhendo o linter

Em versões atuais do Vite pode aparecer:

``` text
Which linter to use?
```

Escolha:

``` text
ESLint
```

## O que é ESLint?

ESLint é uma ferramenta que ajuda a encontrar problemas no código
JavaScript e manter determinadas regras de qualidade e padronização.

Ele não é o React e não é obrigatório para executar o React.

Ele é uma ferramenta auxiliar do projeto.

------------------------------------------------------------------------

# 18. 📦 Instalação automática

Algumas versões do Vite perguntam:

``` text
Install with npm and start now?
```

Se estiver disponível, podemos escolher:

``` text
Yes
```

Nesse caso, o Vite irá:

1.  criar o projeto;
2.  instalar as dependências;
3.  iniciar o servidor de desenvolvimento.

Se essa opção não aparecer, não há problema. Podemos executar
manualmente os comandos nas etapas seguintes.

------------------------------------------------------------------------

# 19. 📂 Estrutura inicial do projeto

Depois de criado, teremos aproximadamente:

``` text
projeto/
│
└── frontend/
    │
    ├── node_modules/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    │
    ├── .gitignore
    ├── index.html
    ├── package.json
    └── vite.config.js
```

Alguns arquivos podem variar dependendo da versão do Vite.

------------------------------------------------------------------------

# 20. 📚 O que significa cada parte?

## `node_modules`

Contém as bibliotecas e dependências instaladas pelo npm.

Normalmente não editamos arquivos dessa pasta manualmente.

------------------------------------------------------------------------

## `public`

Pode armazenar arquivos públicos utilizados pela aplicação.

Por exemplo:

-   imagens;
-   ícones;
-   arquivos estáticos.

------------------------------------------------------------------------

## `src`

É uma das pastas mais importantes.

`src` significa:

**source**

ou seja, código-fonte.

É nela que desenvolveremos grande parte da aplicação React.

------------------------------------------------------------------------

## `App.jsx`

É o componente principal utilizado pelo projeto inicial do React.

É nele que vamos começar nossos testes de interface.

Por isso, para o primeiro teste, iremos modificar o `App.jsx`.

------------------------------------------------------------------------

## `main.jsx`

É responsável por iniciar a aplicação React e renderizar o componente
principal na página.

Normalmente ele possui uma estrutura semelhante a:

``` jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Observe:

``` jsx
import App from './App.jsx'
```

Isso importa o componente `App`.

Depois:

``` jsx
<App />
```

faz com que o componente seja renderizado.

Por isso não precisamos editar `main.jsx` para o primeiro teste.

------------------------------------------------------------------------

# 21. 📄 Por que vamos editar o `App.jsx`?

O objetivo deste primeiro exercício é testar o funcionamento do React
sem modificar desnecessariamente a estrutura inicial criada pelo Vite.

O `main.jsx` é responsável por iniciar/renderizar a aplicação.

O `App.jsx` representa o componente principal que vamos utilizar para
construir nossa primeira interface.

Por isso, neste momento:

``` text
main.jsx
   ↓
inicia a aplicação
   ↓
App.jsx
   ↓
contém nossa interface
```

Posteriormente aprenderemos a dividir a aplicação em vários componentes.

Por exemplo:

``` text
src/
│
├── components/
│   ├── Menu.jsx
│   ├── TabelaAlunos.jsx
│   └── FormularioAluno.jsx
│
├── pages/
│   ├── Alunos.jsx
│   └── Professores.jsx
│
└── App.jsx
```

Mas ainda não precisamos dessa complexidade.

------------------------------------------------------------------------

# 22. ▶️ Executando o projeto manualmente

Se o projeto ainda não estiver executando, entre na pasta:

``` powershell
cd C:\Users\SEU_USUARIO\Desktop\projeto\frontend
```

Depois execute:

``` powershell
npm install
```

## O que `npm install` faz?

O comando lê o arquivo:

``` text
package.json
```

e instala as dependências necessárias dentro de:

``` text
node_modules
```

Depois execute:

``` powershell
npm run dev
```

------------------------------------------------------------------------

# 23. ▶️ O que significa `npm run dev`?

O arquivo `package.json` possui scripts do projeto.

Um deles normalmente é:

``` json
"scripts": {
    "dev": "vite"
}
```

Quando executamos:

``` powershell
npm run dev
```

estamos dizendo:

> npm, execute o script chamado `dev`.

O script executa o Vite.

O Vite inicia um servidor de desenvolvimento local.

Por isso aparecerá algo semelhante a:

``` text
VITE v8.x.x ready

➜ Local: http://localhost:5173/
```

------------------------------------------------------------------------

# 24. 🌐 Abrindo a aplicação

Abra o navegador e acesse:

``` text
http://localhost:5173/
```

Se aparecer a página inicial do Vite/React:

✅ O React está funcionando.

------------------------------------------------------------------------

# 25. ⚠️ Possíveis problemas no `npm install`

Pode aparecer:

``` text
npm is not recognized
```

### Possível causa

O Node.js não está instalado corretamente ou não foi adicionado ao PATH.

### Solução

Verifique:

``` powershell
node --version
```

Se o Node funcionar, tente:

``` powershell
npm.cmd --version
```

Se ainda houver problemas, reinicie o terminal.

------------------------------------------------------------------------

# 26. ⚠️ Possíveis problemas no `npm run dev`

Pode aparecer:

``` text
Missing script: "dev"
```

### Possível causa

Você provavelmente não está dentro da pasta correta.

Verifique:

``` powershell
pwd
```

Você deve estar dentro da pasta:

``` text
frontend
```

Depois execute:

``` powershell
npm run dev
```

------------------------------------------------------------------------

# 27. ⚠️ A porta 5173 já está sendo utilizada

Se outro programa já estiver usando a porta 5173, o Vite poderá escolher
outra porta, como:

``` text
http://localhost:5174/
```

Nesse caso, utilize o endereço apresentado pelo próprio terminal.

Não é necessário alterar nada inicialmente.

------------------------------------------------------------------------

# 28. ⚠️ `localhost:5173` não abre

Verifique se o terminal ainda está executando:

``` text
npm run dev
```

O terminal deve apresentar algo semelhante a:

``` text
Local: http://localhost:5173/
```

Se você fechou o terminal, o servidor foi encerrado.

Entre novamente na pasta:

``` powershell
cd C:\Users\SEU_USUARIO\Desktop\projeto\frontend
```

e execute:

``` powershell
npm run dev
```

------------------------------------------------------------------------

# 29. 🧪 Primeiro teste do React

Abra:

``` text
src/App.jsx
```

Substitua o conteúdo pelo código:

``` jsx
function App() {
  return (
    <div>
      <h1>Meu primeiro projeto React</h1>

      <p>
        React está funcionando corretamente!
      </p>

      <button>
        Testar React
      </button>
    </div>
  )
}

export default App
```

Salve o arquivo com:

``` text
Ctrl + S
```

Volte para:

``` text
http://localhost:5173/
```

A página deverá mostrar:

``` text
Meu primeiro projeto React

React está funcionando corretamente!

[ Testar React ]
```

------------------------------------------------------------------------

# 30. 🧠 Entendendo o primeiro código

Agora vamos analisar o código.

## `function App()`

``` jsx
function App() {
```

Estamos criando uma função chamada `App`.

No React, componentes podem ser criados utilizando funções.

Neste caso:

``` text
App
```

é o nome do nosso componente.

------------------------------------------------------------------------

## `return`

``` jsx
return (
```

O `return` informa o que o componente deverá apresentar na interface.

------------------------------------------------------------------------

## `<div>`

``` jsx
<div>
```

É um elemento HTML utilizado para agrupar outros elementos.

------------------------------------------------------------------------

## `<h1>`

``` jsx
<h1>Meu primeiro projeto React</h1>
```

Cria um título.

Observe que estamos utilizando HTML dentro do código do componente.

Essa sintaxe é chamada de **JSX**.

------------------------------------------------------------------------

# 31. 🧩 O que é JSX?

JSX permite escrever uma sintaxe semelhante ao HTML dentro dos
componentes React.

Por exemplo:

``` jsx
<h1>Olá!</h1>
```

e:

``` jsx
<button>Clique aqui</button>
```

Isso facilita a construção da interface.

O JSX não é exatamente HTML puro. Ele é uma sintaxe utilizada pelo React
que será transformada para JavaScript durante o processo de construção
da aplicação.

------------------------------------------------------------------------

# 32. `<p>`

``` jsx
<p>
  React está funcionando corretamente!
</p>
```

Cria um parágrafo.

------------------------------------------------------------------------

# 33. `<button>`

``` jsx
<button>
  Testar React
</button>
```

Cria um botão.

Neste primeiro teste o botão ainda não possui uma ação.

Ele serve apenas para verificarmos se conseguimos criar elementos na
interface.

------------------------------------------------------------------------

# 34. `export default App`

``` jsx
export default App
```

Permite que o componente `App` seja utilizado em outro arquivo.

É justamente isso que acontece no:

``` text
main.jsx
```

que importa:

``` jsx
import App from './App.jsx'
```

Assim temos:

``` text
main.jsx
   │
   │ importa
   ▼
App.jsx
   │
   │ fornece
   ▼
App
```

------------------------------------------------------------------------

# 35. 🖱️ Segundo teste: interação

Agora vamos verificar se o React consegue modificar informações na tela.

Substitua novamente o conteúdo de `App.jsx` por:

``` jsx
import { useState } from "react"

function App() {

  const [contador, setContador] = useState(0)

  return (
    <div>
      <h1>Teste do React</h1>

      <p>Valor do contador: {contador}</p>

      <button onClick={() => setContador(contador + 1)}>
        Incrementar
      </button>
    </div>
  )
}

export default App
```

Salve o arquivo.

------------------------------------------------------------------------

# 36. 🧠 Entendendo o segundo código

## `import { useState }`

``` jsx
import { useState } from "react"
```

Estamos importando uma funcionalidade do React chamada:

``` text
useState
```

Ela permite criar e controlar um estado dentro do componente.

------------------------------------------------------------------------

# 37. Criando o contador

``` jsx
const [contador, setContador] = useState(0)
```

Essa linha é muito importante.

Temos duas variáveis:

``` text
contador
```

e:

``` text
setContador
```

Podemos interpretar assim:

``` text
contador
    ↓
valor atual

setContador
    ↓
função utilizada para alterar o valor
```

O:

``` jsx
useState(0)
```

define o valor inicial como:

``` text
0
```

Portanto:

``` text
contador = 0
```

inicialmente.

------------------------------------------------------------------------

# 38. Mostrando o contador

Temos:

``` jsx
<p>Valor do contador: {contador}</p>
```

As chaves:

``` text
{contador}
```

permitem inserir o valor JavaScript dentro do JSX.

Quando:

``` text
contador = 0
```

vemos:

``` text
Valor do contador: 0
```

Quando:

``` text
contador = 1
```

vemos:

``` text
Valor do contador: 1
```

------------------------------------------------------------------------

# 39. O evento `onClick`

Temos:

``` jsx
<button onClick={() => setContador(contador + 1)}>
```

O:

``` text
onClick
```

representa um evento de clique.

Quando o usuário clicar no botão:

``` text
setContador(contador + 1)
```

será executado.

Se o contador for:

``` text
0
```

ele passará para:

``` text
1
```

Depois:

``` text
2
```

Depois:

``` text
3
```

e assim por diante.

------------------------------------------------------------------------

# 40. 🧪 Teste final

No navegador:

``` text
http://localhost:5173/
```

deverá aparecer:

``` text
Teste do React

Valor do contador: 0

[ Incrementar ]
```

Clique no botão.

O valor deverá mudar:

``` text
Valor do contador: 1
```

Clique novamente:

``` text
Valor do contador: 2
```

Se isso acontecer, conseguimos comprovar que:

-   React está instalado;
-   Vite está funcionando;
-   JSX está funcionando;
-   componentes estão funcionando;
-   eventos estão funcionando;
-   `useState` está funcionando;
-   a página é atualizada quando o estado muda.

------------------------------------------------------------------------

# 41. 🎯 Por que fizemos todos esses testes?

Porque antes de conectar o React ao FastAPI precisamos ter certeza de
que o Front-end está funcionando sozinho.

A sequência de aprendizado será:

``` text
ETAPA 1
Node.js
   ↓
npm
   ↓
Vite
   ↓
React
```

Depois:

``` text
ETAPA 2
React
   ↓
Componentes
   ↓
Eventos
   ↓
Estado
   ↓
Formulários
```

Depois:

``` text
ETAPA 3
React
   ↓
Fetch API
   ↓
Requisições HTTP
   ↓
JSON
```

E finalmente:

``` text
ETAPA 4

React
   │
   │ HTTP / JSON
   ▼
FastAPI
   │
   │ SQL
   ▼
MySQL
```

------------------------------------------------------------------------

# 42. 🚀 Próxima etapa: React + FastAPI

Depois que todos os alunos estiverem com o ambiente funcionando,
iniciaremos a integração com o projeto de Gestão Escolar.

A aplicação ficará aproximadamente assim:

``` text
┌─────────────────────────────┐
│          REACT              │
│        FRONT-END            │
│                             │
│  Alunos                     │
│  Professores                │
│  Funcionários               │
│  Formulários                │
│  Tabelas                    │
└──────────────┬──────────────┘
               │
               │ HTTP
               │ JSON
               ▼
┌─────────────────────────────┐
│          FASTAPI            │
│          BACK-END           │
│                             │
│ GET    /alunos              │
│ POST   /alunos              │
│ PUT    /alunos/{id}         │
│ DELETE /alunos/{id}         │
└──────────────┬──────────────┘
               │
               │ SQL
               ▼
┌─────────────────────────────┐
│           MYSQL             │
│          BANCO DE            │
│           DADOS             │
└─────────────────────────────┘
```

O objetivo será fazer com que o usuário interaja com o **React**,
enquanto o React se comunica com a API **FastAPI**, que continuará
responsável pelo acesso ao banco de dados.

------------------------------------------------------------------------

# 43. 📋 Checklist do aluno

Antes de considerar esta atividade concluída, confirme:

-   [ ] Node.js instalado;
-   [ ] `node --version` funcionando;
-   [ ] `npm --version` funcionando;
-   [ ] Git instalado;
-   [ ] Projeto React criado;
-   [ ] Dependências instaladas;
-   [ ] `npm run dev` funcionando;
-   [ ] `http://localhost:5173/` abriu;
-   [ ] `App.jsx` foi alterado;
-   [ ] Primeira mensagem apareceu no navegador;
-   [ ] Botão foi criado;
-   [ ] Contador foi implementado;
-   [ ] Botão incrementou o contador;
-   [ ] Teste realizado em casa;
-   [ ] Teste realizado na escola/FATEC.

------------------------------------------------------------------------

# 44. 📌 Importante

Não basta instalar os programas.

O objetivo desta atividade é **testar todo o ambiente**.

Se algum comando apresentar erro:

1.  Leia a mensagem apresentada pelo terminal;
2.  Não apague arquivos aleatoriamente;
3.  Anote o erro;
4.  Faça uma pesquisa pela mensagem exata;
5.  Tente identificar a causa;
6.  Se não conseguir solucionar, leve a mensagem de erro para a aula.

Uma mensagem de erro é uma informação importante para descobrir o que
está acontecendo.

------------------------------------------------------------------------

# 45. 🏁 Resultado esperado

Ao finalizar esta atividade, o aluno deverá possuir uma estrutura
semelhante a:

``` text
Desktop/
│
└── projeto/
    │
    └── frontend/
        │
        ├── node_modules/
        ├── public/
        ├── src/
        │   ├── assets/
        │   ├── App.jsx
        │   ├── main.jsx
        │   └── index.css
        │
        ├── package.json
        └── vite.config.js
```

E deverá conseguir executar:

``` powershell
cd C:\Users\SEU_USUARIO\Desktop\projeto\frontend
```

``` powershell
npm run dev
```

e acessar:

``` text
http://localhost:5173/
```

------------------------------------------------------------------------

# 🎓 Conclusão

Nesta atividade não estamos ainda desenvolvendo o sistema completo.

Estamos preparando e validando o ambiente de desenvolvimento.

O mais importante é compreender a função de cada tecnologia:

``` text
Node.js
   ↓
permite executar o ambiente JavaScript

npm
   ↓
gerencia pacotes e dependências

Vite
   ↓
cria e executa o ambiente de desenvolvimento

React
   ↓
constrói a interface do usuário

FastAPI
   ↓
fornece a API e as regras do Back-end

MySQL
   ↓
armazena os dados
```

A partir daqui, iniciaremos uma nova etapa:

> **Fazer o React "conversar" com a aplicação FastAPI que já
> desenvolvemos.**

O primeiro objetivo será consumir uma rota da API, como:

``` text
GET /alunos
```

e apresentar os dados retornados pelo FastAPI dentro de uma tela React.

Assim começaremos a construir, de forma prática, uma aplicação completa
com:

**Front-end + API + Banco de Dados.**

------------------------------------------------------------------------

**Material didático --- FATEC / Técnicas Avançadas de Programação Web e
Mobile**

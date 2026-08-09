# Capítulo Temporário — Cadastro de Alunos do Projeto Escola

> **Versão técnica complementar — comandos, arquivos e explicações**

---

## 1. Objetivo

Este documento registra a primeira versão funcional do módulo de **cadastro de alunos**.

Ele foi produzido durante a construção prática do projeto e será posteriormente revisado para se transformar em um capítulo definitivo do livro.

---

## 2. Estrutura do Projeto

A estrutura inicial do projeto será organizada da seguinte forma:

```text
cadastro-alunos/
├── backend/
│   ├── main.py
│   ├── database.py
│   └── schemas.py
├── frontend/
│   ├── index.html
│   └── js/
│       └── app.js
├── venv/
└── .env
```

### Descrição dos principais diretórios e arquivos

| Diretório/Arquivo | Função |
|---|---|
| `backend/` | Contém os arquivos responsáveis pela API e pelo acesso ao banco de dados. |
| `main.py` | Arquivo principal da aplicação FastAPI. |
| `database.py` | Responsável pela conexão com o banco de dados MySQL. |
| `schemas.py` | Define os modelos e validações dos dados recebidos pela API. |
| `frontend/` | Contém os arquivos responsáveis pela interface da aplicação. |
| `index.html` | Página principal do sistema. |
| `js/app.js` | Código JavaScript responsável pela comunicação com a API e pelas interações da página. |
| `venv/` | Ambiente virtual Python do projeto. |
| `.env` | Arquivo utilizado para armazenar configurações e variáveis de ambiente. |

---

## 3. Criar o Projeto e o Ambiente Virtual

No **Prompt de Comando (CMD)**, execute:

```cmd
mkdir cadastro-alunos
cd cadastro-alunos
python -m venv venv
venv\Scripts\activate
```

### O que cada comando faz?

| Comando | Descrição |
|---|---|
| `mkdir cadastro-alunos` | Cria a pasta do projeto. |
| `cd cadastro-alunos` | Entra na pasta criada. |
| `python -m venv venv` | Cria um ambiente virtual Python chamado `venv`. |
| `venv\Scripts\activate` | Ativa o ambiente virtual. |

O **`venv`** mantém as dependências do projeto isoladas do Python instalado globalmente no computador.

Isso evita conflitos entre versões e bibliotecas utilizadas por diferentes projetos.

---

## 4. Instalar as Dependências

Com o ambiente virtual ativado, execute:

```cmd
pip install fastapi uvicorn mysql-connector-python python-dotenv email-validator
```

### Principais dependências

| Biblioteca | Função |
|---|---|
| `fastapi` | Framework utilizado para criar a API. |
| `uvicorn` | Servidor responsável por executar a aplicação FastAPI. |
| `mysql-connector-python` | Permite que o Python se conecte ao banco de dados MySQL. |
| `python-dotenv` | Permite carregar configurações armazenadas no arquivo `.env`. |
| `email-validator` | Permite realizar validações de endereços de e-mail utilizadas, por exemplo, pelo `EmailStr`. |

---

## 5. Criar o Banco de Dados `escola`

O banco de dados utilizado pelo projeto será chamado de `escola`.

No MySQL, execute:

```sql
CREATE DATABASE escola;

USE escola;
```

O banco recebeu o nome **`escola`** para permitir que o projeto cresça posteriormente com outras tabelas e funcionalidades relacionadas ao ambiente escolar.

Por exemplo, futuramente poderão ser adicionadas tabelas como:

- `alunos`
- `professores`
- `cursos`
- `disciplinas`
- `turmas`
- `matriculas`
- `notas`

---

## 6. Criar a Tabela `alunos`

Depois de selecionar o banco de dados `escola`, execute:

```sql
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL,
    data_nascimento DATE NOT NULL,
    curso VARCHAR(100) NOT NULL
);
```

### Estrutura da tabela

| Campo | Tipo | Restrição | Descrição |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Identificador único do aluno. |
| `nome` | `VARCHAR(100)` | `NOT NULL` | Nome completo do aluno. |
| `cpf` | `VARCHAR(14)` | `NOT NULL`, `UNIQUE` | CPF do aluno. |
| `email` | `VARCHAR(150)` | `NOT NULL` | Endereço de e-mail do aluno. |
| `data_nascimento` | `DATE` | `NOT NULL` | Data de nascimento do aluno. |
| `curso` | `VARCHAR(100)` | `NOT NULL` | Curso no qual o aluno está matriculado. |

### Principais restrições utilizadas

#### `PRIMARY KEY`

A `PRIMARY KEY` identifica unicamente cada registro da tabela.

Neste projeto, o campo:

```sql
id INT AUTO_INCREMENT PRIMARY KEY
```

será utilizado como identificador único de cada aluno.

---

#### `AUTO_INCREMENT`

O `AUTO_INCREMENT` faz com que o MySQL gere automaticamente um novo número para o campo `id`.

Por exemplo:

```text
1 → João
2 → Maria
3 → Carlos
4 → Ana
```

Dessa forma, não é necessário informar manualmente o ID ao cadastrar um novo aluno.

---

#### `NOT NULL`

A restrição `NOT NULL` determina que o campo deve obrigatoriamente receber um valor.

Por exemplo:

```sql
nome VARCHAR(100) NOT NULL
```

significa que não será permitido cadastrar um aluno sem informar o nome.

---

#### `UNIQUE`

A restrição `UNIQUE` impede que determinado valor seja repetido na tabela.

Neste projeto:

```sql
cpf VARCHAR(14) NOT NULL UNIQUE
```

garante que dois alunos não possam ser cadastrados utilizando o mesmo CPF.

---

## 7. Configurar o Arquivo `.env`

Na raiz do projeto, crie um arquivo chamado:

```text
.env
```

O conteúdo inicial será:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=escola
```

### Função das variáveis

| Variável | Valor | Função |
|---|---|---|
| `DB_HOST` | `localhost` | Indica onde o servidor MySQL está sendo executado. |
| `DB_USER` | `root` | Usuário utilizado para acessar o MySQL. |
| `DB_PASSWORD` | vazio | Senha do usuário do banco de dados. |
| `DB_NAME` | `escola` | Nome do banco de dados utilizado pela aplicação. |

Neste ambiente local, utilizando o **XAMPP**, o usuário padrão do MySQL normalmente é `root` e pode estar configurado sem senha.

> **Atenção:** essa configuração não deve ser utilizada dessa forma em um ambiente de produção.

O arquivo `.env` pode conter informações sensíveis, como:

- senhas;
- usuários;
- chaves de API;
- tokens;
- informações de conexão;
- configurações específicas do ambiente.

Por esse motivo, o arquivo `.env` **não deve ser publicado no GitHub**.

### Adicionar o `.env` ao `.gitignore`

Recomenda-se criar também um arquivo:

```text
.gitignore
```

com o seguinte conteúdo:

```gitignore
venv/
.env
__pycache__/
*.pyc
```

Dessa forma, o Git não irá enviar essas informações para o repositório.

---

## 8. Próximas Etapas

Com o banco de dados criado e o ambiente Python configurado, o próximo passo será desenvolver a API utilizando **FastAPI**.

A implementação será dividida nos seguintes arquivos:

```text
backend/
├── main.py
├── database.py
└── schemas.py
```

Posteriormente será criada a interface web:

```text
frontend/
├── index.html
└── js/
    └── app.js
```

A aplicação permitirá realizar as principais operações de um **CRUD de alunos**:

- **Create** — cadastrar alunos;
- **Read** — consultar alunos;
- **Update** — atualizar alunos;
- **Delete** — excluir alunos.

A comunicação entre o frontend e o backend será realizada por meio de uma **API REST desenvolvida com FastAPI**.

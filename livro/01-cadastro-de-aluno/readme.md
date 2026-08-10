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

## 8. `backend/database.py`

O arquivo `database.py` será responsável por centralizar a conexão da aplicação com o banco de dados MySQL.

### Código

```python
import os

import mysql.connector
from dotenv import load_dotenv

load_dotenv()


def criar_conexao():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )


if __name__ == "__main__":
    conexao = criar_conexao()

    if conexao.is_connected():
        print("Conexão realizada com sucesso!")

    conexao.close()
```

### Explicação do código

#### Importação do módulo `os`

```python
import os
```

O módulo `os` permite acessar recursos e configurações do sistema operacional.

Neste projeto, ele será utilizado para recuperar as variáveis armazenadas no arquivo `.env`.

#### Importação do `mysql.connector`

```python
import mysql.connector
```

O `mysql.connector` fornece os recursos necessários para que a aplicação Python consiga estabelecer uma conexão com o MySQL.

#### Importação do `load_dotenv`

```python
from dotenv import load_dotenv
```

A função `load_dotenv()` pertence à biblioteca `python-dotenv`.

Ela permite carregar as variáveis armazenadas no arquivo `.env` para o ambiente da aplicação.

#### Carregando o arquivo `.env`

```python
load_dotenv()
```

Quando essa função é executada, as configurações definidas no arquivo `.env` ficam disponíveis para serem recuperadas utilizando `os.getenv()`.

Por exemplo:

```python
os.getenv("DB_HOST")
os.getenv("DB_USER")
os.getenv("DB_PASSWORD")
os.getenv("DB_NAME")
```

### Função `criar_conexao()`

```python
def criar_conexao():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )
```

A função `criar_conexao()` centraliza a abertura da conexão com o banco de dados.

Em vez de repetir toda a configuração de conexão em diferentes arquivos, podemos utilizar:

```python
conexao = criar_conexao()
```

Isso melhora a organização e facilita futuras alterações na configuração do banco.

### Parâmetros da conexão

| Parâmetro | Origem | Função |
|---|---|---|
| `host` | `DB_HOST` | Define o endereço do servidor MySQL. |
| `user` | `DB_USER` | Define o usuário utilizado para acessar o banco. |
| `password` | `DB_PASSWORD` | Define a senha do usuário. |
| `database` | `DB_NAME` | Define qual banco de dados será utilizado. |

### Testando a conexão

O trecho:

```python
if __name__ == "__main__":
    conexao = criar_conexao()

    if conexao.is_connected():
        print("Conexão realizada com sucesso!")

    conexao.close()
```

permite executar o arquivo diretamente para verificar se a conexão com o MySQL está funcionando.

No terminal, a partir da raiz do projeto, execute:

```cmd
python backend/database.py
```

Se a conexão estiver funcionando corretamente, será apresentada:

```text
Conexão realizada com sucesso!
```

Ao final do teste, a conexão é encerrada com:

```python
conexao.close()
```

Conexões com o banco de dados consomem recursos. Por isso, sempre que uma conexão não for mais necessária, ela deve ser encerrada.

---

## 9. `backend/schemas.py`

O arquivo `schemas.py` será responsável por definir os modelos utilizados para validar os dados recebidos e enviados pela API.

### Código

```python
from datetime import date

from pydantic import BaseModel, EmailStr


class AlunoCreate(BaseModel):
    nome: str
    cpf: str
    email: EmailStr
    data_nascimento: date
    curso: str


class AlunoResponse(BaseModel):
    id: int
    nome: str
    cpf: str
    email: EmailStr
    data_nascimento: date
    curso: str
```

### Importação de `date`

```python
from datetime import date
```

A classe `date` permite representar datas no Python.

Neste projeto, ela será utilizada para representar a data de nascimento do aluno.

### Importação do Pydantic

```python
from pydantic import BaseModel, EmailStr
```

O **Pydantic** é utilizado pelo FastAPI para validação e conversão dos dados recebidos pela API.

O `BaseModel` será utilizado como base para a criação dos modelos.

O `EmailStr` será utilizado para validar endereços de e-mail.

### Modelo `AlunoCreate`

```python
class AlunoCreate(BaseModel):
    nome: str
    cpf: str
    email: EmailStr
    data_nascimento: date
    curso: str
```

O modelo `AlunoCreate` representa os dados necessários para cadastrar um novo aluno.

A API espera receber informações como:

```json
{
    "nome": "Maria Silva",
    "cpf": "123.456.789-00",
    "email": "maria@email.com",
    "data_nascimento": "2005-08-15",
    "curso": "Desenvolvimento de Sistemas"
}
```

O campo `id` não aparece nesse modelo porque o ID será gerado automaticamente pelo banco de dados.

### Modelo `AlunoResponse`

```python
class AlunoResponse(BaseModel):
    id: int
    nome: str
    cpf: str
    email: EmailStr
    data_nascimento: date
    curso: str
```

O modelo `AlunoResponse` representa os dados que serão devolvidos pela API.

Neste caso, o campo `id` também faz parte da resposta, pois ele já terá sido criado pelo banco de dados.

### Diferença entre `AlunoCreate` e `AlunoResponse`

| Modelo | Utilização |
|---|---|
| `AlunoCreate` | Representa os dados recebidos durante o cadastro. |
| `AlunoResponse` | Representa os dados devolvidos pela API. |

O fluxo pode ser visualizado assim:

```text
Frontend
   │
   │ Dados do aluno
   ▼
AlunoCreate
   │
   │ Validação
   ▼
Banco de Dados
   │
   │ Registro criado
   ▼
AlunoResponse
   │
   ▼
Frontend
```

### Validação do e-mail

Ao utilizar:

```python
email: EmailStr
```

o Pydantic verifica se o valor informado possui um formato válido de endereço de e-mail.

Por exemplo:

```text
maria@email.com
```

é considerado um formato válido.

Já:

```text
maria
```

não atende ao formato esperado.

### Validação da data

O campo:

```python
data_nascimento: date
```

informa ao Pydantic que o valor deverá representar uma data.

Uma data enviada pela API no formato:

```text
2005-08-15
```

poderá ser convertida para um objeto `date` no Python.

---

## 10. `backend/main.py`

O arquivo `main.py` é o **núcleo da API**.

É nele que serão definidas:

- a aplicação FastAPI;
- as rotas;
- a comunicação com o banco de dados;
- o acesso ao frontend;
- o cadastro de alunos;
- a consulta de alunos;
- o tratamento de erros.

### Código

```python
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from mysql.connector import IntegrityError

from database import criar_conexao
from schemas import AlunoCreate, AlunoResponse


app = FastAPI()


BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"


app.mount(
    "/frontend",
    StaticFiles(directory=FRONTEND_DIR),
    name="frontend"
)


@app.get("/", include_in_schema=False)
def pagina_inicial():
    return FileResponse(FRONTEND_DIR / "index.html")


@app.get("/alunos", response_model=list[AlunoResponse])
def listar_alunos():
    conexao = criar_conexao()
    cursor = conexao.cursor()

    cursor.execute("SELECT * FROM alunos")
    registros = cursor.fetchall()

    cursor.close()
    conexao.close()

    alunos = []

    for registro in registros:
        alunos.append({
            "id": registro[0],
            "nome": registro[1],
            "cpf": registro[2],
            "email": registro[3],
            "data_nascimento": registro[4],
            "curso": registro[5]
        })

    return alunos


@app.post("/alunos", response_model=AlunoResponse)
def cadastrar_aluno(aluno: AlunoCreate):
    conexao = criar_conexao()
    cursor = conexao.cursor()

    sql = '''
        INSERT INTO alunos
        (nome, cpf, email, data_nascimento, curso)
        VALUES (%s, %s, %s, %s, %s)
    '''

    valores = (
        aluno.nome,
        aluno.cpf,
        aluno.email,
        aluno.data_nascimento,
        aluno.curso
    )

    try:
        cursor.execute(sql, valores)
        conexao.commit()

        return {
            "id": cursor.lastrowid,
            "nome": aluno.nome,
            "cpf": aluno.cpf,
            "email": aluno.email,
            "data_nascimento": aluno.data_nascimento,
            "curso": aluno.curso
        }

    except IntegrityError as erro:
        conexao.rollback()

        if erro.errno == 1062:
            raise HTTPException(
                status_code=409,
                detail="CPF já cadastrado."
            )

        raise HTTPException(
            status_code=500,
            detail="Erro de integridade no banco de dados."
        )

    finally:
        cursor.close()
        conexao.close()
```

### 10.1 Criando a aplicação FastAPI

```python
app = FastAPI()
```

Essa linha cria a aplicação FastAPI.

O objeto `app` será utilizado para registrar as rotas da API.

### 10.2 Trabalhando com caminhos de arquivos

```python
BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"
```

O módulo `pathlib` facilita o trabalho com caminhos de arquivos e diretórios.

A variável especial:

```python
__file__
```

representa o caminho do arquivo Python que está sendo executado.

Como `main.py` está dentro de `backend`, utilizamos:

```python
Path(__file__).resolve().parent.parent
```

para chegar à raiz do projeto.

Considerando:

```text
cadastro-alunos/
├── backend/
│   └── main.py
└── frontend/
    └── index.html
```

`BASE_DIR` apontará para:

```text
cadastro-alunos/
```

E:

```python
FRONTEND_DIR = BASE_DIR / "frontend"
```

apontará para:

```text
cadastro-alunos/frontend/
```

### 10.3 Disponibilizando arquivos estáticos

```python
app.mount(
    "/frontend",
    StaticFiles(directory=FRONTEND_DIR),
    name="frontend"
)
```

O `StaticFiles` permite que o FastAPI disponibilize arquivos estáticos do frontend, como:

- HTML;
- JavaScript;
- CSS;
- imagens;
- outros arquivos estáticos.

### 10.4 Rota inicial `/`

```python
@app.get("/", include_in_schema=False)
def pagina_inicial():
    return FileResponse(FRONTEND_DIR / "index.html")
```

Essa rota será executada quando o usuário acessar:

```text
http://127.0.0.1:8000/
```

A função `pagina_inicial()` retorna:

```text
frontend/index.html
```

O `FileResponse` é responsável por enviar o arquivo para o navegador.

O parâmetro:

```python
include_in_schema=False
```

faz com que essa rota não seja exibida na documentação automática da API.

---

## 10.5 Rota `GET /alunos`

A rota:

```python
@app.get("/alunos", response_model=list[AlunoResponse])
```

é utilizada para consultar os alunos cadastrados.

O método HTTP utilizado é:

```text
GET
```

### Consulta no banco

```python
cursor.execute("SELECT * FROM alunos")
registros = cursor.fetchall()
```

O comando SQL:

```sql
SELECT * FROM alunos
```

solicita todos os registros existentes na tabela `alunos`.

O método:

```python
fetchall()
```

recupera todos os registros retornados pela consulta.

### Convertendo os registros

Os dados recuperados do MySQL são organizados em uma lista de dicionários:

```python
alunos = []

for registro in registros:
    alunos.append({
        "id": registro[0],
        "nome": registro[1],
        "cpf": registro[2],
        "email": registro[3],
        "data_nascimento": registro[4],
        "curso": registro[5]
    })
```

A posição de cada valor corresponde à ordem das colunas na tabela:

```text
registro[0] → id
registro[1] → nome
registro[2] → cpf
registro[3] → email
registro[4] → data_nascimento
registro[5] → curso
```

O resultado será semelhante a:

```json
[
    {
        "id": 1,
        "nome": "Maria Silva",
        "cpf": "123.456.789-00",
        "email": "maria@email.com",
        "data_nascimento": "2005-08-15",
        "curso": "Desenvolvimento de Sistemas"
    }
]
```

---

## 10.6 Rota `POST /alunos`

A rota:

```python
@app.post("/alunos", response_model=AlunoResponse)
```

é utilizada para cadastrar um novo aluno.

O método HTTP utilizado é:

```text
POST
```

A função recebe:

```python
aluno: AlunoCreate
```

Isso significa que os dados recebidos serão validados de acordo com o modelo `AlunoCreate`.

### Comando `INSERT`

O comando SQL utilizado para cadastrar o aluno é:

```python
sql = '''
    INSERT INTO alunos
    (nome, cpf, email, data_nascimento, curso)
    VALUES (%s, %s, %s, %s, %s)
'''
```

Os valores são enviados separadamente:

```python
valores = (
    aluno.nome,
    aluno.cpf,
    aluno.email,
    aluno.data_nascimento,
    aluno.curso
)
```

E então executados:

```python
cursor.execute(sql, valores)
```

Essa abordagem permite utilizar parâmetros na consulta em vez de concatenar diretamente os valores recebidos pelo usuário.

### Confirmando a operação com `commit()`

Depois da execução do `INSERT`, é necessário confirmar a alteração:

```python
conexao.commit()
```

O `commit()` confirma a transação no banco de dados.

### Recuperando o ID criado

Depois do cadastro:

```python
cursor.lastrowid
```

permite recuperar o ID gerado automaticamente pelo MySQL.

Por exemplo, se o banco criou:

```text
id = 15
```

então:

```python
cursor.lastrowid
```

será:

```text
15
```

Esse valor será utilizado na resposta da API.

---

## 10.7 Tratamento de erros com `try`, `except` e `finally`

O cadastro utiliza:

```python
try:
    ...
except IntegrityError as erro:
    ...
finally:
    ...
```

| Bloco | Função |
|---|---|
| `try` | Executa o código que pode gerar um erro. |
| `except` | Trata um erro que tenha ocorrido. |
| `finally` | Executa o código que deve acontecer independentemente do resultado. |

---

## 10.8 Erro de CPF duplicado

A tabela possui:

```sql
cpf VARCHAR(14) NOT NULL UNIQUE
```

Portanto, não é permitido cadastrar dois alunos com o mesmo CPF.

Quando o MySQL identifica essa violação, o `mysql.connector` pode gerar um `IntegrityError`.

O código verifica:

```python
if erro.errno == 1062:
```

O código `1062` corresponde à tentativa de inserir um valor duplicado em uma chave ou índice com restrição de unicidade.

Nesse caso, a API retorna:

```python
raise HTTPException(
    status_code=409,
    detail="CPF já cadastrado."
)
```

O código HTTP:

```text
409 Conflict
```

indica que a requisição não pode ser concluída devido a um conflito com o estado atual dos dados.

---

## 10.9 `rollback()`

Quando ocorre um erro durante uma transação, utilizamos:

```python
conexao.rollback()
```

O `rollback()` desfaz as alterações da transação que ainda não foram confirmadas.

Isso ajuda a manter a consistência dos dados.

---

## 10.10 Outros erros de integridade

Caso ocorra outro erro de integridade diferente do CPF duplicado, a aplicação retorna:

```python
raise HTTPException(
    status_code=500,
    detail="Erro de integridade no banco de dados."
)
```

O código:

```text
500 Internal Server Error
```

indica que ocorreu um erro no processamento do servidor.

---

## 10.11 Fechando os recursos

Independentemente de ocorrer erro ou não, o bloco `finally` será executado:

```python
finally:
    cursor.close()
    conexao.close()
```

O cursor é encerrado com:

```python
cursor.close()
```

e a conexão com o banco é encerrada com:

```python
conexao.close()
```

Isso evita deixar recursos abertos desnecessariamente.

---

# 11. Resumo do funcionamento do Backend

Até este ponto, o projeto possui três arquivos principais:

```text
backend/
├── main.py
├── database.py
└── schemas.py
```

| Arquivo | Responsabilidade |
|---|---|
| `database.py` | Criar e testar a conexão com o MySQL. |
| `schemas.py` | Validar os dados de entrada e saída da API. |
| `main.py` | Criar a API, definir as rotas e executar as operações no banco. |

---

## 11.1 Fluxo do cadastro

```text
┌─────────────────────┐
│      Frontend       │
│     index.html      │
└──────────┬──────────┘
           │
           │ POST /alunos
           ▼
┌─────────────────────┐
│       FastAPI       │
│      main.py        │
└──────────┬──────────┘
           │
           │ Validação
           ▼
┌─────────────────────┐
│      Pydantic       │
│    AlunoCreate      │
└──────────┬──────────┘
           │
           │ Dados válidos
           ▼
┌─────────────────────┐
│        MySQL        │
│      alunos         │
└──────────┬──────────┘
           │
           │ Registro criado
           ▼
┌─────────────────────┐
│       FastAPI       │
│   AlunoResponse     │
└──────────┬──────────┘
           │
           │ JSON
           ▼
┌─────────────────────┐
│      Frontend       │
└─────────────────────┘
```

---

## 11.2 Fluxo da consulta

```text
Frontend
   │
   │ GET /alunos
   ▼
FastAPI
   │
   │ SELECT * FROM alunos
   ▼
MySQL
   │
   │ Registros
   ▼
FastAPI
   │
   │ AlunoResponse
   ▼
Frontend
```

---

# 12. Executando a API

Com o ambiente virtual ativado e estando na pasta raiz do projeto, execute:

```cmd
uvicorn backend.main:app --reload
```

O parâmetro:

```text
--reload
```

faz com que o servidor seja reiniciado automaticamente quando alterações forem detectadas nos arquivos do projeto.

Se tudo estiver funcionando corretamente, o terminal deverá apresentar uma mensagem semelhante a:

```text
Uvicorn running on http://127.0.0.1:8000
```

A aplicação poderá então ser acessada pelo navegador:

```text
http://127.0.0.1:8000/
```

---

## 12.1 Documentação automática do FastAPI

O FastAPI gera automaticamente uma documentação interativa da API.

A documentação Swagger pode ser acessada em:

```text
http://127.0.0.1:8000/docs
```

Também existe uma documentação alternativa:

```text
http://127.0.0.1:8000/redoc
```

Na documentação, será possível visualizar e testar as rotas:

```text
GET  /alunos
POST /alunos
```

Isso facilita bastante o desenvolvimento e os testes antes da criação completa do frontend.

---

# 13. Situação Atual do Projeto

Até aqui, o projeto possui:

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
├── .env
└── .gitignore
```

O backend já possui as seguintes funcionalidades:

- conexão com o MySQL;
- validação dos dados recebidos;
- consulta dos alunos;
- cadastro de novos alunos;
- validação do formato do e-mail;
- validação da data de nascimento;
- tratamento de CPF duplicado;
- tratamento de erros de integridade;
- retorno de respostas em JSON;
- disponibilização do frontend;
- documentação automática da API.

O próximo passo será desenvolver o **frontend**, criando o formulário HTML e o código JavaScript responsável por consumir a API FastAPI.


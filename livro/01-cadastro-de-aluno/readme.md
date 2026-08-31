# Capítulo 01 — Cadastro de Alunos do Projeto Escola

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

## 5. Criar o Banco de Dados `fatec`

O banco de dados utilizado pelo projeto será chamado de `fatec`.

No MySQL, execute:

```sql
CREATE DATABASE fatec;

USE fatec;
```

O banco recebeu o nome **`fatec`** para permitir que o projeto cresça posteriormente com outras tabelas e funcionalidades relacionadas ao ambiente escolar.

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

Depois de selecionar o banco de dados `fatec`, execute:

```sql
CREATE TABLE `alunos` (
  `codAluno` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `email` varchar(150) NOT NULL,
  `data_nascimento` date NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `ra` varchar(10) NOT NULL,
  `cidade` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `alunos`
  ADD PRIMARY KEY (`codAluno`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD UNIQUE KEY `ra` (`ra`);
```

### Estrutura da tabela

| Campo | Tipo | Restrição | Descrição |
|---|---|---|---|
| `codAluno` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Identificador único do aluno. |
| `nome` | `VARCHAR(100)` | `NOT NULL` | Nome completo do aluno. |
| `cpf` | `VARCHAR(14)` | `NOT NULL`, `UNIQUE` | CPF do aluno. |
| `email` | `VARCHAR(150)` | `NOT NULL` | Endereço de e-mail do aluno. |
| `data_nascimento` | `DATE` | `NOT NULL` | Data de nascimento do aluno. |
| `telefone` | `VARCHAR(20)` | `NOT NULL` | Telefone do aluno. |
| `ra` | `VARCHAR(10)` | `NOT NULL` | RA do aluno. |
| `cidade` | `VARCHAR(50)` | `NOT NULL` | Cidade do aluno. |

### Principais restrições utilizadas

#### `PRIMARY KEY`

A `PRIMARY KEY` identifica unicamente cada registro da tabela.

Neste projeto, o campo:

```sql
codAluno INT AUTO_INCREMENT PRIMARY KEY
```

será utilizado como identificador único de cada aluno.

---

#### `AUTO_INCREMENT`

O `AUTO_INCREMENT` faz com que o MySQL gere automaticamente um novo número para o campo `codAluno`.

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
| `DB_NAME` | `fatec` | Nome do banco de dados utilizado pela aplicação. |

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

## 9. `backend/database.py`

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

## 10. `backend/schemas.py`

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
    telefone: str
    ra: str
    cidade: str


class AlunoResponse(BaseModel):
    id: int
    nome: str
    cpf: str
    email: EmailStr
    data_nascimento: date
    telefone: str
    ra: str
    cidade: str
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
    telefone: str
    ra: str
    cidade: str
```

O modelo `AlunoCreate` representa os dados necessários para cadastrar um novo aluno.

A API espera receber informações como:

```json
{
    "nome": "Maria Silva",
    "cpf": "123.456.789-00",
    "email": "maria@email.com",
    "data_nascimento": "2005-08-15",
    "telefone": "987654",
    "ra": "123456",
    "cidade": "Mococa"
}
```

O campo `codAluno` não aparece nesse modelo porque o ID será gerado automaticamente pelo banco de dados.

### Modelo `AlunoResponse`

```python
class AlunoResponse(BaseModel):
    codAluno: int
    nome: str
    cpf: str
    email: EmailStr
    data_nascimento: date
    telefone: str
    ra: str
    cidade: str
```

O modelo `AlunoResponse` representa os dados que serão devolvidos pela API.

Neste caso, o campo `codAluno` também faz parte da resposta, pois ele já terá sido criado pelo banco de dados.

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

## 11. `backend/main.py`

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
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from mysql.connector import IntegrityError

from backend.database import criar_conexao
from backend.schemas import AlunoCreate, AlunoResponse


app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"

app.mount("/frontend", StaticFiles(directory=FRONTEND_DIR), name="frontend")


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
        aluno = {
            "codAluno": registro[0],
            "nome": registro[1],
            "cpf": registro[2],
            "email": registro[3],
            "data_nascimento": registro[4],
            "telefone": registro[5],
            "ra": registro[6],
            "cidade": registro[7]
        }

        alunos.append(aluno)

    return alunos


@app.post("/alunos", response_model=AlunoResponse)
def cadastrar_aluno(aluno: AlunoCreate):
    conexao = criar_conexao()
    cursor = conexao.cursor()

    sql = """
        INSERT INTO alunos
        (nome, cpf, email, data_nascimento, telefone, ra, cidade)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """

    valores = (
        aluno.nome,
        aluno.cpf,
        aluno.email,
        aluno.data_nascimento,
        aluno.telefone,
        aluno.ra,
        aluno.cidade
    )

    try:
        cursor.execute(sql, valores)
        conexao.commit()

        id_aluno = cursor.lastrowid

        return {
            "id": id_aluno,
            "nome": aluno.nome,
            "cpf": aluno.cpf,
            "email": aluno.email,
            "data_nascimento": aluno.data_nascimento,
            "telefone": aluno.telefone,
            "ra": aluno.ra,
            "cidade": aluno.cidade
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

### 11.1 Criando a aplicação FastAPI

```python
app = FastAPI()
```

Essa linha cria a aplicação FastAPI.

O objeto `app` será utilizado para registrar as rotas da API.

### 11.2 Trabalhando com caminhos de arquivos

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

### 11.3 Disponibilizando arquivos estáticos

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

### 11.4 Rota inicial `/`

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

## 11.5 Rota `GET /alunos`

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
        aluno = {
            "codAluno": registro[0],
            "nome": registro[1],
            "cpf": registro[2],
            "email": registro[3],
            "data_nascimento": registro[4],
            "telefone": registro[5],
            "ra": registro[6],
            "cidade": registro[7]
        }
```

A posição de cada valor corresponde à ordem das colunas na tabela:

```text
registro[0] → codAluno
registro[1] → nome
registro[2] → cpf
registro[3] → email
registro[4] → data_nascimento
registro[5] → telefone
registro[5] → ra
registro[5] → cidade
```

O resultado será semelhante a:

```json
[
    {
        "codAluno": 1,
        "nome": "Maria Silva",
        "cpf": "123.456.789-00",
        "email": "maria@email.com",
        "data_nascimento": "2005-08-15",
        "telefone": "987654",
        "ra": "123456",
        "cidade": "Mococa"
    }
]
```

---

## 11.6 Rota `POST /alunos`

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
sql = """
        INSERT INTO alunos
        (nome, cpf, email, data_nascimento, telefone, ra, cidade)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
```

Os valores são enviados separadamente:

```python
valores = (
        aluno.nome,
        aluno.cpf,
        aluno.email,
        aluno.data_nascimento,
        aluno.telefone,
        aluno.ra,
        aluno.cidade
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
codAluno = 15
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

## 11.7 Tratamento de erros com `try`, `except` e `finally`

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

## 11.8 Erro de CPF duplicado

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

## 11.9 `rollback()`

Quando ocorre um erro durante uma transação, utilizamos:

```python
conexao.rollback()
```

O `rollback()` desfaz as alterações da transação que ainda não foram confirmadas.

Isso ajuda a manter a consistência dos dados.

---

## 11.10 Outros erros de integridade

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

## 11.11 Fechando os recursos

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

# 12. Resumo do funcionamento do Backend

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

## 12.1 Fluxo do cadastro

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

## 12.2 Fluxo da consulta

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

# 13. Executando a API

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

## 13.1 Documentação automática do FastAPI

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

# 14. Situação Atual do Projeto

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



## 15. `frontend/index.html`

O arquivo `index.html` será a página inicial do sistema.

Nesta primeira versão, ele contém o formulário de cadastro de alunos.

### Código inicial

```html
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Cadastro de Alunos</title>
</head>

<body>

    <h1>Cadastro de Alunos</h1>

    <form id="form-aluno">

    <div>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required>
    </div>

    <div>
        <label for="cpf">CPF:</label>
        <input type="text" id="cpf" name="cpf" required>
    </div>

    <div>
        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email" required>
    </div>

    <div>
        <label for="data_nascimento">Data de nascimento:</label>
        <input type="date" id="data_nascimento" name="data_nascimento" required>
    </div>

    <div>
        <label for="telefone">Telefone:</label>
        <input type="text" id="telefone" name="telefone" required>
    </div>

    <div>
        <label for="ra">RA:</label>
        <input type="text" id="ra" name="ra" required>
    </div>

    <div>
        <label for="cidade">Cidade:</label>
        <input type="text" id="cidade" name="cidade" required>
    </div>

    <button type="submit">Cadastrar</button>

</form>

<div id="mensagem"></div>
    <script src="/frontend/js/app.js"></script>
</body>

</html>
```

### Estrutura do formulário

O formulário utiliza:

```html
<form id="form-aluno">
```

O atributo `id` permite que o JavaScript encontre o formulário e acompanhe o evento de envio.

Cada campo possui um `label` associado ao seu respectivo `input`.

Por exemplo:

```html
<label for="nome">Nome:</label>
<input type="text" id="nome" name="nome" required>
```

O atributo `for="nome"` do `label` corresponde ao:

```html
id="nome"
```

do campo.

O atributo:

```html
required
```

faz com que o navegador exija o preenchimento do campo antes do envio do formulário.

---

## 15.1 Campo de e-mail

O campo de e-mail utiliza:

```html
<input type="email" id="email" name="email" required>
```

O tipo:

```html
type="email"
```

permite que o próprio navegador faça uma validação inicial do formato do e-mail.

Além dessa validação no frontend, o backend também possui:

```python
email: EmailStr
```

Portanto, existem duas camadas de validação:

```text
Navegador
   ↓
type="email"
   ↓
FastAPI / Pydantic
   ↓
EmailStr
   ↓
Banco de Dados
```

---

## 15.2 Elemento de mensagem

O elemento:

```html
<div id="mensagem" aria-live="polite"></div>
```

será utilizado pelo JavaScript para apresentar mensagens ao usuário.

Por exemplo:

```text
Aluno cadastrado com sucesso!
```

ou:

```text
Erro ao cadastrar aluno: CPF já cadastrado.
```

O atributo:

```html
aria-live="polite"
```

ajuda tecnologias assistivas, como leitores de tela, a identificar que o conteúdo desse elemento pode ser atualizado dinamicamente.

---

# 16. `frontend/js/app.js`

O arquivo `app.js` será responsável pela comunicação entre o frontend e a API FastAPI.

### Código

```javascript
const formulario = document.getElementById("form-aluno");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    mensagem.textContent = "";

    const aluno = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        email: document.getElementById("email").value,
        data_nascimento: document.getElementById("data_nascimento").value,
        telefone: document.getElementById("telefone").value,
        ra: document.getElementById("ra").value,
        cidade: document.getElementById("cidade").value
    };

    try {

        const resposta = await fetch("/alunos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)
        });

        const resultado = await resposta.json();

        if (resposta.ok) {

            mensagem.textContent = "Aluno cadastrado com sucesso!";

            formulario.reset();

            console.log("Aluno cadastrado:", resultado);

        } else {

            mensagem.textContent = "Erro ao cadastrar aluno: " + obterMensagemErro(resultado);

            console.error("Erro da API:", resultado);
        }

    } catch (erro) {

        mensagem.textContent = "Não foi possível conectar ao servidor.";

        console.error("Erro de conexão:", erro);
    }
});


function obterMensagemErro(resultado) {

    if (!resultado.detail) {
        return "Dados inválidos.";
    }

    if (Array.isArray(resultado.detail)) {

        return resultado.detail
            .map(erro => {

                const campo = erro.loc?.[1];

                if (campo === "email") {
                    return "E-mail inválido.";
                }

                if (campo === "nome") {
                    return "Nome inválido.";
                }

                if (campo === "cpf") {
                    return "CPF inválido.";
                }

                if (campo === "data_nascimento") {
                    return "Data de nascimento inválida.";
                }
                
                if (campo === "telefone") {
                    return "Telefone inválido.";
                }

                if (campo === "ra") {
                    return "RA inválido.";
                }

                if (campo === "cidade") {
                    return "Cidade inválida.";
                }

                return erro.msg;
            })
            .join(" ");
    }

    return resultado.detail;
}
```

---

## 16.1 Interceptando o envio do formulário

O código:

```javascript
formulario.addEventListener("submit", async function(evento) {
```

registra um evento para acompanhar o envio do formulário.

Quando o usuário clicar em:

```text
Cadastrar
```

essa função será executada.

---

## 16.2 `preventDefault()`

Logo no início temos:

```javascript
evento.preventDefault();
```

Normalmente, quando um formulário HTML é enviado, o navegador realiza o comportamento padrão do formulário.

Nesse projeto, queremos impedir esse comportamento porque os dados serão enviados para a API utilizando JavaScript.

Portanto:

```javascript
preventDefault()
```

impede o envio automático do formulário e permite que o `fetch()` faça a comunicação com o backend.

---

## 16.3 Coletando os dados

O objeto:

```javascript
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

coleta os valores preenchidos pelo usuário.

O resultado será semelhante a:

```json
{
    "nome": "Maria Silva",
    "cpf": "123.456.789-00",
    "email": "maria@email.com",
    "data_nascimento": "2005-08-15",
    "telefone": "987654",
    "ra": "12456",
    "cidade": "Mococa"
}
```

---

## 16.4 `fetch()`

A comunicação com o backend é realizada por:

```javascript
const resposta = await fetch("/alunos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(aluno)
});
```

O `fetch()` realiza uma chamada HTTP para a API.

Neste caso:

```text
POST /alunos
```

---

## 16.5 `JSON.stringify()`

O objeto JavaScript:

```javascript
aluno
```

é convertido para JSON utilizando:

```javascript
JSON.stringify(aluno)
```

Isso permite que o objeto seja enviado no corpo da requisição HTTP.

O cabeçalho:

```javascript
"Content-Type": "application/json"
```

informa ao servidor que o corpo da requisição está no formato JSON.

---

## 16.6 Verificando a resposta

Depois de enviar os dados:

```javascript
const resultado = await resposta.json();
```

converte a resposta da API para um objeto JavaScript.

Em seguida:

```javascript
if (resposta.ok)
```

verifica se a requisição foi bem-sucedida.

Quando o cadastro funciona:

```javascript
mensagem.textContent = "Aluno cadastrado com sucesso!";
formulario.reset();
```

uma mensagem é apresentada e o formulário é limpo.

---

## 16.7 Tratando erros

Quando a API retorna um erro:

```javascript
mensagem.textContent =
    "Erro ao cadastrar aluno: " + obterMensagemErro(resultado);
```

a função `obterMensagemErro()` transforma a resposta técnica da API em uma mensagem mais compreensível para o usuário.

Por exemplo, um erro de validação do Pydantic pode conter informações técnicas como:

```json
{
    "detail": [
        {
            "loc": ["body", "email"],
            "msg": "value is not a valid email address"
        }
    ]
}
```

O JavaScript transforma isso em:

```text
E-mail inválido.
```

---

## 16.8 Tratamento de falhas de conexão

O bloco:

```javascript
catch (erro) {
    mensagem.textContent =
        "Não foi possível conectar ao servidor.";

    console.error("Erro de conexão:", erro);
}
```

é executado quando ocorre uma falha na comunicação com o servidor.

Por exemplo:

- FastAPI não está executando;
- servidor foi interrompido;
- endereço da API está incorreto;
- ocorreu uma falha de rede.

---

# 17. Comandos para Executar o Projeto

Na raiz do projeto, execute:

```cmd
venv\Scripts\ctivate
```

Depois, teste a conexão com o banco:

```cmd
python backend/database.py
```

Se a conexão estiver funcionando, execute a API:

```cmd
fastapi dev backend/main.py
```

Também é possível utilizar:

```cmd
uvicorn backend.main:app --reload
```

Depois, acesse:

**Aplicação:**

http://127.0.0.1:8000/

**Documentação da API:**

http://127.0.0.1:8000/docs

**Consulta dos alunos pela API:**

http://127.0.0.1:8000/alunos

---

# 18. Fluxo Completo do Cadastro

O fluxo completo do cadastro de um aluno pode ser representado da seguinte maneira:

```text
Usuário
   ↓
HTML
   ↓
JavaScript
   ↓
fetch()
   ↓
POST /alunos
   ↓
FastAPI
   ↓
Pydantic
   ↓
MySQL
   ↓
JSON
   ↓
JavaScript
   ↓
Mensagem na tela
```

## 18.1 CPF duplicado

Quando o usuário tenta cadastrar um CPF que já existe:

```text
Usuário
   ↓
POST /alunos
   ↓
MySQL
   ↓
UNIQUE
   ↓
IntegrityError 1062
   ↓
rollback()
   ↓
HTTP 409
   ↓
"CPF já cadastrado."
```

---

## 18.2 E-mail inválido

Quando o usuário envia um e-mail inválido:

```text
Usuário
   ↓
POST /alunos
   ↓
Pydantic / EmailStr
   ↓
Validação rejeitada
   ↓
HTTP 422
   ↓
JavaScript
   ↓
"E-mail inválido."
```

---

# 19. Git e GitHub

Depois que o projeto estiver funcionando, ele poderá ser versionado utilizando Git.

Inicialize o repositório:

```cmd
git init
```

Adicione os arquivos:

```cmd
git add .
```

Crie o primeiro commit:

```cmd
git commit -m "Versão temporária - cadastro de alunos"
```

Defina a branch principal:

```cmd
git branch -M main
```

Adicione o repositório remoto:

```cmd
git remote add origin URL_DO_SEU_REPOSITORIO
```

Envie os arquivos:

```cmd
git push -u origin main
```

> Substitua `URL_DO_SEU_REPOSITORIO` pela URL real do repositório criado no GitHub.

---

## 19.1 Arquivo `.gitignore`

Antes de executar:

```cmd
git add .
```

crie um arquivo chamado:

```text
.gitignore
```

com:

```gitignore
venv/
.env
__pycache__/
*.pyc
```

Esse arquivo impede que determinados arquivos e diretórios sejam enviados para o GitHub.

### Por que isso é importante?

O `.gitignore` evita publicar:

- ambiente virtual;
- credenciais do banco;
- senhas;
- variáveis de ambiente;
- arquivos temporários;
- arquivos compilados do Python.

Principalmente, o arquivo:

```text
.env
```

não deve ser publicado, pois pode conter informações sensíveis.

---

# 20. O que já funciona e o que falta

## Concluído

- [x] Banco de dados `escola`.
- [x] Tabela `alunos`.
- [x] Conexão Python → MySQL.
- [x] `GET /alunos` — operação **Read** disponível na API.
- [x] `POST /alunos` — operação **Create** funcionando.
- [x] Formulário HTML.
- [x] JavaScript + `fetch()`.
- [x] Mensagens de sucesso e erro.
- [x] Tratamento de CPF duplicado.
- [x] Validação de e-mail no backend.
- [x] Validação dos dados utilizando Pydantic.
- [x] Documentação automática com FastAPI.

## Pendente

- [ ] Mostrar o `GET /alunos` dentro da interface.
- [ ] Reformular o visual utilizando CSS.
- [ ] Implementar **Update**.
- [ ] Implementar **Delete**.
- [ ] Criar páginas específicas para alunos, professores e funcionários.
- [ ] Criar as tabelas de professores e funcionários.
- [ ] Criar as APIs correspondentes.
- [ ] Integrar as novas páginas ao menu principal.

---

# 21. Atividade de Evolução do Projeto — Separando as Páginas

Neste ponto, os alunos deverão realizar uma evolução importante no projeto.

Até agora, o sistema possui o cadastro de alunos diretamente na página:

```text
index.html
```

Agora, a proposta é transformar o `index.html` em uma **página inicial do sistema**, deixando cada cadastro em uma página própria.

A primeira alteração será criar uma página específica:

```text
frontend/cadastrodealuno.html
```

A página inicial deverá possuir um link ou botão para acessar essa tela.

---

## 21.1 Nova estrutura do frontend

A estrutura deverá ficar semelhante a:

```text
frontend/
├── index.html
├── cadastrodealuno.html
├── cadastrodeprofessor.html
├── cadastrodefuncionario.html
└── js/
    ├── app.js
    ├── aluno.js
    ├── professor.js
    └── funcionario.js
```

Inicialmente, os alunos deverão criar apenas:

```text
cadastrodealuno.html
```

Depois, a atividade continuará com:

```text
cadastrodeprofessor.html
cadastrodefuncionario.html
```

---

# 22. Criando `cadastrodealuno.html`

A página `cadastrodealuno.html` deverá receber o formulário que atualmente está dentro do `index.html`.

Um exemplo inicial:

```html
 <h1>Cadastro de Alunos</h1>

    <form id="form-aluno">

    <div>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required>
    </div>

    <div>
        <label for="cpf">CPF:</label>
        <input type="text" id="cpf" name="cpf" required>
    </div>

    <div>
        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email" required>
    </div>

    <div>
        <label for="data_nascimento">Data de nascimento:</label>
        <input type="date" id="data_nascimento" name="data_nascimento" required>
    </div>

    <div>
        <label for="telefone">Telefone:</label>
        <input type="text" id="telefone" name="telefone" required>
    </div>

    <div>
        <label for="ra">RA:</label>
        <input type="text" id="ra" name="ra" required>
    </div>

    <div>
        <label for="cidade">Cidade:</label>
        <input type="text" id="cidade" name="cidade" required>
    </div>

    <button type="submit">Cadastrar</button>

</form>

<div id="mensagem" aria-live="polite"></div>

<a href="/">Voltar para o início</a>

<script src="/frontend/js/aluno.js"></script>
```

Observe que o JavaScript também foi separado:

```html
<script src="/frontend/js/aluno.js"></script>
```

Isso é recomendado porque cada página pode possuir suas próprias regras.

---

# 23. O que deve mudar no `index.html`?

Depois de criar:

```text
cadastrodealuno.html
```

o formulário de aluno deve ser removido do `index.html`.

O `index.html` passa a funcionar como uma **página inicial ou menu principal**.

Por exemplo:

```html
<h1>Sistema Escola</h1>

<h2>Cadastros</h2>

<nav>
    <a href="/frontend/cadastrodealuno.html">
        Cadastro de Alunos
    </a>
</nav>
```

O objetivo é deixar a responsabilidade de cada página mais clara:

```text
index.html
    ↓
Página inicial

cadastrodealuno.html
    ↓
Cadastro de alunos
```

---

# 24. O que deve mudar no `main.py`?

Como o FastAPI já possui:

```python
app.mount(
    "/frontend",
    StaticFiles(directory=FRONTEND_DIR),
    name="frontend"
)
```

os arquivos HTML existentes dentro de `frontend` poderão ser acessados pelo navegador.

Por exemplo:

```text
/frontend/cadastrodealuno.html
```

Porém, para tornar as URLs mais amigáveis, os alunos poderão criar uma rota específica:

```python
@app.get("/cadastro-de-aluno", include_in_schema=False)
def pagina_cadastro_aluno():
    return FileResponse(FRONTEND_DIR / "cadastrodealuno.html")
```

Assim, o endereço:

```text
http://127.0.0.1:8000/cadastro-de-aluno
```

abrirá:

```text
frontend/cadastrodealuno.html
```

Essa abordagem também será útil posteriormente para professores e funcionários.

---

# 25. O que deve mudar no JavaScript?

O JavaScript que atualmente está em:

```text
frontend/js/app.js
```

está relacionado ao formulário de alunos.

Ao separar as páginas, recomenda-se criar:

```text
frontend/js/aluno.js
```

e mover para ele o código responsável pelo cadastro de alunos.

Assim:

```text
frontend/
└── js/
    ├── app.js
    └── aluno.js
```

O `app.js` poderá futuramente ficar responsável por comportamentos gerais do sistema, enquanto `aluno.js` ficará responsável pelo cadastro de alunos.

### Exemplo

```javascript
const formulario = document.getElementById("form-aluno");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", async function(evento) {
    evento.preventDefault();

     const aluno = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        email: document.getElementById("email").value,
        data_nascimento: document.getElementById("data_nascimento").value,
        telefone: document.getElementById("telefone").value,
        ra: document.getElementById("ra").value,
        cidade: document.getElementById("cidade").value
    };

    // Comunicação com a API...
});
```

---

# 26. Evolução para Professores e Funcionários

Depois que o cadastro de alunos estiver separado, os alunos deverão ampliar o sistema.

A página inicial deverá apresentar três opções:

```text
┌─────────────────────────────┐
│       SISTEMA ESCOLA        │
├─────────────────────────────┤
│                             │
│  [ Cadastro de Aluno ]      │
│                             │
│  [ Cadastro de Professor ]  │
│                             │
│  [ Cadastro de Funcionário ]│
│                             │
└─────────────────────────────┘
```

Cada botão deverá direcionar para uma página específica:

```text
Cadastro de Aluno
        ↓
cadastrodealuno.html

Cadastro de Professor
        ↓
cadastrodeprofessor.html

Cadastro de Funcionário
        ↓
cadastrodefuncionario.html
```

---

# 27. Criando o Cadastro de Professores

Os alunos deverão criar:

```text
frontend/cadastrodeprofessor.html
```

e o JavaScript:

```text
frontend/js/professor.js
```

Porém, não basta criar somente a página.

Será necessário criar também a estrutura correspondente no backend e no banco de dados.

---

## 27.1 Nova tabela `professores`

Uma possibilidade inicial é:

```sql
CREATE TABLE `professor` (
  `codProf` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `email` varchar(150) NOT NULL,
  `data_nascimento` date NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `cidade` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `professor`
  ADD PRIMARY KEY (`codProf`),
  ADD UNIQUE KEY `cpf` (`cpf`);
```

---

## 27.2 Novo schema

No `schemas.py`, deverá ser criado um modelo para receber os dados:

```python
Class ProfessorCreate(BaseModel):
    nome: str
    cpf: str
    email: EmailStr
    data_nascimento: date
    telefone: str
    cidade: str
```

E outro para representar a resposta:

```python
class ProfessorResponse(BaseModel):
    id: int
    nome: str
    cpf: str
    email: EmailStr
    data_nascimento: date
    telefone: str
    cidade: str
```

---

## 27.3 Novas rotas no `main.py`

Será necessário criar uma rota para consultar professores:

```python
@app.get("/professores", response_model=list[ProfessorResponse])
def listar_professores():
    ...
```

E uma rota para cadastrar professores:

```python
@app.post("/professores", response_model=ProfessorResponse)
def cadastrar_professor(professor: ProfessorCreate):
    ...
```

A lógica deverá seguir o mesmo princípio utilizado no cadastro de alunos:

```text
HTML
   ↓
JavaScript
   ↓
POST /professores
   ↓
Pydantic
   ↓
MySQL
   ↓
ProfessorResponse
   ↓
Frontend
```

---

# 28. Criando o Cadastro de Funcionários

Depois do cadastro de professores, deverá ser criada:

```text
frontend/cadastrodefuncionario.html
```

e:

```text
frontend/js/funcionario.js
```

Também será necessário criar a tabela correspondente no MySQL.

Uma possibilidade inicial:

```sql
CREATE TABLE `funcionario` (
  `codFunc` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `email` varchar(150) NOT NULL,
  `data_nascimento` date NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `cidade` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `funcionario`
  ADD PRIMARY KEY (`codFunc`),
  ADD UNIQUE KEY `cpf` (`cpf`);
```

---

## 28.1 Schemas de funcionários

No `schemas.py`:

```python
class FuncionarioCreate(BaseModel):
    nome: str
    cpf: str
    email: EmailStr
    data_nascimento: date
    telefone: str
    cidade: str
```

E:

```python
class FuncionarioResponse(BaseModel):
    id: int
    nome: str
    cpf: str
    email: EmailStr
    data_nascimento: date
    telefone: str
    cidade: str
```

---

## 28.2 Novas rotas

No `main.py`:

```python
@app.get("/funcionarios", response_model=list[FuncionarioResponse])
def listar_funcionarios():
    ...
```

e:

```python
@app.post("/funcionarios", response_model=FuncionarioResponse)
def cadastrar_funcionario(funcionario: FuncionarioCreate):
    ...
```

---

# 29. Nova Estrutura Geral do Projeto

Ao final dessa etapa, a estrutura poderá ficar assim:

```text
cadastro-alunos/
├── backend/
│   ├── main.py
│   ├── database.py
│   └── schemas.py
│
├── frontend/
│   ├── index.html
│   ├── cadastrodealuno.html
│   ├── cadastrodeprofessor.html
│   ├── cadastrodefuncionario.html
│   │
│   └── js/
│       ├── app.js
│       ├── aluno.js
│       ├── professor.js
│       └── funcionario.js
│
├── venv/
├── .env
└── .gitignore
```

---

# 30. Fluxo da Nova Aplicação

Depois da evolução, o funcionamento será:

```text
                         ┌─────────────────────┐
                         │     index.html      │
                         │   Página inicial    │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
          ┌────────────────┐ ┌────────────────┐ ┌──────────────────┐
          │ cadastro de    │ │ cadastro de    │ │ cadastro de      │
          │ aluno          │ │ professor      │ │ funcionário      │
          └───────┬────────┘ └───────┬────────┘ └────────┬─────────┘
                  │                  │                   │
                  ▼                  ▼                   ▼
             aluno.js         professor.js       funcionario.js
                  │                  │                   │
                  ▼                  ▼                   ▼
              /alunos          /professores       /funcionarios
                  │                  │                   │
                  ▼                  ▼                   ▼
               MySQL              MySQL               MySQL
```

---

# 31. Desafio Proposto aos Alunos

A partir desta etapa, o exercício será evoluir o projeto existente.

### Etapa 1 — Separar o cadastro de alunos

Criar:

```text
frontend/cadastrodealuno.html
```

Mover o formulário de alunos para essa página.

Alterar o `index.html` para funcionar como página inicial.

Criar ou adaptar:

```text
frontend/js/aluno.js
```

para continuar realizando o cadastro através de:

```text
POST /alunos
```

---

### Etapa 2 — Criar o cadastro de professores

Criar:

```text
frontend/cadastrodeprofessor.html
frontend/js/professor.js
```

Criar a tabela:

```text
professores
```

Criar os schemas:

```text
ProfessorCreate
ProfessorResponse
```

Criar as rotas:

```text
GET /professores
POST /professores
```

---

### Etapa 3 — Criar o cadastro de funcionários

Criar:

```text
frontend/cadastrodefuncionario.html
frontend/js/funcionario.js
```

Criar a tabela:

```text
funcionarios
```

Criar os schemas:

```text
FuncionarioCreate
FuncionarioResponse
```

Criar as rotas:

```text
GET /funcionarios
POST /funcionarios
```

---

### Etapa 4 — Atualizar a página inicial

O `index.html` deverá apresentar opções para:

- Cadastro de Alunos;
- Cadastro de Professores;
- Cadastro de Funcionários.

Cada opção deverá direcionar para sua respectiva página.

---

### Etapa 5 — Testar toda a aplicação

Os alunos deverão testar:

1. Abrir a página inicial.
2. Acessar o cadastro de alunos.
3. Cadastrar um aluno.
4. Acessar o cadastro de professores.
5. Cadastrar um professor.
6. Acessar o cadastro de funcionários.
7. Cadastrar um funcionário.
8. Testar CPF duplicado.
9. Testar e-mail inválido.
10. Conferir os registros diretamente no MySQL.
11. Conferir as rotas pela documentação `/docs`.
12. Verificar o código no GitHub.

---

# 32. O que muda em cada camada?

A principal finalidade dessa atividade é fazer com que os alunos percebam que uma alteração no frontend pode exigir alterações em várias partes da aplicação.

| Camada | Alunos | Professores | Funcionários |
|---|---|---|---|
| HTML | `cadastrodealuno.html` | `cadastrodeprofessor.html` | `cadastrodefuncionario.html` |
| JavaScript | `aluno.js` | `professor.js` | `funcionario.js` |
| Schema | `AlunoCreate` / `AlunoResponse` | `ProfessorCreate` / `ProfessorResponse` | `FuncionarioCreate` / `FuncionarioResponse` |
| API | `/alunos` | `/professores` | `/funcionarios` |
| Banco | `alunos` | `professores` | `funcionarios` |

Esse exercício demonstra, na prática, a integração entre:

```text
Frontend
    ↓
JavaScript
    ↓
API REST
    ↓
Pydantic
    ↓
Banco de Dados
```

---

# 33. Próxima Versão

A próxima etapa será integrar o `GET /alunos` ao frontend e mostrar os registros em uma tabela.

Depois, a interface será reformulada visualmente para ficar mais profissional.

Em seguida, serão implementadas as operações:

- **Update** — atualização de registros;
- **Delete** — exclusão de registros.

Posteriormente, o projeto poderá evoluir para um pequeno **Sistema de Gestão Escolar**, com diferentes módulos e relacionamentos entre as entidades.

A documentação apresentada neste capítulo é temporária. Quando a aplicação estiver mais madura, o conteúdo deverá ser revisado, reorganizado e transformado em uma versão definitiva do capítulo do livro.


# 34. Próximo capítulo

No próximo capítulo vamos criar a aplicação e realizar o visualizar dos alunos junto com o banco de dados.

[➡️ **Capítulo 02 — Visualizar de Aluno**](https://github.com/pedroAmalfi/livro-api-python-fastapi/tree/main/livro/02-visualizar-de-aluno)

# Capítulo 00 — Preparando o Ambiente de Desenvolvimento

> **Frase de impacto**
>
> Antes de construir uma API profissional, precisamos construir um ambiente profissional.

> **Nota ao leitor**
>
> Este capítulo prepara completamente o computador para acompanhar todo o restante do livro.
> Ao final dele você terá o Git, Visual Studio Code, Python, Ambiente Virtual,
> FastAPI, MySQL, SQLAlchemy e todas as bibliotecas instaladas, além de validar
> que sua API e sua conexão com o banco de dados estão funcionando.

---

# Sumário

1. Por que preparar o ambiente?
2. Instalando o Git
3. Instalando o Visual Studio Code
4. Instalando o Python
5. Criando um Ambiente Virtual
6. Criando o primeiro projeto
7. Instalando as bibliotecas do projeto
8. Criando o arquivo requirements.txt
9. Configurando o banco de dados
10. Testando a conexão com o MySQL
11. Problemas comuns e soluções
12. Checklist final
13. Principais aprendizados
14. Próximo capítulo

<!--
TODO:
- Inserir imagens em todas as etapas.
- Inserir capturas do Git, VS Code, Python, MySQL e Swagger.
- Inserir diagrama do fluxo:
Editor -> Python -> FastAPI -> SQLAlchemy -> MySQL
-->

# 1. Por que preparar o ambiente?

Durante este livro construiremos uma API REST completa utilizando Python e FastAPI.

Antes de escrever qualquer funcionalidade precisamos garantir que todas as ferramentas necessárias estejam funcionando corretamente.

A ideia é simples: resolver todos os problemas de instalação agora, para que os próximos capítulos sejam dedicados apenas ao desenvolvimento da aplicação.

(...)

# 2. Instalando o Git

Explicar o que é controle de versão, por que o Git foi criado, como instalar, validar com:

```bash
git --version
```

e principais erros.

# 3. Instalando o Visual Studio Code

Explicar por que utilizaremos um editor de código e instalar o VS Code.

# 4. Instalando o Python

Instalar o Python, marcar "Add Python to PATH", validar com:

```bash
python --version
```

Executar:

```python
print("Olá, Mundo!")
```

# 5. Criando um Ambiente Virtual

```bash
python -m venv .venv
```

Ativar:

```bash
.venv\Scripts\activate
```

Explicar o que é isolamento de dependências.

# 6. Criando o primeiro projeto

Estrutura inicial:

```text
escola-api/
├── .venv/
├── main.py
└── ...
```

Instalar:

```bash
pip install fastapi "uvicorn[standard]"
```

Arquivo:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def inicio():
    return {"mensagem":"Olá, Mundo!"}
```

Executar:

```bash
uvicorn main:app --reload
```

Testar:

http://127.0.0.1:8000

Swagger:

http://127.0.0.1:8000/docs

# 7. Instalando as bibliotecas do projeto

```bash
pip install sqlalchemy pymysql python-dotenv
```

Explicar a finalidade de cada biblioteca.

# 8. Criando o requirements.txt

```bash
pip freeze > requirements.txt
```

Explicar como recriar o ambiente:

```bash
pip install -r requirements.txt
```

# 9. Configurando o banco de dados

Criar arquivo `.env`

```text
DB_HOST=localhost
DB_PORT=3306
DB_NAME=escola
DB_USER=root
DB_PASSWORD=123456
```

Explicar que são valores de exemplo.

# 10. Testando a conexão com o MySQL

Criar arquivo:

```text
diagnostico/03-mysql.py
```

Conteúdo:

```python
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv()

url = (
    f"mysql+pymysql://{os.getenv('DB_USER')}:"
    f"{os.getenv('DB_PASSWORD')}@"
    f"{os.getenv('DB_HOST')}:"
    f"{os.getenv('DB_PORT')}/"
    f"{os.getenv('DB_NAME')}"
)

try:
    engine = create_engine(url)

    with engine.connect():
        print("Conexão realizada com sucesso!")

except Exception as erro:
    print(erro)
```

Explicar o que esse script faz e por que executá-lo antes dos capítulos de banco de dados.

# 11. Problemas comuns e soluções

## Git não encontrado

- Verificar instalação
- Reiniciar o computador
- Conferir PATH

## Python não encontrado

- Reinstalar marcando Add Python to PATH

## FastAPI não encontrada

```bash
pip install fastapi
```

## SQLAlchemy não encontrado

```bash
pip install sqlalchemy
```

## PyMySQL não encontrado

```bash
pip install pymysql
```

## dotenv não encontrado

```bash
pip install python-dotenv
```

## Access denied

Verificar usuário e senha.

## Unknown database

Criar o banco:

```sql
CREATE DATABASE escola;
```

## Can't connect to MySQL

Verificar se o serviço MySQL está iniciado e se a porta configurada está correta.

# 12. Checklist final

- [ ] Git instalado
- [ ] VS Code instalado
- [ ] Python instalado
- [ ] Ambiente Virtual criado
- [ ] FastAPI funcionando
- [ ] Swagger acessível
- [ ] SQLAlchemy instalado
- [ ] PyMySQL instalado
- [ ] python-dotenv instalado
- [ ] requirements.txt criado
- [ ] arquivo .env criado
- [ ] MySQL iniciado
- [ ] banco criado
- [ ] script de diagnóstico conecta ao banco

# 13. Principais aprendizados

Ao concluir este capítulo você preparou completamente seu ambiente de desenvolvimento e validou todas as tecnologias que serão utilizadas ao longo do livro.

# 14. Próximo capítulo

No próximo capítulo conheceremos o Git e entenderemos como controlar a evolução de um projeto profissional desde o primeiro commit.

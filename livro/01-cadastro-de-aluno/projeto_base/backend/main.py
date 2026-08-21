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
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

class ProfessorCreate(BaseModel):
    nome: str
    cpf: str
    email: EmailStr
    data_nascimento: date
    telefone: str
    cidade: str


class ProfessorResponse(BaseModel):
    id: int
    nome: str
    cpf: str
    email: EmailStr
    data_nascimento: date
    telefone: str
    cidade: str

class FuncionarioCreate(BaseModel):
    nome: str
    cpf: str
    email: EmailStr
    data_nascimento: date
    telefone: str
    cidade: str


class FuncionarioResponse(BaseModel):
    id: int
    nome: str
    cpf: str
    email: EmailStr
    data_nascimento: date
    telefone: str
    cidade: str
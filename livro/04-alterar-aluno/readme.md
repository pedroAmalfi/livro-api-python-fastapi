# Alteração de Dados de Alunos — Capítulo 3

## Objetivo

Nesta etapa vamos acrescentar ao sistema a possibilidade de **alterar os dados de um aluno já cadastrado**.

Até agora, o projeto já trabalha com cadastro, listagem e filtros. Agora vamos acrescentar a operação **UPDATE**.

> **Importante:** nesta etapa, a alteração será implementada somente para **Aluno**. Ao final, você deverá aplicar o mesmo conceito para **Professor** e **Funcionário** como exercício.

## 1. O que vamos construir

```text
Listagem de alunos
        ↓
Filtro
        ↓
Escolher aluno
        ↓
Clicar em "Alterar"
        ↓
Abrir formulário preenchido
        ↓
Modificar os dados
        ↓
Salvar alterações
        ↓
JavaScript envia PUT
        ↓
FastAPI recebe os dados
        ↓
SQL executa UPDATE
        ↓
Banco de dados é atualizado
```

## 2. POST x PUT

### Cadastro

```http
POST /alunos
```

O Back-End executa um `INSERT`.

**POST cria um novo registro.**

### Alteração

```http
PUT /alunos/{codAluno}
```

O Back-End executará:

```sql
UPDATE alunos
SET ...
WHERE codAluno = ...;
```

**PUT altera um registro existente.**

## 3. Por que precisamos do código do aluno?

Imagine:

```text
1 - Marcelo
2 - João
3 - Maria
4 - Carlos
```

Para alterar Maria precisamos identificar o registro. Por isso usamos `codAluno = 3`.

```http
PUT /alunos/3
```

que resulta em algo equivalente a:

```sql
WHERE codAluno = 3;
```

### Atenção ao WHERE

Nunca faça:

```sql
UPDATE alunos
SET cidade = 'Mogi Guaçu';
```

Isso poderia alterar todos os alunos.

O correto é:

```sql
UPDATE alunos
SET cidade = 'Mogi Guaçu'
WHERE codAluno = 3;
```

## 4. Etapa 1 — Criar o endpoint PUT

Abra:

```text
backend/main.py
```

Depois do endpoint de cadastro do aluno, crie:

```python
@app.put("/alunos/{codAluno}", response_model=AlunoResponse)
def alterar_aluno(codAluno: int, aluno: AlunoCreate):

    conexao = criar_conexao()
    cursor = conexao.cursor()

    sql = """
        UPDATE alunos
        SET
            nome = %s,
            cpf = %s,
            email = %s,
            data_nascimento = %s,
            telefone = %s,
            ra = %s,
            cidade = %s
        WHERE codAluno = %s
    """

    valores = (
        aluno.nome,
        aluno.cpf,
        aluno.email,
        aluno.data_nascimento,
        aluno.telefone,
        aluno.ra,
        aluno.cidade,
        codAluno
    )

    try:
        cursor.execute(sql, valores)

        if cursor.rowcount == 0:
            raise HTTPException(
                status_code=404,
                detail="Aluno não encontrado."
            )

        conexao.commit()

        return {
            "codAluno": codAluno,
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
                detail="CPF ou RA já cadastrado."
            )

        raise HTTPException(
            status_code=500,
            detail="Erro de integridade no banco de dados."
        )

    finally:
        cursor.close()
        conexao.close()
```

### O que está acontecendo?

`@app.put("/alunos/{codAluno}")` cria a rota de alteração. `{codAluno}` é um parâmetro da URL. Por exemplo, `/alunos/5` significa `codAluno = 5`.

`aluno: AlunoCreate` recebe os dados enviados pelo Front-End.

O `UPDATE` informa quais campos serão modificados e o `WHERE` define qual registro será afetado.

## 5. Por que usamos `%s`?

Os valores são enviados separadamente:

```python
valores = (
    aluno.nome,
    aluno.cpf,
    aluno.email,
    aluno.data_nascimento,
    aluno.telefone,
    aluno.ra,
    aluno.cidade,
    codAluno
)
```

e depois:

```python
cursor.execute(sql, valores)
```

Essa abordagem evita montar o SQL concatenando strings e ajuda a proteger a aplicação contra problemas como SQL Injection.

## 6. Confirmando a alteração com `commit()`

Depois de:

```python
cursor.execute(sql, valores)
```

utilizamos:

```python
conexao.commit()
```

O `commit()` confirma a transação.

```text
UPDATE
  ↓
Alteração preparada
  ↓
COMMIT
  ↓
Alteração confirmada
```

## 7. Verificando se o aluno existe

Utilizamos:

```python
if cursor.rowcount == 0:
    raise HTTPException(
        status_code=404,
        detail="Aluno não encontrado."
    )
```

Se nenhum registro for afetado, retornamos `404`.

## 8. Tratando CPF e RA duplicados

CPF e RA possuem restrição de unicidade no banco. Portanto, não podemos permitir que dois registros tenham o mesmo valor.

Por isso tratamos:

```python
except IntegrityError as erro:
```

e:

```python
if erro.errno == 1062:
    raise HTTPException(
        status_code=409,
        detail="CPF ou RA já cadastrado."
    )
```

`409 Conflict` representa um conflito com os dados existentes.

## 9. Testando o PUT no Swagger

Execute:

```bash
uvicorn app.main:app --reload
```

Abra:

```text
http://127.0.0.1:8000/docs
```

Procure:

```text
PUT /alunos/{codAluno}
```

Clique em **Try it out**, informe um código existente e envie os dados.

Exemplo:

```json
{
    "nome": "Marcelo Alterado",
    "cpf": "123456",
    "email": "marcelo@teste.com",
    "data_nascimento": "1980-02-04",
    "telefone": "999999",
    "ra": "987654",
    "cidade": "Mogi Guaçu"
}
```

Depois confira a alteração no banco.

> **Boa prática:** teste primeiro a API. Se o PUT funcionar no Swagger, fica mais fácil descobrir se um problema posterior está no Front-End.

## 10. Etapa 2 — Adicionar a coluna Ações

Abra:

```text
frontend/alunos.html
```

Na tabela, acrescente:

```html
<th>Ações</th>
```

A tabela ficará semelhante a:

```html
<th>Código</th>
<th>Nome</th>
<th>CPF</th>
<th>E-mail</th>
<th>Data de Nascimento</th>
<th>Telefone</th>
<th>RA</th>
<th>Cidade</th>
<th>Ações</th>
```

Essa coluna permitirá que o usuário escolha qual aluno deseja alterar.

### Ajustar o `colspan`

Se existir:

```html
<td colspan="8">
    Erro ao carregar os alunos.
</td>
```

altere para:

```html
<td colspan="9">
    Erro ao carregar os alunos.
</td>
```

Temos uma coluna a mais.

## 11. Etapa 3 — Criar o botão Alterar

Abra:

```text
frontend/js/aluno.js
```

Na função que monta as linhas da tabela, acrescente:

```javascript
linha.innerHTML = `
    <td>${aluno.codAluno}</td>
    <td>${aluno.nome}</td>
    <td>${aluno.cpf}</td>
    <td>${aluno.email}</td>
    <td>${aluno.data_nascimento}</td>
    <td>${aluno.telefone}</td>
    <td>${aluno.ra}</td>
    <td>${aluno.cidade}</td>
    <td>
        <button
            type="button"
            class="btn btn-warning btn-sm"
            onclick="alterarAluno(${aluno.codAluno})"
        >
            ✏️ Alterar
        </button>
    </td>
`;
```

Se o aluno tiver `codAluno = 5`, o navegador interpretará:

```javascript
alterarAluno(5)
```

Assim sabemos qual registro foi selecionado.

## 12. Etapa 4 — Criar `alterarAluno()`

No mesmo arquivo, adicione:

```javascript
function alterarAluno(codAluno) {

    window.location.href =
        `/frontend/cadastrodealuno.html?codAluno=${codAluno}`;

}
```

Ao clicar em Alterar, o navegador abrirá:

```text
cadastrodealuno.html?codAluno=5
```

O trecho `?codAluno=5` é um **query parameter**.

## 13. Etapa 5 — Reutilizar o formulário

Não precisamos criar `alteraraluno.html`.

Vamos reutilizar:

```text
cadastrodealuno.html
```

Para cadastro:

```text
cadastrodealuno.html
```

Para alteração:

```text
cadastrodealuno.html?codAluno=5
```

Isso reduz duplicação e permite utilizar o mesmo formulário para as duas operações.

## 14. Alterar o título e o botão

Abra:

```text
frontend/cadastrodealuno.html
```

Altere o título para:

```html
<h1 id="tituloFormulario" class="fw-bold mb-1">
    Cadastro de Aluno
</h1>
```

E o botão:

```html
<button
    type="submit"
    class="btn btn-primary"
    id="btnSalvar"
>
    Cadastrar aluno
</button>
```

Os `id` permitirão que o JavaScript altere esses textos quando estivermos no modo de alteração.

## 15. Etapa 6 — Ler o `codAluno` da URL

No JavaScript:

```javascript
const parametros =
    new URLSearchParams(window.location.search);

const codAluno =
    parametros.get("codAluno");
```

Se a página for `cadastrodealuno.html`, não haverá código.

Se for `cadastrodealuno.html?codAluno=5`, teremos `codAluno = "5"`.

## 16. Etapa 7 — Carregar os dados do aluno

Crie:

```javascript
async function carregarAlunoParaAlteracao() {

    if (!codAluno || !formulario) {
        return;
    }

    try {
        const resposta = await fetch("/alunos");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar alunos.");
        }

        const alunos = await resposta.json();

        const aluno = alunos.find(
            aluno => aluno.codAluno == codAluno
        );

        if (!aluno) {
            mensagem.textContent =
                "Aluno não encontrado.";
            return;
        }

        document.getElementById("nome").value =
            aluno.nome;

        document.getElementById("cpf").value =
            aluno.cpf;

        document.getElementById("email").value =
            aluno.email;

        document.getElementById("data_nascimento").value =
            aluno.data_nascimento;

        document.getElementById("telefone").value =
            aluno.telefone;

        document.getElementById("ra").value =
            aluno.ra;

        document.getElementById("cidade").value =
            aluno.cidade;

        document.getElementById("tituloFormulario").textContent =
            "Alterar Aluno";

        document.getElementById("btnSalvar").textContent =
            "Salvar alterações";

    } catch (erro) {
        console.error(
            "Erro ao carregar aluno:",
            erro
        );

        mensagem.textContent =
            "Não foi possível carregar os dados do aluno.";
    }
}
```

### Entendendo `find()`

```javascript
const aluno = alunos.find(
    aluno => aluno.codAluno == codAluno
);
```

Se a URL for `?codAluno=3`, o `find()` procura na lista o aluno de código 3.

Depois os dados são colocados nos campos do formulário.

## 17. Preenchendo o formulário

Exemplo:

```javascript
document.getElementById("nome").value =
aluno.nome;
```

O mesmo acontece com CPF, e-mail, data de nascimento, telefone, RA e cidade.

Assim o usuário recebe um formulário já preenchido e pode modificar somente o que deseja.

## 18. Etapa 8 — Diferenciar POST e PUT

No envio do formulário precisamos descobrir:

```text
É cadastro?
    ↓
POST

É alteração?
    ↓
PUT
```

Utilize:

```javascript
let resposta;

if (codAluno) {

    resposta = await fetch(
        `/alunos/${codAluno}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)
        }
    );

} else {

    resposta = await fetch(
        "/alunos",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)
        }
    );
}
```

### Cadastro normal

```text
cadastrodealuno.html
        ↓
POST /alunos
        ↓
INSERT
```

### Alteração

```text
cadastrodealuno.html?codAluno=5
        ↓
PUT /alunos/5
        ↓
UPDATE ... WHERE codAluno = 5
```

## 19. Código do envio do formulário

O evento poderá ficar assim:

```javascript
formulario.addEventListener(
    "submit",
    async function(evento) {

        evento.preventDefault();
        mensagem.textContent = "";

        const aluno = {
            nome: document.getElementById("nome").value,
            cpf: document.getElementById("cpf").value,
            email: document.getElementById("email").value,
            data_nascimento:
                document.getElementById("data_nascimento").value,
            telefone:
                document.getElementById("telefone").value,
            ra: document.getElementById("ra").value,
            cidade:
                document.getElementById("cidade").value
        };

        try {
            let resposta;

            if (codAluno) {
                resposta = await fetch(
                    `/alunos/${codAluno}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify(aluno)
                    }
                );
            } else {
                resposta = await fetch(
                    "/alunos",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify(aluno)
                    }
                );
            }

            const resultado = await resposta.json();

            if (resposta.ok) {
                if (codAluno) {
                    mensagem.textContent =
                        "Aluno alterado com sucesso!";
                } else {
                    mensagem.textContent =
                        "Aluno cadastrado com sucesso!";
                    formulario.reset();
                }
            } else {
                mensagem.textContent =
                    "Erro: " + obterMensagemErro(resultado);

                console.error(
                    "Erro da API:",
                    resultado
                );
            }

        } catch (erro) {
            mensagem.textContent =
                "Não foi possível conectar ao servidor.";

            console.error(
                "Erro de conexão:",
                erro
            );
        }
    }
);
```

> **Atenção:** mantenha as funções que já existem no projeto. A ideia é adaptar o código existente, e não apagar funcionalidades que já estavam funcionando.

## 20. Executar a função ao abrir a página

Ao final do JavaScript, além das funções já existentes, chame:

```javascript
carregarAlunoParaAlteracao();
```

Quando a página abrir com `?codAluno=5`, o sistema carregará os dados do aluno.

## 21. Como testar

### Teste 1 — Cadastro

Abra `cadastrodealuno.html`, cadastre um aluno e confirme que continua funcionando.

### Teste 2 — Listagem

Abra `alunos.html` e confira se o aluno aparece.

### Teste 3 — Filtro

Utilize os filtros existentes e encontre o aluno.

### Teste 4 — Alterar

Clique em **✏️ Alterar**. O formulário deverá abrir preenchido.

### Teste 5 — Modificar

Altere algum dado e clique em **Salvar alterações**.

### Teste 6 — Conferir no banco

Execute:

```sql
SELECT * FROM alunos;
```

Confirme se o registro foi alterado.

### Teste 7 — CPF ou RA duplicado

Tente colocar um CPF ou RA que já pertença a outro aluno. O banco deverá impedir a operação.

## 22. Erros comuns

### UPDATE sem WHERE

Errado:

```sql
UPDATE alunos
SET cidade = %s;
```

Correto:

```sql
UPDATE alunos
SET cidade = %s
WHERE codAluno = %s;
```

### Usar POST para alterar

Para alteração:

```javascript
method: "PUT"
```

### Esquecer o código na URL

Use:

```javascript
fetch(`/alunos/${codAluno}`)
```

### Esquecer o commit

Depois do UPDATE:

```python
cursor.execute(sql, valores)
conexao.commit()
```

### Apagar o cadastro existente

O formulário deve continuar funcionando para:

```text
Cadastro → POST
Alteração → PUT
```

## 23. Conceitos aprendidos

### Front-End

- HTML;
- tabelas;
- botões;
- JavaScript;
- eventos;
- `onclick`;
- `fetch()`;
- `URLSearchParams`;
- `async/await`;
- JSON;
- query parameters.

### Back-End

- FastAPI;
- rotas;
- parâmetros de URL;
- método HTTP PUT;
- tratamento de exceções;
- códigos HTTP.

### Banco de dados

- `UPDATE`;
- `SET`;
- `WHERE`;
- `COMMIT`;
- `UNIQUE`;
- integridade dos dados.

### Arquitetura

```text
HTML
 ↓
JavaScript
 ↓
API REST / FastAPI
 ↓
MySQL
```

# 24. 📝 ATIVIDADE — Agora é sua vez!

Agora que a alteração de **Aluno** foi implementada, você deverá aplicar o mesmo conceito para **Professor** e **Funcionário**.

## 👨‍🏫 Professor

Implemente:

```text
Listar
 ↓
Filtrar
 ↓
Selecionar
 ↓
Alterar
 ↓
Salvar
```

Crie uma rota semelhante a:

```http
PUT /professores/{codigo}
```

e execute um:

```sql
UPDATE professores
...
WHERE codigo = ...;
```

Adapte os campos de acordo com a estrutura real da tabela e do seu projeto.

## 👷 Funcionário

Faça o mesmo para Funcionário:

```text
Listar
 ↓
Filtrar
 ↓
Selecionar
 ↓
Alterar
 ↓
Salvar
```

Crie a rota correspondente no FastAPI e execute o `UPDATE` utilizando corretamente a chave primária do registro.

# 25. Requisitos da atividade

Para Professor e Funcionário, implemente:

- [ ] botão **Alterar** na listagem;
- [ ] passagem do código do registro pela URL;
- [ ] abertura do formulário;
- [ ] preenchimento automático dos dados;
- [ ] alteração dos dados;
- [ ] envio utilizando `PUT`;
- [ ] endpoint no FastAPI;
- [ ] utilização do `UPDATE`;
- [ ] utilização correta do `WHERE`;
- [ ] utilização do `commit()`;
- [ ] tratamento de registro não encontrado;
- [ ] tratamento das restrições de integridade;
- [ ] mensagem de sucesso;
- [ ] mensagem de erro;
- [ ] manutenção do cadastro existente funcionando.

# 26. ⭐ Desafios extras

Depois de implementar Professor e Funcionário, tente melhorar o sistema.

### Desafio 1

Após salvar, retornar automaticamente para a página de listagem.

### Desafio 2

Mostrar uma confirmação:

```text
Deseja realmente salvar estas alterações?
```

### Desafio 3

Adicionar um botão **Cancelar** que retorna para a listagem sem salvar.

### Desafio 4

Validar os campos obrigatórios antes de enviar.

# 27. Conclusão

Um sistema CRUD não possui somente o cadastro.

```text
C — Create
    INSERT

R — Read
    SELECT

U — Update
    UPDATE

D — Delete
    DELETE
```

Até aqui, nosso sistema já trabalha com:

```text
CREATE → Cadastro
READ   → Listagem/Filtro
UPDATE → Alteração
```

## 🎯 Exercício final

**Implemente o Alterar para Professor e Funcionário sem simplesmente copiar o código do Aluno.**

Analise o que foi feito para Aluno, identifique quais partes precisam ser adaptadas e faça as alterações necessárias de acordo com:

- os campos de cada tabela;
- os modelos do FastAPI;
- os formulários HTML;
- os arquivos JavaScript;
- as chaves primárias;
- as regras de integridade de cada tabela.

A finalidade deste exercício é verificar se você realmente compreendeu o fluxo:

```text
Front-End
   ↓
JavaScript
   ↓
PUT
   ↓
FastAPI
   ↓
UPDATE
   ↓
MySQL
```

**Boa prática: não tenha pressa para copiar. Entenda o que cada linha faz e por que ela precisa existir.**

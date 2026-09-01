**Capítulo 05 - Excluir Alunos**

Este capítulo é um desafio aos leitores para que tentem desenvolver a
funcionalidade do Excluir semelhante ao realizado no Alterar do capítulo
Anterior.

A unica difereça é que ao pressionar o Excluir, deve-se realizar uma
pergunta de confirmação "Deseja realmente Excluir?" com os botões de SIM
e NÃO.

Implementem primeiro as funcionalidades do Excluir para os Alunos e, em
seguida, realizem o mesmo para os Professores e Funcionários!!!

Bom teste a todos!

------------------------------------------------------------------------

## 🎯 Objetivo do capítulo

Neste capítulo vamos completar mais uma etapa do **CRUD** do sistema de
Gestão Escolar.

Até aqui, o projeto já possui as operações de:

-   **Cadastrar** → `POST`
-   **Listar** → `GET`
-   **Alterar** → `PUT`

Agora o desafio é implementar:

-   **Excluir** → `DELETE`

A ideia é que você tente desenvolver a funcionalidade sozinho antes de
consultar a solução.

> **Desafio:** tente implementar primeiro olhando apenas para o código
> que já existe no projeto, principalmente a funcionalidade de **Alterar
> Aluno** desenvolvida no capítulo anterior.

Quando terminar, teste bastante!

------------------------------------------------------------------------

## 🧠 Antes de começar: pense no que precisa acontecer

Quando o usuário clicar em:

**🗑️ Excluir**

o sistema deverá:

1.  Identificar qual aluno foi selecionado.
2.  Perguntar se o usuário realmente deseja excluir.
3.  Se escolher **NÃO**, não fazer nada.
4.  Se escolher **SIM**, enviar uma requisição `DELETE` para a API.
5.  A API deverá localizar o aluno pelo código.
6.  O banco de dados deverá executar um `DELETE`.
7.  A API deverá confirmar a operação.
8.  O JavaScript deverá atualizar a lista de alunos.

Pense:

``` text
Botão Excluir
      ↓
Confirmação
      ↓
SIM ou NÃO?
      ↓
    NÃO ─────────→ cancela
      ↓
     SIM
      ↓
DELETE /alunos/{codAluno}
      ↓
FastAPI
      ↓
MySQL
      ↓
Aluno excluído
      ↓
Atualiza a lista
```

------------------------------------------------------------------------

# 🔎 1. Analise como o Alterar funciona

Antes de escrever qualquer código, abra:

``` text
backend/main.py
frontend/js/aluno.js
frontend/alunos.html
```

No `main.py`, observe a rota existente:

``` python
@app.put("/alunos/{codAluno}")
def alterar_aluno(...)
```

No `aluno.js`, observe como o botão Alterar é criado e como a função:

``` javascript
alterarAluno(codAluno)
```

é chamada.

Observe também como o JavaScript utiliza:

``` javascript
fetch()
```

para conversar com a API.

A funcionalidade Excluir seguirá a mesma ideia, mas utilizando o método
HTTP:

``` text
DELETE
```

------------------------------------------------------------------------

# 🧩 2. O que precisa ser criado?

Para implementar o Excluir de Aluno, você precisará modificar
principalmente:

### Backend

Arquivo:

``` text
backend/main.py
```

Criar uma nova rota:

``` text
DELETE /alunos/{codAluno}
```

### Frontend

Arquivo:

``` text
frontend/js/aluno.js
```

Você deverá:

-   criar o botão Excluir;
-   criar a função `excluirAluno()`;
-   pedir confirmação;
-   enviar a requisição `DELETE`;
-   tratar possíveis erros;
-   atualizar a lista.

O arquivo:

``` text
frontend/alunos.html
```

já possui uma coluna chamada **Ações**, portanto observe como os botões
são inseridos dinamicamente pelo JavaScript.

------------------------------------------------------------------------

# 🧪 3. Primeiro desafio: criar a rota DELETE

No `backend/main.py`, localize a função:

``` python
alterar_aluno()
```

Logo depois dela, tente criar uma nova rota.

A estrutura deverá utilizar:

``` python
@app.delete(...)
```

Pergunte a si mesmo:

> Qual endereço deverá ser utilizado para identificar o aluno que será
> excluído?

Compare com:

``` python
@app.put("/alunos/{codAluno}")
```

A resposta deverá seguir a mesma lógica.

------------------------------------------------------------------------

# 🗄️ 4. Segundo desafio: criar o comando SQL

Para excluir um registro do MySQL, qual comando SQL devemos utilizar?

A resposta começa com:

``` sql
DELETE FROM
```

Mas existe uma pergunta muito importante:

> Como garantir que apenas o aluno escolhido seja excluído?

Observe o comando utilizado no Alterar:

``` sql
UPDATE alunos
...
WHERE codAluno = %s
```

No `DELETE`, também devemos utilizar:

``` sql
WHERE codAluno = %s
```

⚠️ **Cuidado!**

Nunca faça:

``` sql
DELETE FROM alunos;
```

sem uma condição quando a intenção é excluir apenas um aluno.

Esse comando poderia excluir todos os registros da tabela.

------------------------------------------------------------------------

# 🔢 5. Terceiro desafio: verificar se o aluno existe

No Alterar, o projeto já verifica:

``` python
if cursor.rowcount == 0:
```

Pense:

> Será que podemos utilizar a mesma ideia no Excluir?

Se nenhum registro for afetado, a API deverá informar:

``` text
Aluno não encontrado.
```

Uma resposta HTTP adequada para esse caso é:

``` text
404
```

------------------------------------------------------------------------

# 💾 6. Quarto desafio: confirmar a alteração no banco

Depois de executar o comando:

``` python
cursor.execute(...)
```

lembre-se de que o projeto utiliza:

``` python
conexao.commit()
```

O `commit()` confirma a operação realizada no banco de dados.

------------------------------------------------------------------------

# 🖥️ 7. Quinto desafio: criar o botão Excluir

Abra:

``` text
frontend/js/aluno.js
```

Localize:

``` javascript
function exibirAlunos(listaAlunos)
```

Dentro dessa função existe a criação dos botões de ação.

Atualmente existe o botão:

``` text
✏️ Alterar
```

Você deverá adicionar:

``` text
🗑️ Excluir
```

O botão deverá receber o código do aluno.

Pense em algo semelhante ao:

``` javascript
onclick="alterarAluno(${aluno.codAluno})"
```

Qual seria a chamada equivalente para Excluir?

------------------------------------------------------------------------

# ❓ 8. Sexto desafio: pedir confirmação

Essa é uma das principais novidades deste capítulo.

Antes de excluir, o sistema deverá perguntar:

``` text
Deseja realmente Excluir?
```

Uma maneira simples de fazer isso em JavaScript é utilizando:

``` javascript
confirm()
```

Pesquise e teste como essa função funciona.

Ela retorna um valor que permite descobrir se o usuário confirmou ou
cancelou a operação.

Pense:

``` text
confirm()
    ↓
   SIM
    ↓
continua a exclusão

   NÃO
    ↓
cancela a operação
```

------------------------------------------------------------------------

# 🌐 9. Sétimo desafio: enviar DELETE para a API

Depois da confirmação, utilize novamente:

``` javascript
fetch()
```

No Alterar você encontrou:

``` javascript
method: "PUT"
```

Para Excluir, o método deverá ser:

``` javascript
method: "DELETE"
```

A URL deverá conter o código do aluno.

Compare:

``` javascript
`/alunos/${codAluno}`
```

com a rota criada no FastAPI.

------------------------------------------------------------------------

# 🔄 10. Oitavo desafio: atualizar a tabela

Depois que o aluno for excluído com sucesso, pense:

> Como fazer o aluno desaparecer da tabela?

Você não precisa necessariamente remover a linha manualmente.

O projeto já possui uma função responsável por carregar os alunos:

``` javascript
carregarAlunos();
```

Você pode reutilizar essa função depois da exclusão.

Assim:

``` text
DELETE
 ↓
Banco exclui
 ↓
carregarAlunos()
 ↓
GET /alunos
 ↓
nova lista
 ↓
tabela atualizada
```

------------------------------------------------------------------------

# 🧪 11. Testando a funcionalidade

Depois de implementar, teste pelo menos estes casos:

### Teste 1 --- Cancelar

1.  Clique em **Excluir**.
2.  Escolha **NÃO**.
3.  Verifique se o aluno continua na tabela.

### Teste 2 --- Confirmar

1.  Clique em **Excluir**.
2.  Escolha **SIM**.
3.  Verifique se o aluno desapareceu da tabela.

### Teste 3 --- Banco de dados

Abra o MySQL e execute:

``` sql
SELECT * FROM alunos;
```

Confirme que o registro realmente foi removido.

### Teste 4 --- Código inexistente

Tente excluir um aluno que não existe.

A API deverá retornar uma mensagem indicando:

``` text
Aluno não encontrado.
```

### Teste 5 --- Console do navegador

Abra as ferramentas do navegador:

``` text
F12
```

e observe a aba:

``` text
Console
```

Também é interessante observar a aba:

``` text
Network
```

para visualizar a requisição:

``` text
DELETE /alunos/{codAluno}
```

------------------------------------------------------------------------

# 🛠️ 12. Solução passo a passo

> **⚠️ SPOILER --- tente fazer sozinho antes de abrir!**
>
> A solução abaixo apresenta uma implementação possível para o Excluir
> de Aluno.


<details>
```

<summary>
```
`<strong>`{=html}👉 Clique aqui para revelar a solução do
Backend`</strong>`{=html}

</summary>
```
## Backend --- `backend/main.py`

Depois da função `alterar_aluno()`, adicione:

``` python
@app.delete("/alunos/{codAluno}")
def excluir_aluno(codAluno: int):

    conexao = criar_conexao()
    cursor = conexao.cursor()

    sql = """
        DELETE FROM alunos
        WHERE codAluno = %s
    """

    try:

        cursor.execute(sql, (codAluno,))

        if cursor.rowcount == 0:
            raise HTTPException(
                status_code=404,
                detail="Aluno não encontrado."
            )

        conexao.commit()

        return {
            "mensagem": "Aluno excluído com sucesso."
        }

    except IntegrityError:

        conexao.rollback()

        raise HTTPException(
            status_code=500,
            detail="Não foi possível excluir o aluno."
        )

    finally:

        cursor.close()
        conexao.close()
```

### Entendendo o código

A primeira linha cria a rota:

``` python
@app.delete("/alunos/{codAluno}")
```

Ela informa ao FastAPI que essa função responderá às requisições:

``` text
DELETE /alunos/{codAluno}
```

Por exemplo:

``` text
DELETE /alunos/5
```

significa que queremos excluir o aluno cujo código é `5`.

Depois criamos a conexão com o banco:

``` python
conexao = criar_conexao()
cursor = conexao.cursor()
```

Em seguida definimos o SQL:

``` python
sql = """
    DELETE FROM alunos
    WHERE codAluno = %s
"""
```

O `WHERE` é fundamental porque queremos excluir somente um aluno.

Depois executamos:

``` python
cursor.execute(sql, (codAluno,))
```

O `(codAluno,)` envia o código recebido pela URL para o `%s` do comando
SQL.

Depois verificamos:

``` python
if cursor.rowcount == 0:
```

Se nenhuma linha foi excluída, significa que o código informado não
corresponde a nenhum aluno.

Nesse caso:

``` python
raise HTTPException(
    status_code=404,
    detail="Aluno não encontrado."
)
```

retorna o erro `404`.

Se tudo estiver correto:

``` python
conexao.commit()
```

confirma a exclusão.

Por fim:

``` python
return {
    "mensagem": "Aluno excluído com sucesso."
}
```

envia uma resposta para o JavaScript.


</details>
```

------------------------------------------------------------------------


<details>
```

<summary>
```
`<strong>`{=html}👉 Clique aqui para revelar a solução do
JavaScript`</strong>`{=html}

</summary>
```
## Frontend --- `frontend/js/aluno.js`

Na função `exibirAlunos()`, mantenha o botão Alterar e acrescente o
botão Excluir:

``` javascript
<td>

    <button
        type="button"
        class="btn btn-warning btn-sm"
        onclick="alterarAluno(${aluno.codAluno})"
    >
        ✏️ Alterar
    </button>

    <button
        type="button"
        class="btn btn-danger btn-sm"
        onclick="excluirAluno(${aluno.codAluno}, '${aluno.nome}')"
    >
        🗑️ Excluir
    </button>

</td>
```

Observe que estamos enviando dois valores para a função:

``` javascript
aluno.codAluno
```

e:

``` javascript
aluno.nome
```

O código é necessário para saber qual registro excluir.

O nome será utilizado para deixar a confirmação mais clara para o
usuário.

Agora criamos a função:

``` javascript
async function excluirAluno(codAluno, nomeAluno) {

    const confirmar = confirm(
        `Deseja realmente excluir o aluno ${nomeAluno}?`
    );

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetch(
            `/alunos/${codAluno}`,
            {
                method: "DELETE"
            }
        );

        const resultado = await resposta.json();

        if (resposta.ok) {

            alert("Aluno excluído com sucesso!");

            carregarAlunos();

        } else {

            alert(
                "Erro: " + obterMensagemErro(resultado)
            );

            console.error(
                "Erro da API:",
                resultado
            );
        }

    } catch (erro) {

        alert(
            "Não foi possível conectar ao servidor."
        );

        console.error(
            "Erro de conexão:",
            erro
        );
    }
}
```

### Entendendo a função

Primeiro:

``` javascript
const confirmar = confirm(
    `Deseja realmente excluir o aluno ${nomeAluno}?`
);
```

abre a confirmação.

Se o usuário escolher **NÃO**:

``` javascript
if (!confirmar) {
    return;
}
```

a função termina e nada é excluído.

Se o usuário escolher **SIM**, o programa continua.

Então fazemos:

``` javascript
fetch(`/alunos/${codAluno}`, {
    method: "DELETE"
})
```

O JavaScript envia a requisição para o FastAPI.

Depois verificamos:

``` javascript
if (resposta.ok)
```

Se estiver tudo certo, mostramos:

``` javascript
alert("Aluno excluído com sucesso!");
```

e carregamos novamente os alunos:

``` javascript
carregarAlunos();
```

Dessa forma a tabela é atualizada.


</details>
```

------------------------------------------------------------------------

# 🔬 13. Entendendo o fluxo completo

Depois da implementação, o funcionamento será:

``` text
┌───────────────────────────┐
│       alunos.html         │
│                           │
│ 🗑️ Excluir               │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│       aluno.js            │
│                           │
│ excluirAluno(codAluno)    │
└─────────────┬─────────────┘
              │
              ▼
        confirm()
              │
       ┌──────┴──────┐
       │             │
      NÃO           SIM
       │             │
       ▼             ▼
    Cancela      fetch()
                     │
                     │ DELETE
                     ▼
┌───────────────────────────┐
│        FastAPI            │
│                           │
│ DELETE /alunos/{id}       │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│          MySQL            │
│                           │
│ DELETE FROM alunos        │
│ WHERE codAluno = %s       │
└─────────────┬─────────────┘
              │
              ▼
        commit()
              │
              ▼
┌───────────────────────────┐
│       aluno.js            │
│                           │
│ carregarAlunos()          │
└─────────────┬─────────────┘
              │
              ▼
       Tabela atualizada
```

------------------------------------------------------------------------

# 📚 14. O CRUD completo

Com a implementação do Excluir, o módulo de alunos passa a possuir as
quatro operações fundamentais:

  Operação    Método HTTP   Endpoint
  ----------- ------------- ----------------------
  Cadastrar   `POST`        `/alunos`
  Listar      `GET`         `/alunos`
  Alterar     `PUT`         `/alunos/{codAluno}`
  Excluir     `DELETE`      `/alunos/{codAluno}`

Isso representa o conceito de **CRUD**:

``` text
C → Create  → Criar
R → Read    → Ler
U → Update  → Atualizar
D → Delete  → Excluir
```

------------------------------------------------------------------------

# 🎯 15. Desafio final --- Professor e Funcionário

Agora que você conseguiu implementar o Excluir para Aluno, **não copie
simplesmente o código**.

Tente descobrir quais partes precisam ser modificadas para implementar a
mesma funcionalidade para:

### 👨‍🏫 Professor

Você deverá criar:

``` text
DELETE /professores/{codProf}
```

e implementar:

``` javascript
excluirProfessor()
```

### 👔 Funcionário

Você deverá criar:

``` text
DELETE /funcionarios/{codFunc}
```

e implementar:

``` javascript
excluirFuncionario()
```

Observe que a estrutura é praticamente a mesma, mas os nomes mudam.

  Aluno              Professor              Funcionário
  ------------------ ---------------------- ------------------------
  `alunos`           `professor`            `funcionario`
  `codAluno`         `codProf`              `codFunc`
  `excluirAluno()`   `excluirProfessor()`   `excluirFuncionario()`
  `/alunos/`         `/professores/`        `/funcionarios/`

------------------------------------------------------------------------

# 📝 Atividade

Implemente o Excluir para:

-   [ ] Aluno
-   [ ] Professor
-   [ ] Funcionário

Cada implementação deverá possuir:

-   [ ] Botão **🗑️ Excluir**
-   [ ] Confirmação antes da exclusão
-   [ ] Requisição HTTP `DELETE`
-   [ ] Rota `DELETE` no FastAPI
-   [ ] Comando SQL `DELETE`
-   [ ] `WHERE` utilizando o código do registro
-   [ ] Verificação de registro inexistente
-   [ ] Mensagem de sucesso
-   [ ] Atualização da tabela após a exclusão

------------------------------------------------------------------------

# ⚠️ Cuidados importantes

### 1. Nunca esqueça o `WHERE`

Errado:

``` sql
DELETE FROM alunos;
```

Correto:

``` sql
DELETE FROM alunos
WHERE codAluno = %s;
```

### 2. Não exclua antes da confirmação

A confirmação deve acontecer **antes** da requisição `DELETE`.

### 3. Use o código correto

Aluno:

``` text
codAluno
```

Professor:

``` text
codProf
```

Funcionário:

``` text
codFunc
```

### 4. Teste o banco

Não confie apenas na mensagem exibida na tela.

Confirme no MySQL:

``` sql
SELECT * FROM alunos;
```

------------------------------------------------------------------------

# 🚀 Conclusão

Neste capítulo você implementou uma das operações mais importantes de um
sistema CRUD: a **exclusão de registros**.

Mais importante do que simplesmente fazer o código funcionar é entender
o caminho completo:

``` text
Interface
   ↓
JavaScript
   ↓
HTTP DELETE
   ↓
FastAPI
   ↓
SQL DELETE
   ↓
MySQL
```

Agora tente realizar sozinho a mesma implementação para **Professor e
Funcionário**.

**Bom trabalho e bons testes! 🚀**

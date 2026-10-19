# Aula 10 --- Alterando registros com React e FastAPI

## Projeto: Sistema de Gestão Escolar

Nas aulas anteriores, criamos a página inicial do sistema, implementamos
a consulta e o cadastro de alunos e acrescentamos filtros à listagem.
Nesta aula, vamos implementar a **alteração de alunos**, reproduzindo o
comportamento que já existe na versão do sistema feita com FastAPI.

Ao final, a página de alunos deverá permitir: - Visualizar os alunos
cadastrados. - Filtrar os registros. - Cadastrar um novo aluno. -
Selecionar um aluno para alterar seus dados. - Salvar as alterações e
atualizar a tabela.

Depois de concluir e testar o módulo de alunos, você deverá implementar
a mesma funcionalidade para professores e funcionários como exercício.

> **Importante:** o React envia os dados para a API. A validação e a
> gravação no banco MySQL continuam sendo responsabilidade do FastAPI.

------------------------------------------------------------------------

## 1. Antes de começar

Confirme que: 1. A listagem de alunos está funcionando. 2. O cadastro de
alunos está funcionando. 3. Os filtros estão funcionando. 4. O FastAPI
possui um endpoint de alteração de aluno.

Mantenha os dois servidores em execução.

**Terminal 1 --- FastAPI**, dentro da pasta do backend:

``` bash
python -m uvicorn backend.main:app --reload
```

**Terminal 2 --- React**, dentro de `cadastro-alunos-react`:

``` bash
npm run dev
```

Você pode consultar as rotas disponíveis em
<http://127.0.0.1:8000/docs>.

## 2. Entender o processo de alteração

O fluxo será:

1.  O usuário clica em **Alterar** na linha de um aluno.
2.  O React preenche o formulário com os dados atuais daquele aluno.
3.  O usuário modifica os campos desejados.
4.  Ao clicar em **Salvar alterações**, o React envia uma requisição
    HTTP `PUT` para o FastAPI.
5.  O FastAPI atualiza o registro no MySQL.
6.  O React mostra uma mensagem e atualiza a tabela.

Vamos reutilizar o formulário de cadastro que já existe. Assim, não
precisaremos criar uma segunda tela com campos repetidos.

## 3. Passo 1 --- Conferir a rota no FastAPI

Antes de programar o React, abra a documentação interativa:

<http://127.0.0.1:8000/docs>

Localize o endpoint de alteração de alunos. Neste roteiro, vamos
considerar a rota:

``` text
PUT /alunos/{codAluno}
```

Ela recebe o identificador do aluno na URL e os novos dados no corpo da
requisição.

**Confira o nome real da rota e o método HTTP no seu backend.** Se a sua
aplicação usa outro caminho, como `/alunos/{id}`, ajuste a URL no
`api.js` para corresponder ao FastAPI. Não é necessário alterar o
backend se a rota já está funcionando.

## 4. Passo 2 --- Criar a função `alterarAluno()` na API

Abra:

``` text
src/services/api.js
```

Mantenha as funções existentes, especialmente `listarAlunos()` e
`cadastrarAluno()`. Acrescente a função abaixo. Se `alterarAluno()` já
existir, confira se está equivalente em vez de duplicá-la.

``` javascript
export async function alterarAluno(codAluno, aluno) {
  const resposta = await fetch(
    `${API_URL}/alunos/${codAluno}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aluno),
    }
  );

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      typeof dados.detail === "string"
        ? dados.detail
        : "Não foi possível alterar o aluno."
    );
  }

  return dados;
}
```

A constante `API_URL` deve continuar declarada apenas uma vez no
arquivo. Se a rota do seu FastAPI for diferente, adapte o caminho usado
no `fetch()`.

### O que esse código faz?

-   Recebe o código do aluno e os dados atualizados.
-   Envia uma requisição `PUT`.
-   Transforma o objeto JavaScript em JSON.
-   Verifica se a API retornou uma resposta de sucesso.
-   Devolve os dados da resposta para o componente React.

## 5. Passo 3 --- Importar a função em `Alunos.jsx`

Abra:

``` text
src/pages/Alunos.jsx
```

No início do arquivo, você já deve ter uma importação semelhante a esta:

``` jsx
import { listarAlunos, cadastrarAluno } from "../services/api";
```

Acrescente `alterarAluno` à mesma importação:

``` jsx
import {
  listarAlunos,
  cadastrarAluno,
  alterarAluno,
} from "../services/api";
```

Não crie duas importações separadas com os mesmos nomes.

## 6. Passo 4 --- Criar um estado para identificar o aluno em edição

Dentro do componente `Alunos()`, junto dos outros estados `useState`,
acrescente:

``` jsx
const [alunoEditando, setAlunoEditando] = useState(null);
```

Esse estado guarda o código do aluno que está sendo alterado.

-   `null`: o formulário está em modo de cadastro.
-   Um código, como `3`: o formulário está alterando o aluno de código
    3.

## 7. Passo 5 --- Criar a função que prepara o formulário

Dentro de `Alunos()`, antes do `return`, acrescente:

``` jsx
function prepararEdicao(aluno) {
  setFormulario({
    nome: aluno.nome ?? "",
    cpf: aluno.cpf ?? "",
    email: aluno.email ?? "",
    data_nascimento: aluno.data_nascimento
      ? String(aluno.data_nascimento).slice(0, 10)
      : "",
    telefone: aluno.telefone ?? "",
    ra: aluno.ra ?? "",
    cidade: aluno.cidade ?? "",
  });

  setAlunoEditando(aluno.codAluno);
  setMensagem("");
  setErro("");
  setSearchParams({ acao: "cadastrar" });
}
```

A função recebe o aluno selecionado, coloca os valores atuais nos campos
do formulário e registra seu código em `alunoEditando`.

O estado `searchParams` é utilizado no projeto para controlar a abertura
do formulário por meio de `?acao=cadastrar`. Vamos reaproveitar essa
lógica para exibir o mesmo formulário durante a alteração.

Se a sua página não usa `useSearchParams`, utilize o estado que já
controla a visibilidade do formulário e adapte essa última linha.

## 8. Passo 6 --- Adaptar a função de salvar

Localize a função `salvarAluno` que já existe no arquivo. Atualmente,
ela chama `cadastrarAluno(formulario)`.

Substitua a função inteira por:

``` jsx
async function salvarAluno(evento) {
  evento.preventDefault();
  setSalvando(true);
  setErro("");
  setMensagem("");

  try {
    if (alunoEditando !== null) {
      await alterarAluno(alunoEditando, formulario);
      setMensagem("Aluno alterado com sucesso!");
    } else {
      await cadastrarAluno(formulario);
      setMensagem("Aluno cadastrado com sucesso!");
    }

    setFormulario(formularioVazio);
    setAlunoEditando(null);
    setSearchParams({});
    await carregarAlunos();
  } catch (erro) {
    setErro(erro.message || "Não foi possível salvar o aluno.");
  } finally {
    setSalvando(false);
  }
}
```

A lógica verifica o estado `alunoEditando`:

-   Se ele for `null`, chama `cadastrarAluno()`.
-   Se contiver um código, chama `alterarAluno()`.

Dessa forma, um único formulário atende às duas operações.

> Se no seu arquivo os estados ou as funções tiverem nomes diferentes,
> mantenha os nomes já usados no projeto e adapte o exemplo. O
> importante é preservar o tratamento de erros e sempre atualizar a
> listagem depois de uma operação bem-sucedida.

## 9. Passo 7 --- Alterar o título e o texto do botão do formulário

Dentro do formulário, localize:

``` jsx
<h2>Novo aluno</h2>
```

Substitua por:

``` jsx
<h2>
  {alunoEditando !== null ? "Alterar aluno" : "Novo aluno"}
</h2>
```

Depois, localize o botão de envio, que atualmente pode estar assim:

``` jsx
{salvando ? "Salvando..." : "Salvar aluno"}
```

Substitua o texto por:

``` jsx
{salvando
  ? "Salvando..."
  : alunoEditando !== null
    ? "Salvar alterações"
    : "Cadastrar aluno"}
```

Agora o formulário deixará claro se está cadastrando um novo registro ou
alterando um registro existente.

## 10. Passo 8 --- Criar o botão Alterar na tabela

Na tabela de alunos, localize o trecho que percorre os registros:

``` jsx
{alunosFiltrados.map((aluno) => (
```

Se você já implementou os filtros, mantenha `alunosFiltrados`. Se ainda
não os implementou, o trecho poderá ser `alunos.map(...)`.

No cabeçalho da tabela, acrescente uma coluna para ações:

``` jsx
<th>Ações</th>
```

Dentro de cada linha, depois das células com os dados do aluno,
acrescente:

``` jsx
<td>
  <button
    type="button"
    className="botao botao-editar"
    onClick={() => prepararEdicao(aluno)}
  >
    Alterar
  </button>
</td>
```

Cada botão recebe o objeto do aluno daquela linha. Ao clicar,
`prepararEdicao(aluno)` preenche o formulário com os dados
correspondentes.

Se a tabela já possui uma coluna **Ações** com o botão **Excluir**, não
crie outra coluna. Coloque o botão **Alterar** ao lado do botão
existente, dentro da mesma célula.

### Ajustar a mensagem de tabela vazia

Se a tabela tinha oito colunas e agora ganhou uma coluna de ações,
ajuste o `colSpan` da mensagem de nenhum resultado para `9`. Se a sua
tabela tiver outra quantidade de colunas, use o número correspondente.

## 11. Passo 9 --- Estilizar o botão Alterar

Abra `src/App.css`. Se ainda não existir uma classe para o botão,
acrescente:

``` css
.botao-editar {
  background: #0f766e;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
}

.botao-editar:hover {
  background: #115e59;
}
```

Se essa classe já existir, não é necessário duplicá-la.

## 12. Passo 10 --- Testar a alteração

Com os dois servidores funcionando, acesse:

<http://localhost:5173/alunos>

Realize os seguintes testes:

1.  Localize um aluno na tabela.
2.  Clique em **Alterar**.
3.  Confira se o formulário aparece preenchido com os dados do aluno.
4.  Modifique a cidade ou o telefone.
5.  Clique em **Salvar alterações**.
6.  Confira se aparece a mensagem de sucesso.
7.  Verifique se a tabela apresenta os dados atualizados.
8.  Atualize o navegador e confira se a alteração continua salva.
9.  Teste abrir o formulário de cadastro para confirmar que ele continua
    funcionando.
10. Cancele uma alteração sem salvar e confira que os dados no banco não
    foram modificados.

### Se ocorrer um erro

-   Confira a URL e o método HTTP da rota no FastAPI.
-   Confira se `alterarAluno` está exportada em `api.js` e importada em
    `Alunos.jsx`.
-   Veja a mensagem do Console do navegador e o terminal do FastAPI.
-   Se a API retornar erro de validação, confira se os campos enviados
    correspondem ao schema de alteração.
-   Se a atualização ocorrer, mas a tabela não mudar, confira se
    `carregarAlunos()` é chamada depois de salvar.

------------------------------------------------------------------------

## 13. Exercício --- Implementar Alterar para professores e funcionários

Agora você deverá aplicar o mesmo padrão aos outros módulos.

### Parte A --- Professores

No arquivo `src/pages/Professores.jsx`:

1.  Crie o estado `professorEditando`.
2.  Crie a função `alterarProfessor()` em `src/services/api.js`,
    utilizando o endpoint de alteração existente no FastAPI.
3.  Crie a função `prepararEdicao(professor)` para preencher o
    formulário.
4.  Adicione o botão **Alterar** em cada linha da tabela.
5.  Adapte a função de salvar para decidir entre cadastrar e alterar.
6.  Atualize o título e o texto do botão do formulário.
7.  Atualize a listagem após uma alteração bem-sucedida.

### Parte B --- Funcionários

No arquivo `src/pages/Funcionarios.jsx`:

1.  Crie o estado `funcionarioEditando`.
2.  Crie a função `alterarFuncionario()` em `src/services/api.js`.
3.  Crie a função `prepararEdicao(funcionario)`.
4.  Adicione o botão **Alterar** à tabela.
5.  Adapte a função de salvar para cadastrar ou alterar.
6.  Atualize o formulário e a mensagem de sucesso.
7.  Atualize a listagem depois de salvar.

Consulte `http://127.0.0.1:8000/docs` para confirmar os caminhos, os
métodos HTTP e os nomes dos campos das rotas de professores e
funcionários. Não suponha que os endpoints sejam idênticos sem
verificar.

## 14. Critérios de conclusão

-   O botão **Alterar** aparece na tabela de alunos.
-   Ao clicar nele, o formulário é preenchido com os dados do aluno
    selecionado.
-   O formulário permite modificar os dados e salvar.
-   O React utiliza o método HTTP `PUT` para enviar a alteração.
-   A tabela é atualizada após salvar.
-   O cadastro de novos alunos continua funcionando.
-   O aluno consegue implementar o mesmo comportamento para professores
    e funcionários.

## 15. Perguntas para revisão

1.  Qual é a diferença entre `POST` e `PUT` neste projeto?
2.  Por que precisamos guardar o código do aluno que está sendo
    alterado?
3.  Qual é a função de `prepararEdicao()`?
4.  Por que podemos reutilizar o formulário de cadastro?
5.  Por que precisamos chamar `carregarAlunos()` depois de alterar?
6.  Qual é a responsabilidade do React e qual é a responsabilidade do
    FastAPI nesse processo?

**Resultado esperado:** o módulo de alunos permitirá consultar, filtrar,
cadastrar e alterar registros. Professores e funcionários deverão
receber a mesma funcionalidade como exercício.


# Próximo capítulo

No próximo capítulo vamos excluir dados do projeto em REACT.

[➡️ **Capítulo 11 — Excluindo dados do Projeto em React**](https://github.com/pedroAmalfi/livro-api-python-fastapi/tree/main/livro/11-excluir-react)

# Aula 11 --- Excluir Alunos com React e FastAPI

## 🎯 Desafio: implemente a exclusão antes de consultar a solução!

Nas aulas anteriores, você implementou a consulta, o cadastro, os
filtros e a alteração de alunos utilizando React e FastAPI.

Agora, o desafio é implementar a funcionalidade de **excluir alunos** na
página `Alunos.jsx`, seguindo o mesmo comportamento que já existe na
versão do sistema feita com FastAPI.

**Primeiro, tente implementar sozinho!** Releia como você criou o botão
**Alterar**, como chamou uma função do arquivo `services/api.js` e como
atualizou a listagem depois de uma operação.

Seu objetivo é:

-   Criar um botão **Excluir** em cada linha da tabela de alunos.
-   Pedir confirmação antes de excluir.
-   Enviar uma requisição `DELETE` para o FastAPI.
-   Exibir uma mensagem de sucesso ou erro.
-   Atualizar a listagem depois da exclusão.
-   Manter funcionando a consulta, o filtro, o cadastro e a alteração.

> ⚠️ A exclusão é uma operação permanente no banco de dados. Teste com
> cuidado e confirme sempre se está excluindo o registro correto.

### ✅ Regras do desafio

1.  Implemente primeiro somente para alunos.
2.  Não apague nem substitua as funcionalidades já implementadas.
3.  Reutilize a organização do projeto: `pages/Alunos.jsx` e
    `services/api.js`.
4.  Consulte a documentação do FastAPI em <http://127.0.0.1:8000/docs>
    para confirmar a rota de exclusão.
5.  Só abra a solução abaixo se realmente não conseguir avançar.

------------------------------------------------------------------------

## 🕵️ Spoiler --- solução passo a passo

Se você tentou e ainda não conseguiu, clique para revelar a solução. Não
vale espiar antes de tentar! 😄

<details>

<summary>

👉 Clique aqui para revelar a solução

</summary>

### Passo 1 --- Confira a rota de exclusão no FastAPI

Abra <http://127.0.0.1:8000/docs> e localize a rota de exclusão de
alunos. Neste roteiro, consideramos:

``` text
DELETE /alunos/{codAluno}
```

Confirme o caminho e o nome do parâmetro no seu backend. Se a rota real
for diferente, use o endereço que aparece na documentação.

### Passo 2 --- Criar a função `excluirAluno()` em `services/api.js`

Abra `src/services/api.js`. Preserve as funções existentes e acrescente
a função abaixo. Se ela já existir, confira se está equivalente em vez
de duplicá-la.

``` javascript
export async function excluirAluno(codAluno) {
  const resposta = await fetch(`${API_URL}/alunos/${codAluno}`, {
    method: "DELETE",
  });

  if (!resposta.ok) {
    let mensagem = "Não foi possível excluir o aluno.";

    try {
      const dados = await resposta.json();

      if (typeof dados.detail === "string") {
        mensagem = dados.detail;
      }
    } catch {
      // A API pode responder sem um corpo JSON.
    }

    throw new Error(mensagem);
  }

  // Algumas APIs respondem com HTTP 204 e não enviam JSON.
  if (resposta.status === 204) {
    return;
  }

  return resposta.json();
}
```

A constante `API_URL` deve continuar declarada uma única vez no arquivo.
A função usa o método HTTP `DELETE` para solicitar ao FastAPI a exclusão
do aluno cujo código foi informado.

### Passo 3 --- Importar `excluirAluno()` em `Alunos.jsx`

No início de `src/pages/Alunos.jsx`, acrescente `excluirAluno` à
importação das funções da API.

Por exemplo, se o arquivo já importa as funções de listagem, cadastro e
alteração:

``` jsx
import {
  listarAlunos,
  cadastrarAluno,
  alterarAluno,
  excluirAluno,
} from "../services/api";
```

Mantenha também todas as importações que o seu componente já utiliza.

### Passo 4 --- Criar a função para excluir o aluno

Dentro do componente `Alunos()`, antes do `return`, acrescente:

``` jsx
async function removerAluno(codAluno) {
  const confirmar = window.confirm(
    "Tem certeza de que deseja excluir este aluno? Essa ação não poderá ser desfeita."
  );

  if (!confirmar) {
    return;
  }

  setErro("");
  setMensagem("");

  try {
    await excluirAluno(codAluno);
    setMensagem("Aluno excluído com sucesso!");
    await carregarAlunos();
  } catch (erro) {
    setErro(erro.message || "Não foi possível excluir o aluno.");
  }
}
```

Essa função:

1.  Apresenta uma confirmação.
2.  Interrompe a operação se o usuário cancelar.
3.  Chama `excluirAluno(codAluno)`.
4.  Mostra uma mensagem se a operação for bem-sucedida.
5.  Atualiza a tabela com `carregarAlunos()`.
6.  Mostra o erro caso a API não consiga excluir o registro.

O exemplo pressupõe que seu componente já tenha os estados `erro` e
`mensagem` e a função `carregarAlunos()`, utilizados nas etapas
anteriores. Se seus nomes forem diferentes, adapte-os aos que já
existem.

### Passo 5 --- Adicionar o botão na tabela

Na tabela de `Alunos.jsx`, localize a linha que mostra cada aluno. Ela
deve estar dentro de algo semelhante a:

``` jsx
{alunosFiltrados.map((aluno) => (
  <tr key={aluno.codAluno}>
    {/* células com os dados do aluno */}
  </tr>
))}
```

Se você ainda não implementou filtros, poderá encontrar
`alunos.map(...)`. Preserve a lista que já utiliza no seu projeto.

Na coluna de ações, coloque o botão **Excluir**:

``` jsx
<button
  type="button"
  className="botao botao-excluir"
  onClick={() => removerAluno(aluno.codAluno)}
>
  Excluir
</button>
```

Se já existe uma coluna **Ações** com o botão **Alterar**, coloque o
botão **Excluir** na mesma célula, ao lado dele. Não crie uma segunda
coluna de ações.

### Passo 6 --- Estilizar o botão

Abra `src/App.css` e acrescente, caso ainda não exista uma classe
equivalente:

``` css
.botao-excluir {
  background: #b91c1c;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
}

.botao-excluir:hover {
  background: #991b1b;
}
```

Se o projeto já possui essa classe, não é necessário duplicá-la.

### Passo 7 --- Testar a funcionalidade

Com o FastAPI e o React em execução:

1.  Abra <http://localhost:5173/alunos>.
2.  Escolha um registro de teste.
3.  Clique em **Excluir**.
4.  Confirme que a caixa de confirmação aparece.
5.  Clique em **Cancelar** e confira que o aluno permanece na tabela.
6.  Clique novamente em **Excluir** e confirme a operação.
7.  Verifique a mensagem de sucesso e se o registro desapareceu da
    listagem.
8.  Atualize o navegador e confirme que o registro continua excluído.
9.  Teste os filtros, o cadastro e a alteração para garantir que
    continuam funcionando.

Se ocorrer um erro, confira a rota `DELETE` em `/docs`, o terminal do
FastAPI e o Console do navegador. Verifique também se o endpoint retorna
JSON ou uma resposta sem corpo, como HTTP 204.


</details>


------------------------------------------------------------------------

## 🧪 Exercício --- implemente a exclusão para professores e funcionários

Depois de concluir e testar a exclusão de alunos, implemente o mesmo
comportamento nos outros módulos, **sem copiar e colar cegamente**.
Adapte os nomes das funções, identificadores e rotas.

### Parte A --- Professores

No projeto React:

1.  Crie `excluirProfessor()` em `src/services/api.js`.
2.  Confira no FastAPI o endpoint `DELETE` para professores.
3.  Importe a função em `src/pages/Professores.jsx`.
4.  Crie uma função que peça confirmação antes de excluir.
5.  Adicione o botão **Excluir** à tabela de professores.
6.  Exiba mensagem de sucesso ou erro.
7.  Atualize a listagem depois da exclusão.

### Parte B --- Funcionários

Repita o processo para funcionários:

1.  Crie `excluirFuncionario()` em `src/services/api.js`.
2.  Confira a rota `DELETE` no FastAPI.
3.  Importe a função em `src/pages/Funcionarios.jsx`.
4.  Peça confirmação antes de excluir.
5.  Adicione o botão **Excluir** à tabela.
6.  Trate sucesso e erros.
7.  Atualize a listagem após a operação.

Use <http://127.0.0.1:8000/docs> para confirmar os caminhos das rotas e
os nomes dos parâmetros. Eles podem ser diferentes entre alunos,
professores e funcionários.

## ✅ Checklist de conclusão

-   [ ] O botão **Excluir** aparece na tabela de alunos.
-   [ ] O sistema pede confirmação antes de excluir.
-   [ ] Cancelar a confirmação mantém o registro.
-   [ ] Confirmar envia uma requisição `DELETE`.
-   [ ] A mensagem de sucesso ou erro é exibida.
-   [ ] A tabela é atualizada após a exclusão.
-   [ ] Consulta, filtros, cadastro e alteração continuam funcionando.
-   [ ] A exclusão de professores foi implementada.
-   [ ] A exclusão de funcionários foi implementada.

## 💭 Perguntas para revisão

1.  Qual é a finalidade do método HTTP `DELETE`?
2.  Por que pedimos confirmação antes de excluir?
3.  Qual é a responsabilidade do React e qual é a do FastAPI?
4.  Por que chamamos `carregarAlunos()` depois de excluir?
5.  Por que devemos conferir a rota e o parâmetro de identificação na
    documentação da API?
6.  Qual é a diferença entre cancelar a confirmação e receber um erro do
    servidor?

**Resultado esperado:** o sistema permitirá consultar, filtrar,
cadastrar, alterar e excluir alunos. Você deverá aplicar a mesma
funcionalidade a professores e funcionários para concluir a atividade.

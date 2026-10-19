# Aula 09 --- Filtrando registros no React

## Projeto: Sistema de Gestão Escolar

Na aula anterior, implementamos o cadastro de alunos usando React e
FastAPI. Agora vamos acrescentar **filtros à página de visualização de
alunos**, permitindo que o usuário encontre registros sem precisar
percorrer toda a tabela.

O objetivo é reproduzir no React o comportamento de filtragem que já
existe na versão do sistema feita com FastAPI. Nesta atividade, o filtro
será implementado **somente para alunos**. Ao final, você deverá aplicar
o mesmo padrão às páginas de professores e funcionários como exercício.

------------------------------------------------------------------------

## 1. O que vamos construir?

Na página de alunos, teremos:

-   Um seletor para escolher o campo que será pesquisado.
-   Um campo de texto para digitar o valor procurado.
-   Um botão **Filtrar**.
-   Um botão **Limpar** para voltar a mostrar todos os registros.
-   Uma tabela que exibe apenas os alunos correspondentes ao filtro.
-   Uma mensagem quando nenhum aluno for encontrado.

Os filtros serão feitos no React, usando os dados que já foram recebidos
pela API `GET /alunos`. Não será necessário alterar o backend nem criar
uma nova rota.

## 2. Como deve funcionar?

Exemplo: se o usuário escolher **Nome** e digitar `ana`, a tabela deverá
mostrar os alunos cujo nome contém esse texto, sem diferenciar
maiúsculas de minúsculas.

O filtro será feito no navegador, depois que o React receber a lista
completa da API. Isso é adequado para esta atividade didática e listas
pequenas. Em sistemas com muitos registros, pode ser melhor realizar a
filtragem no backend.

## 3. Passo 1 --- Abrir o arquivo correto

No VS Code, abra:

``` text
cadastro-alunos-react/
└── src/
    └── pages/
        └── Alunos.jsx
```

Não vamos modificar `Home.jsx`, `api.js` nem o backend nesta aula. O
filtro será implementado na página que já exibe a tabela de alunos.

## 4. Passo 2 --- Criar os estados do filtro

No início de `Alunos.jsx`, localize os estados que já existem dentro da
função `Alunos()`:

``` jsx
const [alunos, setAlunos] = useState([]);
```

Mantenha esse estado e acrescente os dois abaixo:

``` jsx
const [campoFiltro, setCampoFiltro] = useState("nome");
const [textoFiltro, setTextoFiltro] = useState("");
```

Esses estados guardam:

-   `campoFiltro`: qual campo será pesquisado.
-   `textoFiltro`: qual texto o usuário digitou.

## 5. Passo 3 --- Criar a lógica de filtragem

Dentro da função `Alunos()`, depois dos estados e antes do `return`,
acrescente:

``` jsx
const alunosFiltrados = alunos.filter((aluno) => {
  const valor = aluno[campoFiltro];

  if (valor === null || valor === undefined) {
    return false;
  }

  return String(valor)
    .toLowerCase()
    .includes(textoFiltro.trim().toLowerCase());
});
```

### Entenda o código

-   `filter()` percorre os alunos e cria uma nova lista apenas com os
    registros que atendem à condição.
-   `aluno[campoFiltro]` acessa a propriedade escolhida no seletor.
-   `String(valor)` permite comparar campos que não sejam originalmente
    texto, como o código do aluno.
-   `toLowerCase()` ignora diferenças entre letras maiúsculas e
    minúsculas.
-   `trim()` remove espaços no começo e no fim da busca.
-   `includes()` verifica se o campo contém o texto informado.

Quando `textoFiltro` estiver vazio, `includes("")` será verdadeiro para
todos os campos existentes. Assim, todos os alunos serão exibidos.

## 6. Passo 4 --- Adicionar os controles acima da tabela

No `return` de `Alunos.jsx`, localize o trecho que mostra o título
**Alunos cadastrados** e a tabela.

Logo antes da tabela, acrescente o bloco abaixo. Ele pode ficar depois
do formulário de cadastro e antes do título da listagem:

``` jsx
<section className="filtros">
  <label>
    Filtrar por
    <select
      value={campoFiltro}
      onChange={(evento) => setCampoFiltro(evento.target.value)}
    >
      <option value="codAluno">Código</option>
      <option value="nome">Nome</option>
      <option value="cpf">CPF</option>
      <option value="email">E-mail</option>
      <option value="data_nascimento">Data de nascimento</option>
      <option value="telefone">Telefone</option>
      <option value="ra">RA</option>
      <option value="cidade">Cidade</option>
    </select>
  </label>

  <label>
    Texto para buscar
    <input
      type="text"
      value={textoFiltro}
      onChange={(evento) => setTextoFiltro(evento.target.value)}
      placeholder="Digite o que deseja encontrar"
    />
  </label>

  <button
    type="button"
    className="botao botao-principal"
    onClick={() => setTextoFiltro((texto) => texto.trim())}
  >
    Filtrar
  </button>

  <button
    type="button"
    className="botao botao-secundario"
    onClick={() => {
      setCampoFiltro("nome");
      setTextoFiltro("");
    }}
  >
    Limpar
  </button>
</section>
```

O campo de texto atualiza o estado conforme o usuário digita, então a
lista filtrada será atualizada automaticamente. O botão **Filtrar**
mantém a interação explícita solicitada nesta atividade e remove espaços
extras no início e no fim do texto. O botão **Limpar** volta à listagem
completa.

## 7. Passo 5 --- Mostrar a lista filtrada na tabela

Na tabela, localize o trecho que percorre a lista original:

``` jsx
{alunos.map((aluno) => (
```

Troque **somente** `alunos.map` por `alunosFiltrados.map`:

``` jsx
{alunosFiltrados.map((aluno) => (
```

Não altere os campos das colunas. Eles devem continuar correspondendo à
estrutura retornada pelo endpoint `/alunos`.

Em seguida, localize a mensagem que informa que não há alunos
cadastrados. Substitua o trecho condicional por:

``` jsx
{alunosFiltrados.length === 0 && (
  <tr>
    <td colSpan="9">
      {alunos.length === 0
        ? "Nenhum aluno cadastrado."
        : "Nenhum aluno encontrado para esse filtro."}
    </td>
  </tr>
)}
```

A tabela possui nove colunas quando a coluna de ações está presente. Se
sua tabela tiver oito colunas, use `colSpan="8"`.

## 8. Passo 6 --- Estilizar os filtros

Abra `src/App.css` e acrescente:

``` css
.filtros {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 12px;
  margin: 20px 0;
  padding: 16px;
  background: white;
  border-radius: 8px;
}

.filtros label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 180px;
}

.filtros input,
.filtros select {
  min-height: 40px;
  padding: 8px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font: inherit;
}

.filtros button {
  min-height: 40px;
}

@media (max-width: 600px) {
  .filtros {
    align-items: stretch;
    flex-direction: column;
  }

  .filtros label {
    width: 100%;
  }
}
```

Se a classe `.filtros` ou os estilos de `input` já existirem, adapte as
regras em vez de duplicá-las.

## 9. Passo 7 --- Testar os filtros

Mantenha o FastAPI e o React em execução. Abra
`http://localhost:5173/alunos` e teste:

1.  Selecione **Nome** e digite parte do nome de um aluno.
2.  Pesquise um e-mail usando apenas parte do endereço.
3.  Selecione **Cidade** e informe uma cidade presente no banco.
4.  Selecione **Código** e digite um número.
5.  Digite um valor que não exista e confira a mensagem de nenhum
    resultado.
6.  Clique em **Limpar** e confira se todos os alunos voltam a aparecer.
7.  Confira se o cadastro de aluno continua funcionando.

### Se o filtro não funcionar

-   Confirme que os valores dos `<option>` são iguais aos nomes das
    propriedades recebidas da API.
-   Verifique se a tabela percorre `alunosFiltrados`, e não `alunos`.
-   Confira o Console do navegador para mensagens de erro.
-   Verifique se a listagem original ainda carrega antes de testar o
    filtro.

------------------------------------------------------------------------

## 10. Exercício --- Implementar os filtros para professores e funcionários

Agora que o filtro de alunos está funcionando, implemente o mesmo
recurso nas outras duas páginas.

### Parte A --- Professores

No arquivo `src/pages/Professores.jsx`:

1.  Crie os estados `campoFiltro` e `textoFiltro`.
2.  Crie uma lista `professoresFiltrados` usando `filter()`.
3.  Acrescente o seletor de campo e o campo de busca acima da tabela.
4.  Inclua os botões **Filtrar** e **Limpar**.
5.  Altere a tabela para percorrer `professoresFiltrados`.
6.  Mostre uma mensagem quando nenhum professor corresponder à busca.

Sugestões de campos, conforme existirem na resposta do seu FastAPI:
código, nome, CPF, e-mail, data de nascimento, telefone e cidade.
Confira o nome exato do identificador no backend antes de montar as
opções.

### Parte B --- Funcionários

Repita o processo em `src/pages/Funcionarios.jsx`:

1.  Crie os estados do filtro.
2.  Crie a lista `funcionariosFiltrados`.
3.  Adicione os controles de busca.
4.  Atualize a tabela para usar a lista filtrada.
5.  Implemente os botões **Filtrar** e **Limpar**.
6.  Mostre a mensagem adequada quando nenhum funcionário for encontrado.

Você pode reutilizar os estilos da classe `.filtros` criados para
alunos.

## 11. Critérios de conclusão

-   A tela de alunos permite selecionar o campo de pesquisa.
-   A busca funciona para texto parcial e ignora diferenças entre
    maiúsculas e minúsculas.
-   É possível filtrar por código e por outros campos existentes.
-   O botão **Limpar** restaura a listagem completa.
-   Uma mensagem é exibida quando nenhum registro corresponde à busca.
-   A listagem e o cadastro continuam funcionando.
-   Os filtros de professores e funcionários foram implementados como
    exercício.

## 12. Perguntas para revisão

1.  Para que serve o método `filter()`?
2.  Qual é a diferença entre `includes()` e `===`?
3.  Por que usamos `toLowerCase()`?
4.  Qual é a função de `trim()`?
5.  Por que guardamos `campoFiltro` e `textoFiltro` com `useState`?
6.  Precisamos alterar o FastAPI para implementar este filtro no React?
    Por quê?
7.  Qual é a diferença entre filtrar os dados no React e filtrar os
    dados no backend?

**Resultado esperado:** a tela de alunos terá filtros funcionais
semelhantes aos da versão anterior do sistema. Os estudantes deverão
aplicar o mesmo padrão às páginas de professores e funcionários.


# Próximo capítulo

No próximo capítulo vamos alterar dados do projeto em REACT.

[➡️ **Capítulo 10 — Alterando dados do Projeto em React**](https://github.com/pedroAmalfi/livro-api-python-fastapi/tree/main/livro/10-alterando-react)

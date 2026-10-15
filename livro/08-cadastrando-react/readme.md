# Aula 08 --- Cadastrando dados com React e FastAPI

## Projeto: Sistema de Gestão Escolar

Nesta atividade, vamos continuar o projeto criado na aula anterior. As
páginas de alunos, professores e funcionários já exibem os dados
retornados pelo FastAPI. Agora vamos:

1.  Alterar a página inicial para incluir os botões **Ver** e
    **Cadastrar**.
2.  Criar um formulário de cadastro de alunos no React.
3.  Enviar os dados do formulário para o FastAPI usando uma requisição
    HTTP `POST`.
4.  Atualizar a lista depois de cadastrar.
5.  Implementar o mesmo processo para professores e funcionários como
    exercício.

> **Escopo desta aula:** vamos trabalhar com cadastro. Não altere as
> funcionalidades de consulta que já estão funcionando, exceto nos
> pontos indicados neste roteiro.

------------------------------------------------------------------------

## 1. Antes de começar

Confirme que o projeto está organizado aproximadamente assim:

``` text
projeto/
├── cadastro-aluno/             # Backend FastAPI
│   └── backend/
│       └── main.py
└── cadastro-alunos-react/      # Frontend React
    └── src/
        ├── components/
        ├── pages/
        │   ├── Home.jsx
        │   ├── Alunos.jsx
        │   ├── Professores.jsx
        │   └── Funcionarios.jsx
        ├── services/
        │   └── api.js
        ├── App.jsx
        └── App.css
```

Os nomes das pastas podem variar um pouco no seu computador. Use sempre
a pasta em que o projeto realmente está salvo.

Abra dois terminais:

**Terminal 1 --- FastAPI**, na pasta do backend:

``` bash
python -m uvicorn backend.main:app --reload
```

**Terminal 2 --- React**, na pasta `cadastro-alunos-react`:

``` bash
npm run dev
```

Confirme que a listagem de alunos continua funcionando em
`http://localhost:5173/alunos` e que a API responde em
`http://127.0.0.1:8000/alunos`.

## 2. Entender o que vamos construir

O fluxo do cadastro será:

1.  O usuário clica em **Cadastrar aluno** na página inicial.
2.  O React abre a página de alunos com o formulário visível.
3.  O usuário preenche os campos e clica em **Salvar**.
4.  O React envia os dados em JSON para `POST /alunos`.
5.  O FastAPI valida os dados e grava o registro no MySQL.
6.  O React exibe uma mensagem e atualiza a listagem.

A rota de cadastro já deve existir no backend. Neste projeto, ela recebe
`nome`, `cpf`, `email`, `data_nascimento`, `telefone`, `ra` e `cidade`.
O código do aluno é gerado pelo banco de dados.

## 3. Passo 1 --- Alterar os botões da página inicial

Abra `src/pages/Home.jsx`.

Cada cartão já possui um botão para abrir a listagem. Vamos acrescentar
um segundo botão para cadastrar. Substitua o conteúdo do arquivo por:

``` jsx
import { Link } from "react-router-dom";

function Home() {
  const modulos = [
    {
      titulo: "Alunos",
      descricao: "Consulte os alunos cadastrados ou realize um novo cadastro.",
      rota: "/alunos",
      rotaCadastro: "/alunos?acao=cadastrar",
      icone: "🎓",
      textoCadastro: "Cadastrar aluno",
    },
    {
      titulo: "Professores",
      descricao: "Consulte os professores cadastrados ou realize um novo cadastro.",
      rota: "/professores",
      rotaCadastro: "/professores?acao=cadastrar",
      icone: "👨‍🏫",
      textoCadastro: "Cadastrar professor",
    },
    {
      titulo: "Funcionários",
      descricao: "Consulte os funcionários cadastrados ou realize um novo cadastro.",
      rota: "/funcionarios",
      rotaCadastro: "/funcionarios?acao=cadastrar",
      icone: "👔",
      textoCadastro: "Cadastrar funcionário",
    },
  ];

  return (
    <main className="home">
      <h1>Sistema de Gestão Escolar</h1>
      <p className="subtitulo">
        Gerencie alunos, professores e funcionários de forma simples e organizada.
      </p>

      <section className="cards">
        {modulos.map((modulo) => (
          <article className="card" key={modulo.titulo}>
            <div className="icone">{modulo.icone}</div>
            <h2>{modulo.titulo}</h2>
            <p>{modulo.descricao}</p>

            <div className="botoes-card">
              <Link className="botao botao-principal" to={modulo.rota}>
                Ver {modulo.titulo.toLowerCase()}
              </Link>

              <Link className="botao botao-secundario" to={modulo.rotaCadastro}>
                {modulo.textoCadastro}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Home;
```

O endereço `?acao=cadastrar` é um parâmetro da URL. Na próxima etapa, a
página `Alunos.jsx` vai ler esse parâmetro para abrir o formulário
automaticamente.

## 4. Passo 2 --- Estilizar o segundo botão

Abra `src/App.css`. Mantenha os estilos que já funcionam e acrescente
estas regras ao final, caso ainda não existam:

``` css
.botoes-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 16px;
}

.botoes-card .botao {
  display: block;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
}

.botao-secundario {
  background: white;
  color: #1769ff;
  border: 1px solid #1769ff;
}

.botao-secundario:hover {
  background: #edf4ff;
}
```

Salve e confira a página inicial. Cada cartão deve apresentar os botões
**Ver** e **Cadastrar**.

## 5. Passo 3 --- Criar a função de cadastro na API

Abra `src/services/api.js`. Preserve a função `listarAlunos()` que já
está funcionando e acrescente a função abaixo:

``` javascript
const API_URL = "http://127.0.0.1:8000";

export async function cadastrarAluno(aluno) {
  const resposta = await fetch(`${API_URL}/alunos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aluno),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      typeof dados.detail === "string"
        ? dados.detail
        : "Não foi possível cadastrar o aluno. Confira os dados informados."
    );
  }

  return dados;
}
```

**Atenção:** se `API_URL` já estiver declarado no arquivo, não o declare
novamente. Acrescente somente a função `cadastrarAluno`. Se o arquivo já
tiver funções para edição ou exclusão, mantenha-as.

O que o código faz?

-   `method: "POST"` informa que estamos enviando dados para cadastro.
-   `Content-Type: application/json` informa o formato dos dados
    enviados.
-   `JSON.stringify(aluno)` transforma o objeto JavaScript em JSON.
-   `resposta.ok` permite verificar se a requisição foi bem-sucedida.

## 6. Passo 4 --- Adaptar a página de alunos

Abra `src/pages/Alunos.jsx`.

A página precisa continuar exibindo a lista e também mostrar um
formulário. Para isso, o componente usará `useSearchParams` para
descobrir se a URL contém `?acao=cadastrar`.

Para esta atividade, substitua o conteúdo de `Alunos.jsx` pelo exemplo
completo abaixo. Ele mantém a listagem e acrescenta apenas o cadastro
--- edição e exclusão não fazem parte deste exercício.

``` jsx
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { listarAlunos, cadastrarAluno } from "../services/api";

const formularioVazio = {
  nome: "",
  cpf: "",
  email: "",
  data_nascimento: "",
  telefone: "",
  ra: "",
  cidade: "",
};

function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [formulario, setFormulario] = useState(formularioVazio);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const mostrarFormulario = searchParams.get("acao") === "cadastrar";

  async function carregarAlunos() {
    setErro("");

    try {
      const dados = await listarAlunos();
      setAlunos(dados);
    } catch (erro) {
      setErro(erro.message || "Não foi possível carregar os alunos.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarAlunos();
  }, []);

  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((atual) => ({
      ...atual,
      [name]: value,
    }));
  }

  function abrirFormulario() {
    setFormulario(formularioVazio);
    setMensagem("");
    setErro("");
    setSearchParams({ acao: "cadastrar" });
  }

  function fecharFormulario() {
    setFormulario(formularioVazio);
    setSearchParams({});
  }

  async function salvarAluno(evento) {
    evento.preventDefault();
    setSalvando(true);
    setErro("");
    setMensagem("");

    try {
      await cadastrarAluno(formulario);
      setMensagem("Aluno cadastrado com sucesso!");
      setFormulario(formularioVazio);
      setSearchParams({});
      await carregarAlunos();
    } catch (erro) {
      setErro(erro.message || "Não foi possível cadastrar o aluno.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main className="pagina">
      <div className="topo-pagina">
        <div>
          <h1>Cadastro de Alunos</h1>
          <p>Consulte os alunos cadastrados ou realize um novo cadastro.</p>
        </div>

        <Link className="botao botao-secundario" to="/">
          Voltar ao início
        </Link>
      </div>

      {!mostrarFormulario && (
        <button
          className="botao botao-principal"
          onClick={abrirFormulario}
        >
          Cadastrar aluno
        </button>
      )}

      {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}
      {erro && <p className="mensagem-erro">{erro}</p>}

      {mostrarFormulario && (
        <section className="formulario">
          <h2>Novo aluno</h2>

          <form onSubmit={salvarAluno}>
            <div className="campos">
              <label>
                Nome
                <input
                  name="nome"
                  value={formulario.nome}
                  onChange={atualizarCampo}
                  maxLength={100}
                  required
                />
              </label>

              <label>
                CPF
                <input
                  name="cpf"
                  value={formulario.cpf}
                  onChange={atualizarCampo}
                  maxLength={14}
                  required
                />
              </label>

              <label>
                E-mail
                <input
                  name="email"
                  type="email"
                  value={formulario.email}
                  onChange={atualizarCampo}
                  maxLength={150}
                  required
                />
              </label>

              <label>
                Data de nascimento
                <input
                  name="data_nascimento"
                  type="date"
                  value={formulario.data_nascimento}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Telefone
                <input
                  name="telefone"
                  value={formulario.telefone}
                  onChange={atualizarCampo}
                  maxLength={20}
                  required
                />
              </label>

              <label>
                RA
                <input
                  name="ra"
                  value={formulario.ra}
                  onChange={atualizarCampo}
                  maxLength={10}
                  required
                />
              </label>

              <label>
                Cidade
                <input
                  name="cidade"
                  value={formulario.cidade}
                  onChange={atualizarCampo}
                  maxLength={50}
                  required
                />
              </label>
            </div>

            <div className="acoes-formulario">
              <button
                className="botao botao-principal"
                type="submit"
                disabled={salvando}
              >
                {salvando ? "Salvando..." : "Salvar aluno"}
              </button>

              <button
                className="botao botao-cancelar"
                type="button"
                onClick={fecharFormulario}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      )}

      <h2>Alunos cadastrados</h2>

      {carregando ? (
        <p>Carregando alunos...</p>
      ) : (
        <div className="tabela-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Data de nascimento</th>
                <th>Telefone</th>
                <th>RA</th>
                <th>Cidade</th>
              </tr>
            </thead>

            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.codAluno}>
                  <td>{aluno.codAluno}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.cpf}</td>
                  <td>{aluno.email}</td>
                  <td>{String(aluno.data_nascimento).slice(0, 10)}</td>
                  <td>{aluno.telefone}</td>
                  <td>{aluno.ra}</td>
                  <td>{aluno.cidade}</td>
                </tr>
              ))}

              {alunos.length === 0 && (
                <tr>
                  <td colSpan="8">Nenhum aluno cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default Alunos;
```

O código usa os nomes de campos da tabela e do backend deste projeto. A
função `listarAlunos()` já existente precisa retornar a lista de alunos
como JSON.

## 7. Passo 5 --- Adicionar estilos ao formulário

Abra `src/App.css`. Preserve os estilos existentes e acrescente:

``` css
.formulario {
  background: white;
  padding: 24px;
  margin: 24px 0;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.07);
}

.campos {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.campos label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.campos input {
  width: 100%;
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font: inherit;
}

.acoes-formulario {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.botao-cancelar {
  background: #e5e7eb;
  color: #263238;
  border: 1px solid #cbd5e1;
}

.mensagem-sucesso {
  padding: 12px;
  color: #166534;
  background: #dcfce7;
  border-radius: 6px;
}

@media (max-width: 750px) {
  .campos {
    grid-template-columns: 1fr;
  }
}
```

Se essas classes já existirem no seu arquivo, verifique se não há regras
duplicadas ou conflitantes.

## 8. Passo 6 --- Testar o cadastro

Com o FastAPI e o React executando:

1.  Acesse `http://localhost:5173`.
2.  Clique em **Cadastrar aluno**.
3.  Preencha todos os campos.
4.  Clique em **Salvar aluno**.
5.  Confira a mensagem de sucesso.
6.  Verifique se o novo registro aparece na tabela.
7.  Atualize a página e confira se o registro continua aparecendo.
8.  Teste o botão **Cancelar** e confira se ele fecha o formulário.

O React deve enviar os dados para `POST /alunos`. O FastAPI é quem
realiza a inserção no MySQL.

Se o cadastro falhar, verifique a mensagem apresentada na tela e o
terminal do FastAPI. Se aparecer erro de CORS, confira a configuração de
CORS da aula anterior. Se aparecer erro de integridade, confira se CPF
ou RA já existem, pois essas colunas possuem restrições de unicidade no
banco.

------------------------------------------------------------------------

## 9. Exercício --- Implementar o cadastro de professores e funcionários

Agora você deverá repetir o que foi feito para alunos.

### Parte A --- Professores

1.  Crie a função `cadastrarProfessor()` em `src/services/api.js`.
2.  Utilize o endpoint `POST /professores`.
3.  Crie um formulário em `src/pages/Professores.jsx`.
4.  Inclua os campos existentes no backend: `nome`, `cpf`, `email`,
    `data_nascimento`, `telefone` e `cidade`.
5.  Altere o cartão de professores em `Home.jsx` para abrir o formulário
    por meio de `?acao=cadastrar`.
6.  Após salvar, exiba uma mensagem e atualize a listagem.

### Parte B --- Funcionários

1.  Crie a função `cadastrarFuncionario()` em `src/services/api.js`.
2.  Utilize o endpoint `POST /funcionarios`.
3.  Crie um formulário em `src/pages/Funcionarios.jsx`.
4.  Inclua os campos existentes no backend: `nome`, `cpf`, `email`,
    `data_nascimento`, `telefone` e `cidade`.
5.  Altere o cartão de funcionários em `Home.jsx` para abrir o
    formulário por meio de `?acao=cadastrar`.
6.  Após salvar, exiba uma mensagem e atualize a listagem.

Consulte os schemas e as rotas do FastAPI para confirmar os nomes exatos
dos campos antes de implementar. Não invente campos que não existam no
backend.

### Critérios de conclusão

-   A página inicial apresenta os botões **Ver** e **Cadastrar** nos
    três cartões.
-   O botão de cadastro de alunos abre o formulário.
-   O formulário envia os dados para o FastAPI.
-   O novo aluno aparece na listagem sem precisar reiniciar a aplicação.
-   Professores e funcionários têm formulários equivalentes
    implementados pelo estudante.
-   Os formulários apresentam mensagens de sucesso ou erro.
-   Os dados permanecem armazenados no MySQL.

## 10. Perguntas para revisão

1.  Qual é a diferença entre uma requisição `GET` e uma requisição
    `POST`?
2.  Por que usamos `JSON.stringify()` no cadastro?
3.  Qual é a função do `Content-Type: application/json`?
4.  Por que o React não deve inserir os dados diretamente no MySQL?
5.  Qual é o papel do FastAPI durante o cadastro?
6.  Para que serve o estado do formulário no React?
7.  Por que atualizamos a listagem depois de cadastrar?

**Resultado esperado:** a aplicação terá uma página inicial com botões
de consulta e cadastro. O cadastro de alunos estará funcional, e os
cadastros de professores e funcionários serão desenvolvidos como
exercício.

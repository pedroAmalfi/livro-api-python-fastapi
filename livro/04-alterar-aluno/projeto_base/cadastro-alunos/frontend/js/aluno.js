const formulario = document.getElementById("form-aluno");
const mensagem = document.getElementById("mensagem");

const parametros = new URLSearchParams(window.location.search);
const codAluno = parametros.get("codAluno");


// ======================================================
// CADASTRO DE ALUNO
// ======================================================

if (formulario) {

    formulario.addEventListener("submit", async function (evento) {

        evento.preventDefault();

        mensagem.textContent = "";

        const aluno = {
            nome: document.getElementById("nome").value,
            cpf: document.getElementById("cpf").value,
            email: document.getElementById("email").value,
            data_nascimento:
                document.getElementById("data_nascimento").value,
            telefone: document.getElementById("telefone").value,
            ra: document.getElementById("ra").value,
            cidade: document.getElementById("cidade").value
        };

        try {

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
                    "Erro: " +
                    obterMensagemErro(resultado);

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
    });

}


// ======================================================
// MENSAGENS DE ERRO
// ======================================================

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


// ======================================================
// LISTAGEM DE ALUNOS
// ======================================================

let alunos = [];

async function carregarAlunos() {

    const tabela = document.getElementById("listaAlunos");

    if (!tabela) {
        return;
    }

    try {

        const resposta = await fetch("/alunos");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar alunos.");
        }

        alunos = await resposta.json();

        exibirAlunos(alunos);

    } catch (erro) {

        console.error("Erro ao carregar alunos:", erro);

        tabela.innerHTML = `
            <tr>
                <td colspan="9">
                    Erro ao carregar os alunos.
                </td>
            </tr>
        `;
    }
}


// ======================================================
// EXIBIR ALUNOS NA TABELA
// ======================================================

function exibirAlunos(listaAlunos) {

    const tabela = document.getElementById("listaAlunos");

    if (!tabela) {
        return;
    }

    tabela.innerHTML = "";

    listaAlunos.forEach(aluno => {

        const linha = document.createElement("tr");

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

        tabela.appendChild(linha);

    });
}


// ======================================================
// FILTRO DE ALUNOS
// ======================================================

function filtrarAlunos() {

    const campoElemento = document.getElementById("campoFiltro");
    const textoElemento = document.getElementById("textoFiltro");

    if (!campoElemento || !textoElemento) {
        return;
    }

    const campo = campoElemento.value;

    const texto = textoElemento.value
        .toLowerCase()
        .trim();

    const alunosFiltrados = alunos.filter(aluno => {

        const valor = aluno[campo];

        if (valor === null || valor === undefined) {
            return false;
        }

        return String(valor)
            .toLowerCase()
            .includes(texto);
    });

    exibirAlunos(alunosFiltrados);
}


// ======================================================
// EVENTOS DO FILTRO
// ======================================================

const textoFiltro = document.getElementById("textoFiltro");

if (textoFiltro) {

    textoFiltro.addEventListener("input", filtrarAlunos);

}


const campoFiltro = document.getElementById("campoFiltro");

if (campoFiltro) {

    campoFiltro.addEventListener("change", filtrarAlunos);

}


const btnLimparFiltro = document.getElementById("btnLimparFiltro");

if (btnLimparFiltro) {

    btnLimparFiltro.addEventListener("click", function () {

        document.getElementById("textoFiltro").value = "";

        exibirAlunos(alunos);

    });

}


// ======================================================
// EXECUTA A LISTAGEM
// ======================================================

carregarAlunos();
carregarAlunoParaAlteracao();


// ======================================================
// CHAMA A FUNÇÃO DE ALTERAÇÃO DOS DADOS
// ======================================================
function alterarAluno(codAluno) {

    window.location.href =
        `/frontend/cadastrodealuno.html?codAluno=${codAluno}`;

}

async function carregarAlunoParaAlteracao() {

    if (!codAluno || !formulario) {
        return;
    }

    try {

        const resposta = await fetch(`/alunos`);

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
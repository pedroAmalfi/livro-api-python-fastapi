const formulario = document.getElementById("form-funcionario");
const mensagem = document.getElementById("mensagem");

const parametros = new URLSearchParams(window.location.search);
const codFunc = parametros.get("codFunc");


if (formulario) {
    formulario.addEventListener(
        "submit",
        async function (evento) {

            evento.preventDefault();
            mensagem.textContent = "";

            const funcionario = {
                nome: document.getElementById("nome").value,
                cpf: document.getElementById("cpf").value,
                email: document.getElementById("email").value,
                data_nascimento:
                    document.getElementById("data_nascimento").value,
                telefone:
                    document.getElementById("telefone").value,
                cidade:
                    document.getElementById("cidade").value
            };

            try {
                let resposta;

                if (codFunc) {
                    resposta = await fetch(
                        `/funcionarios/${codFunc}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body: JSON.stringify(funcionario)
                        }
                    );
                } else {
                    resposta = await fetch(
                        "/funcionarios",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body: JSON.stringify(funcionario)
                        }
                    );
                }

                const resultado = await resposta.json();

                if (resposta.ok) {
                    if (codFunc) {
                        mensagem.textContent =
                            "Funcionário alterado com sucesso!";
                    } else {
                        mensagem.textContent =
                            "Funcionário cadastrado com sucesso!";
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
}

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

                if (campo === "cidade") {
                    return "Cidade inválida.";
                }

                return erro.msg;
            })
            .join(" ");
    }

    return resultado.detail;
}

let funcionarios = [];

async function carregarFuncionarios() {

    const tabela = document.getElementById("listaFuncionarios");

    if (!tabela) {
        return;
    }

    try {

        const resposta = await fetch("/funcionarios");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar funcionarios.");
        }

        funcionarios = await resposta.json();

        exibirFuncionarios(funcionarios);

    } catch (erro) {

        console.error("Erro ao carregar funcionarios:", erro);

        tabela.innerHTML = `
            <tr>
                <td colspan="9">
                    Erro ao carregar os funcionarios.
                </td>
            </tr>
        `;
    }
}


// ======================================================
// EXIBIR FUNCIONARIOS NA TABELA
// ======================================================

function exibirFuncionarios(listaFuncionarios) {

    const tabela = document.getElementById("listaFuncionarios");

    if (!tabela) {
        return;
    }

    tabela.innerHTML = "";

    listaFuncionarios.forEach(funcionario => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${funcionario.codFunc}</td>
            <td>${funcionario.nome}</td>
            <td>${funcionario.cpf}</td>
            <td>${funcionario.email}</td>
            <td>${funcionario.data_nascimento}</td>
            <td>${funcionario.telefone}</td>
            <td>${funcionario.cidade}</td>
             <td>
                <button
                    type="button"
                    class="btn btn-warning btn-sm"
                    onclick="alterarFuncionario(${funcionario.codFunc})"
                >
                    ✏️ Alterar
                </button>
            </td>
            <td>
                <button
                    type="button"
                    class="btn btn-danger btn-sm"
                     onclick="excluirFuncionario(${funcionario.codFunc}, '${funcionario.nome}')"
                 >
                    🗑️ Excluir
                </button>
            </td>
        `;

        tabela.appendChild(linha);

    });
}


// ======================================================
// FILTRO DE FUNCIONARIOS
// ======================================================

function filtrarFuncionarios() {

    const campoElemento = document.getElementById("campoFiltro");
    const textoElemento = document.getElementById("textoFiltro");

    if (!campoElemento || !textoElemento) {
        return;
    }

    const campo = campoElemento.value;

    const texto = textoElemento.value
        .toLowerCase()
        .trim();

    const funcionariosFiltrados = funcionarios.filter(funcionario => {

        const valor = funcionario[campo];

        if (valor === null || valor === undefined) {
            return false;
        }

        return String(valor)
            .toLowerCase()
            .includes(texto);
    });

    exibirFuncionarios(funcionariosFiltrados);
}


// ======================================================
// EVENTOS DO FILTRO
// ======================================================

const textoFiltro = document.getElementById("textoFiltro");

if (textoFiltro) {

    textoFiltro.addEventListener("input", filtrarFuncionarios);

}


const campoFiltro = document.getElementById("campoFiltro");

if (campoFiltro) {

    campoFiltro.addEventListener("change", filtrarFuncionarios);

}


const btnLimparFiltro = document.getElementById("btnLimparFiltro");

if (btnLimparFiltro) {

    btnLimparFiltro.addEventListener("click", function () {

        document.getElementById("textoFiltro").value = "";

        exibirFuncionarios(funcionarios);

    });

}


// ======================================================
// EXECUTA A LISTAGEM
// ======================================================

carregarFuncionarios();
carregarFuncionarioParaAlteracao();

function alterarFuncionario(codFunc) {

    window.location.href =
        `/frontend/cadastrodefuncionario.html?codFunc=${codFunc}`;

}

async function carregarFuncionarioParaAlteracao() {

    if (!codFunc || !formulario) {
        return;
    }

    try {
        const resposta = await fetch("/funcionarios");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar funcionários.");
        }

        const funcionarios = await resposta.json();

        const funcionario = funcionarios.find(
            funcionario => funcionario.codFunc == codFunc
        );

        if (!funcionario) {
            mensagem.textContent =
                "Funcionário não encontrado.";
            return;
        }

        document.getElementById("nome").value =
            funcionario.nome;

        document.getElementById("cpf").value =
            funcionario.cpf;

        document.getElementById("email").value =
            funcionario.email;

        document.getElementById("data_nascimento").value =
            funcionario.data_nascimento;

        document.getElementById("telefone").value =
            funcionario.telefone;

        document.getElementById("cidade").value =
            funcionario.cidade;

        document.getElementById("tituloFormulario").textContent =
            "Alterar Funcionário";

        document.getElementById("btnSalvar").textContent =
            "Salvar alterações";

    } catch (erro) {
        console.error(
            "Erro ao carregar Funcionário:",
            erro
        );

        mensagem.textContent =
            "Não foi possível carregar os dados do funcionário.";
    }
}

// ======================================================
// CHAMA A FUNÇÃO DE EXLUIR DADOS
// ======================================================
async function excluirFuncionario(codFunc, nomeFunc) {

    const confirmar = confirm(
        `Deseja realmente excluir o funcionário ${nomeFunc}?`
    );

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetch(
            `/funcionarios/${codFunc}`,
            {
                method: "DELETE"
            }
        );

        const resultado = await resposta.json();

        if (resposta.ok) {

            alert("Funcionário excluído com sucesso!");

            carregarFuncionarios();

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
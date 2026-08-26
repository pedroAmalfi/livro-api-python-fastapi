const formulario = document.getElementById("form-aluno");
const mensagem = document.getElementById("mensagem");


// ======================================================
// CADASTRO DE ALUNO
// ======================================================

if (formulario) {

    formulario.addEventListener("submit", async function(evento) {
        evento.preventDefault();

        mensagem.textContent = "";

        const aluno = {
            nome: document.getElementById("nome").value,
            cpf: document.getElementById("cpf").value,
            email: document.getElementById("email").value,
            data_nascimento: document.getElementById("data_nascimento").value,
            telefone: document.getElementById("telefone").value,
            ra: document.getElementById("ra").value,
            cidade: document.getElementById("cidade").value
        };

        try {

            const resposta = await fetch("/alunos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(aluno)
            });

            const resultado = await resposta.json();

            if (resposta.ok) {

                mensagem.textContent = "Aluno cadastrado com sucesso!";

                formulario.reset();

            } else {

                mensagem.textContent =
                    "Erro ao cadastrar aluno: " +
                    obterMensagemErro(resultado);

                console.error("Erro da API:", resultado);
            }

        } catch (erro) {

            mensagem.textContent =
                "Não foi possível conectar ao servidor.";

            console.error("Erro de conexão:", erro);
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

        const alunos = await resposta.json();

        tabela.innerHTML = "";

        alunos.forEach(aluno => {

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
            `;

            tabela.appendChild(linha);

        });

    } catch (erro) {

        console.error("Erro ao carregar alunos:", erro);

        tabela.innerHTML = `
            <tr>
                <td colspan="8">
                    Erro ao carregar os alunos.
                </td>
            </tr>
        `;
    }
}


// Executa a listagem
carregarAlunos();
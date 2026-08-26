const formulario = document.getElementById("form-professor");
const mensagem = document.getElementById("mensagem");


if (formulario) {
    formulario.addEventListener("submit", async function (evento) {
        evento.preventDefault();

        mensagem.textContent = "";

        const professor = {
            nome: document.getElementById("nome").value,
            cpf: document.getElementById("cpf").value,
            email: document.getElementById("email").value,
            data_nascimento: document.getElementById("data_nascimento").value,
            telefone: document.getElementById("telefone").value,
            cidade: document.getElementById("cidade").value
        };

        try {

            const resposta = await fetch("/professores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(professor)
            });

            const resultado = await resposta.json();

            if (resposta.ok) {

                mensagem.textContent = "Professor cadastrado com sucesso!";

                formulario.reset();

                console.log("Professor cadastrado:", resultado);

            } else {

                mensagem.textContent = "Erro ao cadastrar Professor: " + obterMensagemErro(resultado);

                console.error("Erro da API:", resultado);
            }

        } catch (erro) {

            mensagem.textContent = "Não foi possível conectar ao servidor.";

            console.error("Erro de conexão:", erro);
        }
    });
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

async function carregarProfessores() {

    const tabela = document.getElementById("listaProfessores");

    if (!tabela) {
        return;
    }

    try {

        const resposta = await fetch("/professores");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar professores.");
        }

        const professores = await resposta.json();

        tabela.innerHTML = "";

        professores.forEach(professor => {

            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${professor.codProf}</td>
                <td>${professor.nome}</td>
                <td>${professor.cpf}</td>
                <td>${professor.email}</td>
                <td>${professor.data_nascimento}</td>
                <td>${professor.telefone}</td>
                <td>${professor.cidade}</td>
            `;

            tabela.appendChild(linha);

        });

    } catch (erro) {

        console.error("Erro ao carregar professores:", erro);

        tabela.innerHTML = `
            <tr>
                <td colspan="8">
                    Erro ao carregar os professores.
                </td>
            </tr>
        `;
    }
}


// Executa a listagem
carregarProfessores();
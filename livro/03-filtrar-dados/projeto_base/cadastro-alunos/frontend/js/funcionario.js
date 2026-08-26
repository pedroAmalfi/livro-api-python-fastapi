const formulario = document.getElementById("form-funcionario");
const mensagem = document.getElementById("mensagem");


if (formulario) {
    formulario.addEventListener("submit", async function (evento) {
        evento.preventDefault();

        mensagem.textContent = "";

        const funcionario = {
            nome: document.getElementById("nome").value,
            cpf: document.getElementById("cpf").value,
            email: document.getElementById("email").value,
            data_nascimento: document.getElementById("data_nascimento").value,
            telefone: document.getElementById("telefone").value,
            cidade: document.getElementById("cidade").value
        };

        try {

            const resposta = await fetch("/funcionarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(funcionario)
            });

            const resultado = await resposta.json();

            if (resposta.ok) {

                mensagem.textContent = "Funcionario cadastrado com sucesso!";

                formulario.reset();

                console.log("Funcionario cadastrado:", resultado);

            } else {

                mensagem.textContent = "Erro ao cadastrar Funcionario: " + obterMensagemErro(resultado);

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

        const funcionarios = await resposta.json();

        tabela.innerHTML = "";

        funcionarios.forEach(funcionario => {

            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${funcionario.codFunc}</td>
                <td>${funcionario.nome}</td>
                <td>${funcionario.cpf}</td>
                <td>${funcionario.email}</td>
                <td>${funcionario.data_nascimento}</td>
                <td>${funcionario.telefone}</td>
                <td>${funcionario.cidade}</td>
            `;

            tabela.appendChild(linha);

        });

    } catch (erro) {

        console.error("Erro ao carregar funcionarios:", erro);

        tabela.innerHTML = `
            <tr>
                <td colspan="8">
                    Erro ao carregar os funcionarios.
                </td>
            </tr>
        `;
    }
}


// Executa a listagem
carregarFuncionarios();
<!--
===============================================================================
CAPÍTULO 00 — PREPARANDO O AMBIENTE DE DESENVOLVIMENTO
SEÇÃO 1 — ANTES DE COMEÇARMOS

OBJETIVO
Apresentar ao leitor a importância de um ambiente de desenvolvimento antes de
iniciar a instalação das ferramentas.

TODO
- Inserir ilustração da jornada do desenvolvedor.
- Inserir diagrama mostrando todas as ferramentas que serão utilizadas.
- Adicionar fotografia ou ilustração da arquitetura final do projeto.

IMAGENS
Figura 01 — Visão geral da jornada do livro.
Figura 02 — Ferramentas que compõem o ambiente de desenvolvimento.

===============================================================================
-->

# Capítulo 00 — Preparando o Ambiente de Desenvolvimento

> *"Toda grande aplicação começa muito antes da primeira linha de código."*

---

# Seção 1 — Antes de começarmos

## Introdução

Imagine que você acabou de receber a missão de desenvolver um novo sistema.

Antes mesmo de escrever a primeira linha de código, surge uma pergunta importante:

**Por onde começar?**

Muitas pessoas acreditam que basta abrir um editor de texto e começar a programar. Na prática, porém, o desenvolvimento profissional de software envolve diversas ferramentas que trabalham em conjunto.

Um desenvolvedor utiliza programas para escrever código, controlar versões, instalar bibliotecas, testar aplicações, armazenar dados e automatizar tarefas.

Quando todas essas ferramentas estão corretamente instaladas e configuradas, dizemos que o computador possui um **ambiente de desenvolvimento**.

É justamente esse ambiente que prepararemos neste capítulo.

Nosso objetivo é garantir que, ao finalizar esta etapa, você tenha tudo pronto para acompanhar os próximos capítulos sem interrupções.

---

# O que é um ambiente de desenvolvimento?

Um ambiente de desenvolvimento é o conjunto de programas, bibliotecas e configurações que permitem criar, executar, testar e manter uma aplicação.

Cada ferramenta possui uma responsabilidade específica.

Algumas escrevem código.

Outras controlam alterações.

Algumas executam a aplicação.

Outras armazenam informações.

Separadas, elas resolvem problemas específicos.

Juntas, tornam possível desenvolver aplicações modernas de maneira organizada e eficiente.

Ao longo deste livro conheceremos cada uma delas em detalhes.

---

# O projeto que construiremos

Durante toda a leitura desenvolveremos um **Sistema de Gestão Escolar**.

Em vez de criar pequenos exemplos desconectados, construiremos uma única aplicação que evoluirá capítulo após capítulo.

Cada novo assunto aprendido será imediatamente aplicado nesse projeto.

Ao final do livro você terá desenvolvido uma API REST completa utilizando tecnologias amplamente empregadas no mercado.

Mais importante do que chegar ao resultado final será compreender o motivo de cada decisão tomada durante o desenvolvimento.

---

# Ferramentas que utilizaremos

Durante esta jornada trabalharemos com diversas tecnologias.

Entre elas:

- Git
- GitHub
- Visual Studio Code
- Python
- Ambiente Virtual (venv)
- FastAPI
- Uvicorn
- Pydantic
- SQLAlchemy
- MySQL
- Docker
- Swagger
- JWT

Não se preocupe caso você nunca tenha utilizado alguma delas.

Cada ferramenta será apresentada no momento adequado, sempre começando pelos conceitos fundamentais antes de avançarmos para exemplos práticos.

---

# Objetivos deste capítulo

Ao concluir este capítulo você será capaz de:

- compreender a importância de um ambiente de desenvolvimento;
- instalar todas as ferramentas necessárias para acompanhar o livro;
- verificar se cada instalação foi realizada corretamente;
- preparar seu computador para desenvolver aplicações com Python e FastAPI.

---

# Checklist

Ao final deste capítulo seu computador estará preparado com:

- ☐ Git instalado
- ☐ GitHub configurado
- ☐ Visual Studio Code instalado
- ☐ Python instalado
- ☐ Ambiente Virtual configurado
- ☐ FastAPI instalada
- ☐ Projeto inicial criado
- ☐ Primeira API executando

---

# O que veremos na próxima seção?

Agora que entendemos por que um ambiente de desenvolvimento é importante, chegou o momento de começar a preparar o computador.

Na próxima seção iniciaremos a instalação das ferramentas que serão utilizadas durante todo o livro, começando pelo **Git**, responsável pelo controle de versões do nosso projeto.

---

<!--
===============================================================================
CAPÍTULO 00 — PREPARANDO O AMBIENTE DE DESENVOLVIMENTO
SEÇÃO 2 — INSTALANDO AS FERRAMENTAS

OBJETIVO
Apresentar as primeiras ferramentas que serão utilizadas durante o livro,
explicando a função de cada uma antes de realizar sua instalação.

TODO
- Inserir capturas de tela do site oficial do Git.
- Inserir capturas do instalador.
- Inserir imagem mostrando a relação Git x GitHub.
- Inserir imagem da instalação do VS Code.

IMAGENS
Figura 03 — Fluxo Git → GitHub.
Figura 04 — Página oficial do Git.
Figura 05 — Instalação do Git.
Figura 06 — Página oficial do Visual Studio Code.

===============================================================================
-->

# Seção 2 — Instalando as Ferramentas

## Por onde começamos?

Uma dúvida bastante comum entre iniciantes é:

> **"Se ainda nem escrevemos código, por que instalar o Git antes do Python?"**

A resposta é simples.

Desde o primeiro arquivo criado durante este livro, queremos que nosso projeto esteja organizado e protegido.

Imagine passar dias desenvolvendo uma aplicação e, por engano, apagar um arquivo importante ou fazer uma alteração que faz o sistema deixar de funcionar.

Como voltar para a versão anterior?

É justamente esse problema que o Git resolve.

Por esse motivo, a primeira ferramenta que instalaremos será o sistema responsável por controlar toda a evolução do nosso projeto.

---

# Conhecendo o Git

O **Git** é um sistema de controle de versões criado para registrar todas as alterações realizadas em um projeto.

Sempre que um arquivo for modificado, o Git poderá registrar essa alteração, permitindo recuperar versões anteriores sempre que necessário.

Na prática, ele funciona como um histórico completo do desenvolvimento da aplicação.

Ao longo deste livro utilizaremos o Git para:

- registrar cada etapa do projeto;
- acompanhar a evolução da aplicação;
- recuperar versões anteriores quando necessário;
- enviar nosso projeto para o GitHub.

Você não precisa decorar comandos neste momento.

Primeiro queremos compreender o papel dessa ferramenta.

Nos próximos capítulos aprenderemos a utilizá-la com tranquilidade.

---

# Instalando o Git

Abra seu navegador de internet e acesse o site oficial do projeto.

https://git-scm.com/

Na página principal clique em **Download for Windows**.

O download normalmente será iniciado automaticamente.

Após concluir o download:

1. Execute o instalador.
2. Mantenha as opções padrão apresentadas pelo assistente.
3. Clique em **Next** até chegar ao final da instalação.
4. Clique em **Install**.
5. Aguarde a conclusão do processo.

Na maioria dos casos não será necessário alterar nenhuma configuração.

As opções padrão atendem perfeitamente aos objetivos deste livro.

---

# Verificando a instalação

Após concluir a instalação, precisamos verificar se tudo ocorreu corretamente.

Abra o **Prompt de Comando**, o **PowerShell** ou o **Terminal** do Windows.

Digite o comando abaixo.

```bash
git --version
```

Se a instalação tiver sido realizada corretamente, será exibida uma mensagem semelhante à seguinte.

```text
git version 2.xx.x.windows.x
```

O número da versão poderá ser diferente.

Isso é perfeitamente normal.

O importante é que o comando seja reconhecido pelo sistema operacional.

---

# Problemas comuns

## O comando não foi encontrado

Se aparecer uma mensagem semelhante a:

```text
'git' não é reconhecido como um comando...
```

provavelmente ocorreu uma destas situações:

- a instalação não foi concluída corretamente;
- o computador precisa ser reiniciado;
- o Git não foi adicionado ao PATH do sistema.

Caso isso aconteça, não se preocupe.

Nos próximos capítulos veremos como solucionar esse tipo de problema sempre que ele aparecer.

---

# Conhecendo o Visual Studio Code

Agora que já possuímos uma ferramenta responsável por controlar as versões do projeto, precisamos de um ambiente onde escreveremos nosso código.

Para isso utilizaremos o **Visual Studio Code**, um dos editores de código mais utilizados atualmente.

Ele oferece recursos que facilitam o desenvolvimento, como:

- destaque de sintaxe;
- autocompletar código;
- terminal integrado;
- extensões;
- integração com Git;
- depuração de aplicações.

Durante praticamente todo o livro ele será nossa principal ferramenta de trabalho.

---

# Instalando o Visual Studio Code

Acesse o site oficial.

https://code.visualstudio.com/

Clique em **Download for Windows**.

Após concluir o download:

1. Execute o instalador.
2. Aceite os termos de licença.
3. Mantenha as configurações recomendadas.
4. Marque a opção para adicionar o VS Code ao menu de contexto do Windows (opcional, mas recomendado).
5. Clique em **Install**.

Quando a instalação terminar, abra o programa.

Ainda não criaremos nenhum projeto.

Primeiro concluiremos a preparação completa do ambiente de desenvolvimento.

---

# O que veremos na próxima seção?

Até este momento instalamos as ferramentas responsáveis por escrever código e controlar versões.

Na próxima seção instalaremos a tecnologia que executará nossa aplicação: o **Python**.

Também criaremos nosso primeiro Ambiente Virtual, que será utilizado durante todo o desenvolvimento do projeto.

---

<!--
===============================================================================
CAPÍTULO 00 — PREPARANDO O AMBIENTE DE DESENVOLVIMENTO
SEÇÃO 3 — INSTALANDO O PYTHON E PREPARANDO O AMBIENTE VIRTUAL

OBJETIVO
Instalar o Python, validar sua instalação, compreender o papel do interpretador
e criar o primeiro Ambiente Virtual utilizado durante todo o livro.

TODO
- Inserir captura de tela do site oficial do Python.
- Inserir imagem destacando a opção "Add Python to PATH".
- Inserir imagem do Prompt de Comando executando python --version.
- Inserir diagrama ilustrando o funcionamento de um Ambiente Virtual.

IMAGENS
Figura 07 — Página oficial do Python.
Figura 08 — Instalador do Python.
Figura 09 — Opção "Add Python to PATH".
Figura 10 — Estrutura de um Ambiente Virtual.

===============================================================================
-->

# Seção 3 — Instalando o Python e preparando o Ambiente Virtual

## Quem executará nosso código?

Até este momento já temos duas ferramentas importantes instaladas.

O Git será responsável por controlar todas as alterações realizadas no projeto.

O Visual Studio Code será utilizado para escrever nosso código.

Mas ainda existe uma pergunta importante.

> **Quem executará os programas que criaremos?**

É exatamente esse o papel do Python.

Quando escrevemos um arquivo com extensão `.py`, ele contém apenas instruções escritas por nós.

Quem interpreta essas instruções e as transforma em ações é o interpretador Python.

Sem ele, o computador não saberia como executar nosso programa.

---

# Instalando o Python

Abra seu navegador de internet e acesse o site oficial do projeto.

https://www.python.org/

Na página inicial clique em **Downloads**.

O próprio site normalmente identifica o sistema operacional utilizado e oferece automaticamente a versão recomendada.

Após concluir o download:

1. Execute o instalador.
2. Marque a opção **Add Python to PATH**.
3. Clique em **Install Now**.
4. Aguarde a conclusão da instalação.

> **Importante**
>
> A opção **Add Python to PATH** deve ser marcada antes de iniciar a instalação.
> Ela permitirá executar o Python diretamente pelo terminal do sistema operacional.

---

# Verificando a instalação

Após finalizar a instalação, abra novamente o Prompt de Comando, PowerShell ou Terminal.

Execute o comando abaixo.

```bash
python --version
```

Dependendo da versão instalada, também poderá funcionar:

```bash
python3 --version
```

Se tudo estiver correto, será exibida uma mensagem semelhante à seguinte.

```text
Python 3.13.x
```

O número da versão poderá ser diferente.

O importante é que o sistema reconheça o comando.

---

# Nosso primeiro programa

Vamos verificar se o Python realmente está funcionando.

No terminal execute:

```bash
python
```

Se tudo estiver correto, o interpretador será iniciado.

Você verá algo semelhante a:

```text
Python 3.13.x
>>>
```

Esses três símbolos (`>>>`) indicam que o Python está aguardando um comando.

Digite:

```python
print("Olá, mundo!")
```

A saída deverá ser:

```text
Olá, mundo!
```

Parabéns!

Você acabou de executar seu primeiro código Python.

Para sair do interpretador digite:

```python
exit()
```

ou pressione:

```text
CTRL + Z
```

seguido da tecla **Enter** (Windows).

---

# O que é um Ambiente Virtual?

Agora que o Python está instalado, surge outro problema muito comum.

Imagine que você desenvolva dois projetos diferentes.

O primeiro utiliza uma versão antiga de uma biblioteca.

O segundo utiliza a versão mais recente.

Se ambos compartilharem as mesmas bibliotecas instaladas no computador, conflitos poderão ocorrer.

É para resolver esse problema que existe o **Ambiente Virtual**.

Um Ambiente Virtual cria um espaço isolado para cada projeto.

Assim, cada aplicação possui suas próprias dependências, sem interferir nas demais.

Essa é uma das práticas mais importantes do desenvolvimento moderno em Python.

Durante todo este livro utilizaremos um Ambiente Virtual dedicado exclusivamente ao projeto.

---

# Criando o Ambiente Virtual

Abra o terminal na pasta onde deseja armazenar o projeto.

Execute o comando:

```bash
python -m venv .venv
```

Será criada uma nova pasta chamada:

```text
.venv
```

Ela conterá uma instalação isolada do Python juntamente com todas as bibliotecas que utilizaremos neste projeto.

---

# Ativando o Ambiente Virtual

No Windows execute:

```bash
.venv\Scripts\activate
```

Após a ativação, o terminal normalmente exibirá algo semelhante a:

```text
(.venv)
```

no início da linha de comando.

Isso indica que o Ambiente Virtual está ativo.

A partir deste momento todas as bibliotecas instaladas pertencerão apenas a este projeto.

---

# Verificando o Ambiente Virtual

Para confirmar que tudo está funcionando corretamente execute:

```bash
python --version
```

Em seguida:

```bash
pip --version
```

Se ambos os comandos forem reconhecidos, o Ambiente Virtual está pronto para uso.

---

# Problemas comuns

## O comando python não foi encontrado

Verifique se a opção **Add Python to PATH** foi marcada durante a instalação.

Caso contrário, será necessário reinstalar o Python.

---

## O Ambiente Virtual não ativa

Verifique se o terminal está aberto na pasta correta.

Também confirme se a pasta `.venv` foi criada com sucesso.

---

# O que veremos na próxima seção?

Nosso ambiente de desenvolvimento já está praticamente concluído.

Na próxima seção instalaremos as primeiras bibliotecas utilizadas no livro, criaremos a estrutura inicial do projeto e executaremos nossa primeira aplicação utilizando o FastAPI.

Ao final deste capítulo seu computador estará completamente preparado para acompanhar todos os próximos capítulos.

---

<!--
===============================================================================
CAPÍTULO 00 — PREPARANDO O AMBIENTE DE DESENVOLVIMENTO
SEÇÃO 4 — CRIANDO O PRIMEIRO PROJETO

OBJETIVO
Finalizar a preparação do ambiente criando a estrutura inicial do projeto,
instalando as primeiras bibliotecas e executando a primeira API utilizando
FastAPI.

TODO
- Inserir captura da estrutura final das pastas.
- Inserir imagem do terminal executando o servidor.
- Inserir captura do navegador acessando localhost.
- Inserir captura do Swagger.
- Inserir diagrama mostrando o fluxo:
  Navegador → FastAPI → Resposta.

IMAGENS
Figura 11 — Estrutura inicial do projeto.
Figura 12 — Terminal executando o Uvicorn.
Figura 13 — Navegador exibindo "Olá, Mundo!".
Figura 14 — Documentação automática do Swagger.

===============================================================================
-->

# Seção 4 — Criando o primeiro projeto

## Chegou a hora de escrever nosso primeiro código

Depois de preparar todo o ambiente de desenvolvimento, finalmente chegou o momento de criar nosso primeiro projeto.

Ainda não construiremos a aplicação completa.

Nosso objetivo nesta seção é apenas verificar se todas as ferramentas instaladas estão funcionando corretamente.

Ao final deste capítulo teremos uma API respondendo pela primeira vez.

Esse será o ponto de partida para tudo o que construiremos ao longo do livro.

---

# Criando a pasta do projeto

Escolha um local do seu computador onde deseja armazenar o projeto.

Crie uma nova pasta chamada:

```text
escola-api
```

Em seguida, abra essa pasta utilizando o Visual Studio Code.

Uma maneira simples de fazer isso é abrir o VS Code e selecionar:

**File → Open Folder...**

Depois escolha a pasta criada.

A partir deste momento todo o desenvolvimento acontecerá dentro desse diretório.

---

# Instalando o FastAPI

Com o Ambiente Virtual ativado, abra o terminal integrado do Visual Studio Code.

Execute o comando:

```bash
pip install fastapi
```

Em seguida instale também o servidor que executará nossa aplicação.

```bash
pip install "uvicorn[standard]"
```

Essas duas bibliotecas serão utilizadas durante praticamente todo o livro.

Nos próximos capítulos entenderemos em detalhes o papel de cada uma delas.

---

# Criando o primeiro arquivo

Na raiz do projeto crie um arquivo chamado:

```text
main.py
```

Esse será o ponto de entrada da nossa aplicação.

Dentro dele escreva o seguinte código.

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def inicio():
    return {"mensagem": "Olá, Mundo!"}
```

Não se preocupe se ainda não entender esse código.

Nos próximos capítulos cada linha será explicada cuidadosamente.

Neste momento queremos apenas verificar se nosso ambiente está funcionando.

---

# Executando a aplicação

No terminal execute o comando abaixo.

```bash
uvicorn main:app --reload
```

Se tudo estiver correto, será exibida uma saída semelhante a:

```text
Uvicorn running on http://127.0.0.1:8000
```

Isso significa que nossa API já está em execução.

---

# Testando a API

Abra seu navegador de internet.

Digite o endereço:

```text
http://127.0.0.1:8000
```

Você deverá visualizar algo semelhante a:

```json
{
    "mensagem": "Olá, Mundo!"
}
```

Parabéns!

Sua primeira API utilizando FastAPI está funcionando.

---

# Conhecendo o Swagger

Agora altere apenas o endereço acessado pelo navegador para:

```text
http://127.0.0.1:8000/docs
```

Será aberta automaticamente a documentação da API.

Essa interface é gerada pelo próprio FastAPI e permite testar todos os endpoints sem a necessidade de criar uma aplicação Front-end.

Ao longo do livro utilizaremos essa ferramenta constantemente.

Mais adiante entenderemos em detalhes como ela funciona e quais recursos oferece.

---

# Estrutura do projeto

Ao final deste capítulo sua pasta deverá possuir uma estrutura semelhante à seguinte.

```text
escola-api/
│
├── .venv/
├── main.py
└── ...
```

Nos próximos capítulos essa estrutura crescerá gradativamente, acompanhando a evolução da aplicação.

---

# Checklist final

Antes de prosseguir para o próximo capítulo, confirme se todos os itens abaixo foram concluídos.

- ✅ Git instalado.
- ✅ Visual Studio Code instalado.
- ✅ Python instalado.
- ✅ Ambiente Virtual criado.
- ✅ FastAPI instalada.
- ✅ Uvicorn instalado.
- ✅ Projeto criado.
- ✅ Primeira API executando.
- ✅ Swagger acessível.

Caso algum item ainda não esteja funcionando, recomendamos revisar esta seção antes de continuar.

---

# Resumo

Neste capítulo preparamos completamente o ambiente de desenvolvimento que será utilizado durante todo o restante do livro.

Durante essa jornada você:

- compreendeu o que é um ambiente de desenvolvimento;
- instalou as principais ferramentas utilizadas por desenvolvedores Python;
- criou seu primeiro Ambiente Virtual;
- instalou o FastAPI;
- criou sua primeira aplicação;
- executou sua primeira API REST.

Agora possuímos tudo o que precisamos para iniciar o desenvolvimento da aplicação.

Nos próximos capítulos deixaremos de falar sobre instalações e começaremos a construir, passo a passo, nosso Sistema de Gestão Escolar.

---

# Próximo capítulo

No próximo capítulo conheceremos o **Git**.

Antes de escrevermos qualquer funcionalidade da aplicação, aprenderemos como controlar versões, registrar alterações e acompanhar toda a evolução do projeto utilizando uma das ferramentas mais importantes do desenvolvimento moderno.

---

> **Continue para o Capítulo 01 — Conhecendo o Git.**

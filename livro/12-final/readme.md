# Aula 12 - Revisão Final — FastAPI, Banco de Dados e React

## 1. Objetivo desta revisão

Durante as aulas, construímos partes de uma aplicação de gestão escolar utilizando **FastAPI**, **banco de dados** e **React**. Cada tecnologia tem uma responsabilidade diferente, mas elas trabalham em conjunto para que o usuário consiga consultar, cadastrar, alterar e excluir informações.

Ao final desta revisão, você deverá compreender:

- O papel do FastAPI, do banco de dados e do React;
- Como as tecnologias se comunicam mesmo sendo desenvolvidas em linguagens diferentes;
- Como uma aplicação mobile poderia acessar uma API hospedada em um servidor;
- O que muda quando utilizamos um banco de dados NoSQL;
- Como aplicar esses conhecimentos em um projeto final.

---

## 2. Qual é a função de cada tecnologia?

### 2.1 FastAPI — o backend e a API

O **FastAPI** é um framework Python utilizado para desenvolver APIs. No nosso projeto, ele funciona como a camada intermediária entre a interface do usuário e o banco de dados.

Entre suas responsabilidades estão:

- Receber requisições HTTP;
- Disponibilizar rotas, como `GET /alunos` e `POST /alunos`;
- Validar os dados recebidos, conforme os schemas e regras definidos;
- Executar as operações necessárias no banco de dados;
- Retornar respostas, normalmente em formato JSON, com os dados ou o resultado da operação.

Uma rota é um endereço da API associado a uma operação. Por exemplo:

| Método HTTP | Rota | Finalidade |
|---|---|---|
| `GET` | `/alunos` | Listar alunos |
| `GET` | `/alunos/1` | Consultar um aluno específico, se essa rota estiver implementada |
| `POST` | `/alunos` | Cadastrar um aluno |
| `PUT` | `/alunos/1` | Alterar o aluno de identificador 1 |
| `DELETE` | `/alunos/1` | Excluir o aluno de identificador 1 |

**Importante:** os exemplos com identificador `1` representam um recurso específico. Os nomes exatos das rotas dependem de como o backend foi implementado. Consulte a documentação automática em `http://127.0.0.1:8000/docs` para verificar as rotas disponíveis no seu projeto.

### 2.2 Banco de dados — onde as informações ficam armazenadas

O banco de dados é responsável por armazenar as informações de maneira persistente. Isso significa que os dados continuam disponíveis depois que a página ou a aplicação é fechada, desde que tenham sido gravados corretamente.

No projeto, utilizamos um banco de dados relacional, como o MySQL. Nele, os dados são organizados em tabelas, compostas por linhas e colunas. Por exemplo, a tabela `alunos` pode armazenar código, nome, CPF, e-mail, telefone e cidade.

O banco de dados não precisa conhecer a interface React. Em uma arquitetura como a nossa, normalmente é o **FastAPI que acessa o banco**, executa consultas SQL e devolve o resultado ao frontend.

Exemplos de operações que o backend pode executar:

- `SELECT`: consultar dados;
- `INSERT`: inserir registros;
- `UPDATE`: alterar registros;
- `DELETE`: excluir registros.

Essas instruções são executadas no backend, usando a conexão e as permissões configuradas para o banco.

### 2.3 React — a interface que o usuário utiliza

O **React** é uma biblioteca JavaScript utilizada para construir interfaces. No nosso projeto, ele apresenta as páginas, os formulários, os botões e as tabelas que o usuário utiliza.

O React pode:

- Exibir a lista de alunos;
- Capturar os dados digitados em um formulário;
- Enviar uma requisição para a API;
- Receber a resposta em JSON;
- Atualizar a tela com os dados recebidos;
- Exibir mensagens de sucesso ou erro.

O React **não precisa acessar diretamente o MySQL**. Ele conversa com a API do FastAPI, e o backend é responsável por acessar o banco de dados.

---

## 3. Como essas tecnologias se comunicam?

Mesmo sendo tecnologias diferentes — Python no backend, JavaScript no frontend e SQL na comunicação com o banco relacional —, elas conseguem trabalhar juntas porque utilizam interfaces e protocolos bem definidos.

No nosso projeto, a comunicação entre React e FastAPI ocorre por meio de **requisições HTTP**. Os dados geralmente são enviados e recebidos em **JSON**, um formato textual que pode ser interpretado por várias linguagens.

O caminho de uma consulta costuma ser:

1. O usuário abre a página React e solicita a lista de alunos.
2. O React envia uma requisição HTTP `GET` para a rota `/alunos` do FastAPI.
3. O FastAPI recebe a requisição e consulta o banco de dados.
4. O banco retorna os registros ao FastAPI.
5. O FastAPI transforma ou organiza os dados da resposta em JSON.
6. O React recebe o JSON e apresenta os registros na tela.

<pre>
Usuário
   |
   v
Interface React (JavaScript)
   |
   | Requisição HTTP — por exemplo, GET /alunos
   | Resposta em JSON
   v
API FastAPI (Python)
   |
   | Consulta SQL
   v
Banco de dados relacional (MySQL)
</pre>

O fluxo de cadastro é semelhante, mas começa com os dados digitados pelo usuário:

1. O usuário preenche o formulário no React.
2. O React envia os campos em uma requisição `POST`, normalmente em JSON.
3. O FastAPI recebe e valida os dados.
4. O backend grava o registro no banco.
5. O FastAPI retorna uma resposta indicando o resultado.
6. O React informa o usuário e pode atualizar a lista.

Para alterar e excluir, utilizamos, respectivamente, métodos como `PUT` e `DELETE`, conforme as rotas implementadas.

### Exemplo simplificado de comunicação

No React, uma chamada pode ser feita usando `fetch`:

```javascript
const resposta = await fetch("http://127.0.0.1:8000/alunos");
const alunos = await resposta.json();

console.log(alunos);
```

Esse exemplo consulta a API e converte o corpo da resposta para um objeto JavaScript. Ele pressupõe que o backend esteja acessível nesse endereço e que a rota exista.

No FastAPI, uma rota de consulta pode ter uma estrutura semelhante a esta:

```python
@app.get("/alunos")
def listar_alunos():
    # Aqui entraria a consulta ao banco de dados.
    return [
        {"codAluno": 1, "nome": "Ana"},
        {"codAluno": 2, "nome": "Bruno"}
    ]
```

Esse trecho é apenas ilustrativo: ele retorna dados fixos e **não** consulta o banco. No projeto real, o código da rota chama a camada responsável pelo acesso ao banco de dados.

Observe que o React não precisa entender Python, nem o FastAPI precisa entender como a tela foi construída. Ambos precisam concordar sobre o endereço da rota, o método HTTP, o formato dos dados e o significado dos campos retornados.

### E o CORS?

Durante o desenvolvimento, o React e o FastAPI normalmente são executados em endereços diferentes, por exemplo:

- React com Vite: `http://localhost:5173`;
- FastAPI: `http://127.0.0.1:8000`.

Como origem significa a combinação de protocolo, host e porta, esses endereços são origens diferentes. O navegador aplica a política de mesma origem e pode bloquear a chamada se a API não permitir a origem do frontend.

Para isso, configuramos o **CORS** no FastAPI, autorizando a origem usada pelo React. Em produção, a lista de origens autorizadas deve ser configurada de acordo com os domínios reais da aplicação; evite liberar origens indiscriminadamente.

---

## 4. Como seria em uma situação real?

Até aqui, executamos as aplicações no ambiente de desenvolvimento. Em uma implantação real, o backend e o banco podem ficar hospedados em um servidor acessível pela internet, enquanto a interface pode ser publicada em um serviço de hospedagem web ou instalada em um celular.

### 4.1 Exemplo de arquitetura em produção

Imagine um sistema de gestão escolar usado por alunos, professores e funcionários:

- **Aplicação mobile:** desenvolvida com React Native e instalada no celular;
- **API:** FastAPI hospedado em um servidor;
- **Banco de dados:** MySQL hospedado em um servidor protegido, que pode ser o mesmo ambiente ou um serviço separado.

O fluxo seria:

1. O usuário abre o aplicativo React Native no celular.
2. O aplicativo envia uma requisição HTTPS para o endereço público da API, por exemplo, `https://api.minhaescola.com/alunos`.
3. O servidor recebe a requisição e o FastAPI verifica, valida e processa a solicitação.
4. O FastAPI consulta ou altera os dados no banco.
5. O servidor retorna uma resposta HTTP, normalmente em JSON.
6. O React Native interpreta a resposta e atualiza a tela do aplicativo.

<pre>
Celular
React Native (JavaScript)
       |
       | HTTPS + JSON
       v
Servidor acessível pela internet
FastAPI (Python)
       |
       | Conexão privada ao banco
       v
MySQL (banco de dados)
</pre>

O aplicativo mobile não precisa estar escrito em Python e não precisa se conectar diretamente ao MySQL. Ele precisa conhecer o endereço da API e respeitar o contrato de comunicação definido por ela.

### 4.2 O que precisaria ser configurado?

Para que o aplicativo funcione fora do computador do desenvolvedor, alguns cuidados são necessários:

- **Hospedagem:** publicar o FastAPI em um servidor ou serviço compatível;
- **Endereço acessível:** utilizar um domínio ou endereço público que o celular consiga alcançar;
- **HTTPS:** proteger a comunicação entre o aplicativo e a API;
- **Banco protegido:** não expor a porta do banco de dados publicamente sem necessidade; preferir acesso restrito ao backend;
- **Configurações de ambiente:** guardar credenciais e configurações sensíveis fora do código-fonte;
- **Autenticação e autorização:** controlar quem pode entrar e quais dados pode consultar ou alterar;
- **Validação e segurança:** validar os dados no backend e tratar erros;
- **Rede e firewall:** permitir apenas as comunicações necessárias.

**Atenção:** `127.0.0.1` e `localhost` apontam para o próprio dispositivo em que o programa está executando. No celular, `localhost` aponta para o celular, não para o computador onde o FastAPI está rodando. Em testes na rede local, seria necessário usar o endereço IP do computador acessível pela rede; para uso pela internet, utilizar o endereço público configurado para o servidor.

### 4.3 React para web e React Native

React e React Native compartilham conceitos de componentes, estado e JavaScript, mas não são a mesma coisa:

- **React para web:** cria interfaces que rodam no navegador, usando elementos HTML;
- **React Native:** cria interfaces para aplicativos mobile usando componentes nativos.

Os dois podem consumir a mesma API FastAPI. Isso permite, por exemplo, que um sistema web e um aplicativo Android/iOS consultem os mesmos alunos, desde que tenham autorização para isso. A API centraliza as regras e o acesso aos dados.

---

## 5. E se utilizássemos um banco de dados NoSQL?

Até agora, trabalhamos com um banco relacional, como o MySQL. Em bancos relacionais, os dados costumam ser organizados em tabelas com colunas, tipos e relacionamentos. Consultas e alterações são feitas com SQL.

Os bancos **NoSQL** incluem diferentes modelos de armazenamento, por exemplo:

- **Documento:** armazena documentos, frequentemente em formato semelhante a JSON, como no MongoDB;
- **Chave-valor:** associa uma chave a um valor, como no Redis;
- **Grafo:** representa entidades e seus relacionamentos por nós e arestas, como no Neo4j;
- **Colunar:** organiza os dados em estruturas orientadas a colunas, conforme a implementação do banco.

NoSQL não significa “sem banco” nem que todos esses bancos funcionem da mesma maneira. Cada modelo possui recursos, linguagens de consulta, drivers e formas de modelagem próprios.

### O que mudaria no nosso projeto?

A arquitetura geral poderia continuar igual:

**React ou React Native → HTTP/JSON → FastAPI → banco de dados**

A principal mudança estaria no backend e na camada de persistência:

- A conexão e a biblioteca de acesso seriam específicas do banco escolhido;
- As consultas e operações seguiriam o modelo e a API do banco NoSQL;
- A estrutura dos dados e a maneira de representar relacionamentos poderiam mudar;
- Seria necessário adaptar a validação, a conversão de dados e o tratamento de erros.

Por exemplo, com MySQL, o FastAPI pode executar uma consulta SQL como `SELECT ... FROM alunos`. Com MongoDB, o backend poderia consultar uma coleção de documentos usando o driver apropriado. O React continuaria fazendo uma requisição HTTP para a rota da API e recebendo JSON, desde que o contrato da rota permanecesse o mesmo.

Isso é uma vantagem da separação em camadas: **o frontend não precisa saber qual banco está por trás da API**. Se as rotas mantiverem o mesmo formato de entrada e saída, a troca do banco pode exigir poucas ou nenhuma alteração no React. Entretanto, se o formato dos dados ou o comportamento da API mudar, o frontend também precisará ser ajustado.

### Relacional ou NoSQL: qual escolher?

Não existe uma opção universalmente melhor. A escolha depende dos dados, das consultas, das relações entre as entidades, da consistência necessária, do volume de acesso e dos requisitos do sistema.

- Um banco relacional costuma ser uma boa opção quando há dados estruturados e relacionamentos importantes, como alunos, matrículas, cursos e turmas.
- Um banco de documentos pode ser útil quando os registros possuem estruturas variadas ou quando faz sentido agrupar informações em documentos.
- Um banco chave-valor pode atender bem a casos como cache e dados de acesso rápido.
- Bancos de grafo podem ser interessantes quando explorar relações entre entidades é central para a aplicação.

Em um mesmo sistema, também é possível utilizar mais de um banco, desde que exista uma justificativa técnica e que a complexidade adicional seja administrada.

---

## 6. Atividade final — Projeto integrador

Chegou a hora de aplicar o que foi aprendido! Como atividade final, cada equipe deverá desenvolver uma **aplicação com tema livre**, utilizando os conceitos e as tecnologias demonstrados nas aulas de programação.

O projeto deverá integrar **React, FastAPI, um banco de dados relacional e um banco de dados NoSQL**.

### Requisitos mínimos

- [ ] Definir um tema e explicar qual problema a aplicação pretende resolver;
- [ ] Criar uma interface web em React, com páginas, componentes, formulários e navegação;
- [ ] Desenvolver uma API em FastAPI com rotas para as operações necessárias;
- [ ] Implementar operações de cadastro, consulta, alteração e exclusão (CRUD) para pelo menos uma entidade principal;
- [ ] Conectar o FastAPI a um banco de dados relacional e persistir dados nele;
- [ ] Utilizar também um banco de dados NoSQL para uma funcionalidade coerente com o tema;
- [ ] Fazer o React consumir a API por HTTP, enviando e recebendo dados em JSON;
- [ ] Validar os dados no backend e apresentar mensagens de sucesso ou erro na interface;
- [ ] Documentar como instalar, configurar e executar o projeto;
- [ ] Preparar uma demonstração do sistema, explicando a arquitetura e as decisões técnicas.

### Como utilizar os dois tipos de banco?

Não basta apenas instalar ou criar um banco NoSQL: a aplicação precisa realmente utilizá-lo. A equipe deverá justificar **quais dados ficam no banco relacional, quais ficam no NoSQL e por quê**.

Exemplo para um sistema de gestão de eventos:

- **Relacional (MySQL):** eventos, usuários, inscrições e pagamentos simulados;
- **NoSQL (por exemplo, MongoDB):** registros flexíveis de atividades, preferências ou documentos complementares relacionados aos eventos.

Esse é apenas um exemplo. A equipe deverá escolher a modelagem mais adequada para seu próprio tema. Não armazene dados sensíveis ou reais desnecessários durante os testes.

### Etapas sugeridas

1. **Planejamento:** definir o tema, o público, as funcionalidades e as entidades.
2. **Modelagem:** desenhar o modelo relacional e definir o uso do NoSQL.
3. **Backend:** implementar as rotas e a persistência no FastAPI.
4. **Frontend:** construir as telas e integrar o React com a API.
5. **Integração:** testar cadastro, consulta, alteração, exclusão e as funcionalidades NoSQL.
6. **Validação:** verificar erros, entradas inválidas e consistência dos dados.
7. **Documentação e apresentação:** registrar a instalação e explicar o funcionamento do projeto.

### Entregáveis

- Código-fonte do frontend e do backend;
- Scripts ou instruções necessários para preparar os bancos de dados;
- Arquivo `README.md` com pré-requisitos, configuração e execução;
- Evidências dos testes realizados;
- Apresentação demonstrando a aplicação e explicando a comunicação entre as camadas.

### Critérios sugeridos para avaliação

| Critério | O que será observado |
|---|---|
| Funcionalidade | As principais funcionalidades funcionam corretamente? |
| Integração | React e FastAPI trocam dados pela API? |
| Banco relacional | Os dados são persistidos e consultados corretamente? |
| Banco NoSQL | Existe uso real e justificado do NoSQL? |
| Organização do código | O projeto possui estrutura compreensível e responsabilidades separadas? |
| Validação e tratamento de erros | O sistema trata entradas inválidas e falhas de comunicação? |
| Documentação | Outra pessoa consegue configurar e executar o projeto seguindo o README? |
| Apresentação técnica | A equipe consegue explicar as decisões e demonstrar o funcionamento? |

---

## 7. Para concluir

O ponto mais importante desta revisão é entender que cada tecnologia tem uma responsabilidade:

- **React:** apresenta a interface e interage com o usuário;
- **FastAPI:** oferece as rotas, valida as requisições e aplica as regras da aplicação;
- **Banco de dados:** armazena e recupera as informações;
- **HTTP e JSON:** permitem que frontend e backend se comuniquem;
- **React Native:** permite levar a experiência para dispositivos móveis consumindo a mesma API;
- **Banco NoSQL:** oferece modelos alternativos de armazenamento, escolhidos conforme a necessidade.

Uma aplicação não depende de todas as partes serem escritas na mesma linguagem. Ela depende de contratos bem definidos, comunicação adequada, segurança e responsabilidades organizadas.

**Desafio final:** desenvolva uma aplicação que resolva um problema real ou simulado, integre React e FastAPI, utilize bancos relacional e NoSQL de maneira justificada e demonstre que você compreendeu como os dados percorrem todo o sistema.

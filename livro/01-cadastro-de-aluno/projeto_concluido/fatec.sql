-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 21/08/2026 às 16:26
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `fatec`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `alunos`
--

CREATE TABLE `alunos` (
  `codAluno` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `email` varchar(150) NOT NULL,
  `data_nascimento` date NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `ra` varchar(10) NOT NULL,
  `cidade` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `alunos`
--

INSERT INTO `alunos` (`codAluno`, `nome`, `cpf`, `email`, `data_nascimento`, `telefone`, `ra`, `cidade`) VALUES
(1, 'Marcelo', '123456', 'marcelo@teste.com', '1980-02-04', '123456', '987654', 'Mococa'),
(2, 'Nome', 'CPF', 'EMAIL@email.com', '2006-08-02', 'telefone', 'ra', 'cidade');

-- --------------------------------------------------------

--
-- Estrutura para tabela `funcionario`
--

CREATE TABLE `funcionario` (
  `codFunc` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `email` varchar(150) NOT NULL,
  `data_nascimento` date NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `cidade` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `funcionario`
--

INSERT INTO `funcionario` (`codFunc`, `nome`, `cpf`, `email`, `data_nascimento`, `telefone`, `cidade`) VALUES
(1, 'Bruno', '789456', 'bruno@cps.sp.gov.br', '2005-12-22', '123456', 'Mogi Guaçu');

-- --------------------------------------------------------

--
-- Estrutura para tabela `professor`
--

CREATE TABLE `professor` (
  `codProf` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `email` varchar(150) NOT NULL,
  `data_nascimento` date NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `cidade` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `professor`
--

INSERT INTO `professor` (`codProf`, `nome`, `cpf`, `email`, `data_nascimento`, `telefone`, `cidade`) VALUES
(1, 'Pedro Ramires', '123456', 'pedro@gmail.com', '1988-02-04', '123456', 'Mococa');

-- --------------------------------------------------------

--
-- Estrutura para tabela `turma`
--

CREATE TABLE `turma` (
  `codTurma` int(11) NOT NULL,
  `curso` varchar(100) NOT NULL,
  `modulo` varchar(100) NOT NULL,
  `ano` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `turmaaluno`
--

CREATE TABLE `turmaaluno` (
  `codTurmaAluno` int(11) NOT NULL,
  `codTurma` int(11) NOT NULL,
  `codAluno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `turmaprof`
--

CREATE TABLE `turmaprof` (
  `codTurmaProf` int(11) NOT NULL,
  `codTurma` int(11) NOT NULL,
  `codProf` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `alunos`
--
ALTER TABLE `alunos`
  ADD PRIMARY KEY (`codAluno`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD UNIQUE KEY `ra` (`ra`);

--
-- Índices de tabela `funcionario`
--
ALTER TABLE `funcionario`
  ADD PRIMARY KEY (`codFunc`),
  ADD UNIQUE KEY `cpf` (`cpf`);

--
-- Índices de tabela `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`codProf`),
  ADD UNIQUE KEY `cpf` (`cpf`);

--
-- Índices de tabela `turma`
--
ALTER TABLE `turma`
  ADD PRIMARY KEY (`codTurma`);

--
-- Índices de tabela `turmaaluno`
--
ALTER TABLE `turmaaluno`
  ADD PRIMARY KEY (`codTurmaAluno`),
  ADD KEY `fkCodAlunoTurma1` (`codAluno`),
  ADD KEY `fkCodAlunoTurma2` (`codTurma`);

--
-- Índices de tabela `turmaprof`
--
ALTER TABLE `turmaprof`
  ADD PRIMARY KEY (`codTurmaProf`),
  ADD KEY `fkCodProfTurma1` (`codProf`),
  ADD KEY `fkCodProfTurma2` (`codTurma`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `alunos`
--
ALTER TABLE `alunos`
  MODIFY `codAluno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `funcionario`
--
ALTER TABLE `funcionario`
  MODIFY `codFunc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `professor`
--
ALTER TABLE `professor`
  MODIFY `codProf` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `turma`
--
ALTER TABLE `turma`
  MODIFY `codTurma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `turmaaluno`
--
ALTER TABLE `turmaaluno`
  MODIFY `codTurmaAluno` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `turmaprof`
--
ALTER TABLE `turmaprof`
  MODIFY `codTurmaProf` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `turmaaluno`
--
ALTER TABLE `turmaaluno`
  ADD CONSTRAINT `fkCodAlunoTurma1` FOREIGN KEY (`codAluno`) REFERENCES `alunos` (`codAluno`),
  ADD CONSTRAINT `fkCodAlunoTurma2` FOREIGN KEY (`codTurma`) REFERENCES `turma` (`codTurma`);

--
-- Restrições para tabelas `turmaprof`
--
ALTER TABLE `turmaprof`
  ADD CONSTRAINT `fkCodProfTurma1` FOREIGN KEY (`codProf`) REFERENCES `professor` (`codProf`),
  ADD CONSTRAINT `fkCodProfTurma2` FOREIGN KEY (`codTurma`) REFERENCES `turma` (`codTurma`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

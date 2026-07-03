<img width="3828" height="1626" alt="c#" src="https://github.com/user-attachments/assets/601fc761-cdf9-41b4-9afd-6ab56b48fe09" width="100%" />



# Desafio Controle de Gastos Residenciais

Projeto consolidado em 3 de julho de 2026.

Esta aplicação consiste em um ecossistema completo voltado para o gerenciamento, centralização e análise de despesas domésticas. A solução adota o modelo conceitual de arquitetura desacoplada, separando rigorosamente as responsabilidades de negócio e persistência de dados em uma camada de Backend, enquanto a interface do usuário e o consumo de dados operam de forma isolada na camada de Frontend.

Estrutura de Diretórios e Escopo Técnico:
* ControleGastos: API Backend construída sob a plataforma .NET. Centraliza as regras de domínio, validações de integridade, serviços de negócios e mapeamento de persistência de dados.
* gastoshid-front: Aplicação Client-Side responsável pelo gerenciamento de estado do lado do cliente, renderização de componentes de interface e consumo assíncrono dos endpoints expostos pela API.

Stack Tecnológica:
* Camada de Backend: .NET 8.0 e linguagem C#
* Camada de Frontend: React.js, TypeScript para tipagem estática e segurança de código, e Vite como ferramenta de build de alto desempenho
* Ferramentas de Code Quality: Oxlint para análise estática de código (linting)
* Estilização de Componentes: CSS3 estruturado

Instruções para Execução do Ambiente Local:
* Requisitos Mínimos do Ambiente: Para a inicialização e depuração dos serviços em máquina local, é obrigatória a presença do .NET SDK 8.0 e Node.js instalado (versão LTS).
* Inicialização do Backend (.NET): Altere o contexto do terminal para o diretório de serviços através do comando `cd ControleGastos` e execute a compilação e inicialização da API com o comando `dotnet run`.
* Inicialização do Frontend (React): Altere o contexto do terminal para o diretório da aplicação web através do comando `cd gastoshid-front`, instale as dependências com `npm install` e dispare o servidor local de desenvolvimento com `npm run dev`.

Autoria do Projeto:
* Victor Angelini 

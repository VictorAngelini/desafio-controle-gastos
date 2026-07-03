<img width="1791" height="987" alt="gastos" src="https://github.com/user-attachments/assets/3942a4c2-893e-427b-b841-3693cef08f30" />

**CONTROLE DE GASTOS RESIDENCIAIS.**

Sistema full-stack para gestão e consolidação de despesas e receitas domésticas. A aplicação foi desenvolvida para permitir o controle financeiro individual e coletivo de moradores, com atualização em tempo real do saldo e geração automática de balanços financeiros.

**Objetivo do Projeto**

Este projeto tem como finalidade demonstrar competências em desenvolvimento full-stack, incluindo:

Construção de APIs REST com C# (.NET)
Desenvolvimento de interface moderna com React e TypeScript
Implementação de regras de negócio no frontend e backend
Integração entre camadas e manipulação de estado em tempo real
Organização de código e arquitetura separada por responsabilidade
Stack Tecnológica
Frontend: TypeScript, React, Vite, CSS
Backend: C# (.NET Web API)
Estrutura web: HTML

**Funcionalidades**

Cadastro e gerenciamento de moradores
Registro de receitas e despesas por usuário
Controle de permissões por regra de negócio (maioridade financeira)
Cálculo automático de saldo individual
Consolidação do saldo total da residência
Atualização dinâmica dos valores em tempo real
Regras de Negócio
Menores de 18 anos não podem registrar receitas
A validação é aplicada diretamente na interface, com bloqueio imediato da ação.
Consolidação financeira em tempo real
Cada transação atualiza automaticamente o saldo individual do usuário.
Balanço geral da residência
O sistema calcula continuamente:
Total de receitas
Total de despesas
Saldo líquido geral

**Arquitetura do Sistema**

desafio-controle-gastos/
├── ControleGastos/        # Backend (.NET Web API em C#)
└── gastoshid-front/       # Frontend (React + TypeScript + Vite)
    ├── src/
    │   ├── App.tsx        # Camada principal de UI e estado
    │   └── main.tsx      # Bootstrap da aplicação
    └── package.json       # Dependências do frontend

**Backend**
    cd ControleGastos
dotnet restore
dotnet run

**Frontend**
cd gastoshid-front
npm install
npm run dev

**Aplicação Disponivel**:
http://localhost:5173

**Criado por: Victor Angelini**

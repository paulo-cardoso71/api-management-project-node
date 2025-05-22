🚀 API de Gerenciamento de Projetos e Tarefas
Esta é uma API RESTful desenvolvida com Node.js, TypeScript, Express.js e Prisma (com PostgreSQL) para gerenciar projetos e suas respectivas tarefas. O projeto visa demonstrar boas práticas de desenvolvimento backend, incluindo estrutura organizada, validação de dados, tratamento de erros e uma base para futuras expansões como autenticação e testes mais robustos.

✨ Funcionalidades Principais
progetti Gerenciamento de Projetos:
Criar novos projetos com nome e descrição.

Listar todos os projetos existentes.

Buscar um projeto específico pelo seu ID.

Atualizar os dados de um projeto existente.

Deletar um projeto (e todas as suas tarefas associadas em cascata).

✔️ Gerenciamento de Tarefas:
Criar novas tarefas associadas a um projeto específico, com título, descrição, status e data de vencimento opcional.

Listar todas as tarefas pertencentes a um projeto.

Buscar uma tarefa específica pelo seu ID (dentro do escopo de um projeto).

Atualizar os dados de uma tarefa existente.

Deletar uma tarefa.

🛡️ Outras Funcionalidades:
Validação de Dados: Utilização de Zod para validar os dados de entrada nas requisições.

Tratamento de Erros: Middleware centralizado para tratamento de erros.

Health Check: Endpoint /health para verificar a saúde da API.

🛠️ Tecnologias Utilizadas
Backend: Node.js (v18+ recomendado)

Linguagem: TypeScript

Framework Web: Express.js

ORM: Prisma

Banco de Dados: PostgreSQL

Validação de Dados: Zod

Segurança Básica: Helmet, CORS

Tratamento de Erros Assíncronos: express-async-errors

Códigos de Status HTTP: http-status-codes

Variáveis de Ambiente: dotenv

Desenvolvimento: ts-node-dev para hot-reloading

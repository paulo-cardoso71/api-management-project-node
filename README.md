# 🚀 API de Gerenciamento de Projetos e Tarefas

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/lang-typescript-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Uma API RESTful robusta para gerenciamento de projetos e tarefas, construída com modernas tecnologias Node.js.

## 🌟 Recursos Principais

- **CRUD Completo** para Projetos e Tarefas
- **Validação de Dados** rigorosa com Zod
- **Tratamento de Erros** centralizado
- **Ordenação Automática** de resultados
- **Deleção em Cascata** de projetos/tarefas
- **Health Check** endpoint
- Pronto para produção com **Helmet & CORS**

## 🛠 Tecnologias

| Backend         | Banco de Dados   | Ferramentas       |
|-----------------|------------------|-------------------|
| Node.js 18+     | PostgreSQL       | Prisma ORM        |
| TypeScript      |                  | Zod               |
| Express.js      |                  | ts-node-dev       |
| REST API        |                  | Dotenv            |


## 🚀 Começando

### Pré-requisitos
- Node.js 18+
- PostgreSQL instalado
- npm ou yarn

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/api-gerenciamento.git
   cd api-gerenciamento

2. Instale as dependências:
    ```bash
    npm install

3. Configure o ambiente:
    ```bash
    cp .env.example .env # Edite o .env com suas credenciais

4. Execute as migrações:
    ```bash
    npx prisma migrate dev

5. Inicie o servidor:
    ```bash
    npm run dev

## 📡 Endpoints

### 🗂 Projetos

| Método | Endpoint           | Descrição                          |
|--------|--------------------|------------------------------------|
| POST   | `/projects`        | Cria novo projeto                  |
| GET    | `/projects`        | Lista todos projetos com tarefas   |
| GET    | `/projects/:id`    | Busca projeto por ID com tarefas   |
| PUT    | `/projects/:id`    | Atualiza dados do projeto          |
| DELETE | `/projects/:id`    | Remove projeto e tarefas associadas|

**Exemplo de Request:**
```json
POST /projects
{
  "name": "API Development",
  "description": "Desenvolvimento da API principal"
}

// 📥 Response (201 Created)
{
  "id": "clxq1z2000008qg8e5d9c2a3",
  "name": "API Development",
  "description": "Desenvolvimento da API principal",
  "createdAt": "2024-03-10T15:30:00.000Z",
  "tasks": []
}

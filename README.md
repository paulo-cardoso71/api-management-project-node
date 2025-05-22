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

// 📥 Response (200 OK)
[
  {
    "id": "clxq1z2000008qg8e5d9c2a3",
    "name": "API Development",
    "description": "Desenvolvimento da API principal",
    "createdAt": "2024-03-10T15:30:00.000Z",
    "tasks": [
      {
        "id": "cly12a3b000009qh1f6e7d8e9",
        "title": "Implementar autenticação",
        "status": "IN_PROGRESS"
      }
    ]
  }
]

// 📤 Request
{
  "title": "Configurar CI/CD",
  "description": "Implementar GitHub Actions",
  "status": "PENDING",
  "dueDate": "2024-03-20"
}

// 📥 Response (201 Created)
{
  "id": "cly14c5d00000aqi2g7f8h9i0",
  "title": "Configurar CI/CD",
  "description": "Implementar GitHub Actions",
  "status": "PENDING",
  "dueDate": "2024-03-20T00:00:00.000Z",
  "createdAt": "2024-03-10T16:30:00.000Z",
  "projectId": "clxq1z2000008qg8e5d9c2a3"
}

// 📥 Response (200 OK)
{
  "id": "cly14c5d00000aqi2g7f8h9i0",
  "title": "Configurar CI/CD",
  "description": "Implementar GitHub Actions",
  "status": "PENDING",
  "dueDate": "2024-03-20T00:00:00.000Z",
  "createdAt": "2024-03-10T16:30:00.000Z",
  "updatedAt": "2024-03-10T16:35:00.000Z"
}
```

### ✅ Tarefas
#### **Criar Tarefa** `POST /projects/:id/tasks`
```json
// 📤 Request
{
    "title": "Configurar CI/CD",
    "description": "Implementar Github Actions",
    "status": "PENDING",
    "dueDate": "2024-03-20"
}
```

#### **Listar Tarefas** `GET /projects/:id/tasks`
```json
// 📥 Response (200 OK)
[
  {
    "id": "cly12a3b000009qh1f6e7d8e9",
    "title": "Implementar autenticação",
    "status": "IN_PROGRESS",
    "dueDate": "2024-03-15T00:00:00.000Z",
    "createdAt": "2024-03-10T16:00:00.000Z"
  },
  {
    "id": "cly14c5d00000aqi2g7f8h9i0",
    "title": "Configurar CI/CD",
    "status": "PENDING",
    "dueDate": "2024-03-20T00:00:00.000Z",
    "createdAt": "2024-03-10T16:30:00.000Z"
  }
]
```

#### **Atualizar Tarefa** `PUT /projects/:id/tasks/:taskId`
```json
// 📤 Request
{
  "status": "COMPLETED",
  "dueDate": "2024-03-25"
}

// 📥 Response (200 OK)
{
  "id": "cly14c5d00000aqi2g7f8h9i0",
  "title": "Configurar CI/CD",
  "status": "COMPLETED",
  "dueDate": "2024-03-25T00:00:00.000Z",
  "updatedAt": "2024-03-10T17:00:00.000Z"
}
```

#### **Deletar Tarefa** `DELETE /projects/:id/tasks/:taskId`
```json
// 📥 Response (204 No Content)
```

### 🩺 Health Check
```json

// 📤 Request
GET /health

// 📥 Response (200 OK)
{
  "status": "OK",
  "timestamp": "2024-03-10T16:45:00.000Z",
  "version": "1.0.0",
  "database": "CONNECTED"
}
```

### 🧪 Testes
```bash

// 📤 Request
npm test

// 📥 Output Esperado
PASS  tests/integration/projects.test.ts

✓ POST /projects (201 ms)
✓ GET /projects (45 ms)
✓ DELETE /projects/:id (78 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```






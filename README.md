🚀 API de Gerenciamento de Projetos e TarefasEsta é uma API RESTful desenvolvida com Node.js, TypeScript, Express.js e Prisma (com PostgreSQL) para gerenciar projetos e suas respectivas tarefas. O projeto visa demonstrar boas práticas de desenvolvimento backend, incluindo estrutura organizada, validação de dados, tratamento de erros e uma base para futuras expansões como autenticação e testes mais robustos.✨ Funcionalidades Principaisprogetti Gerenciamento de Projetos:Criar novos projetos com nome e descrição.Listar todos os projetos existentes.Buscar um projeto específico pelo seu ID.Atualizar os dados de um projeto existente.Deletar um projeto (e todas as suas tarefas associadas em cascata).✔️ Gerenciamento de Tarefas:Criar novas tarefas associadas a um projeto específico, com título, descrição, status e data de vencimento opcional.Listar todas as tarefas pertencentes a um projeto.Buscar uma tarefa específica pelo seu ID (dentro do escopo de um projeto).Atualizar os dados de uma tarefa existente.Deletar uma tarefa.🛡️ Outras Funcionalidades:Validação de Dados: Utilização de Zod para validar os dados de entrada nas requisições.Tratamento de Erros: Middleware centralizado para tratamento de erros.Health Check: Endpoint /health para verificar a saúde da API.🛠️ Tecnologias UtilizadasBackend: Node.js (v18+ recomendado)Linguagem: TypeScriptFramework Web: Express.jsORM: PrismaBanco de Dados: PostgreSQLValidação de Dados: ZodSegurança Básica: Helmet, CORSTratamento de Erros Assíncronos: express-async-errorsCódigos de Status HTTP: http-status-codesVariáveis de Ambiente: dotenvDesenvolvimento: ts-node-dev para hot-reloading📁 Estrutura do Projetoapi-gerenciamento-projetos/
├── prisma/                 # Schema e migrações do Prisma
│   └── schema.prisma
├── src/                    # Código fonte da aplicação
│   ├── app.ts              # Configuração principal do Express e middlewares globais
│   ├── server.ts           # Inicialização do servidor HTTP e conexão com o banco
│   ├── dtos/               # Data Transfer Objects (Schemas de validação Zod)
│   ├── middlewares/        # Middlewares customizados (errorHandler, idValidator)
│   ├── services/           # Lógica de negócio, interação com o banco de dados
│   ├── controllers/        # Controladores de rota, manipulação de requisição/resposta HTTP
│   └── routes/             # Definição e organização das rotas da API
├── tests/                  # Testes automatizados (ex: integração)
│   └── integration/
├── .env                    # Arquivo de variáveis de ambiente (NÃO versionar)
├── .env.example            # Exemplo de variáveis de ambiente
├── .gitignore              # Arquivos e pastas ignorados pelo Git
├── package.json            # Metadados do projeto e dependências
├── tsconfig.json           # Configurações do compilador TypeScript
└── README.md               # Este arquivo
📋 Pré-requisitosNode.js (v18 ou superior)npm (ou Yarn)PostgreSQL instalado e rodandoGit⚙️ Configuração e InstalaçãoClone o repositório (se aplicável):git clone <URL_DO_SEU_REPOSITORIO_GIT>
cd api-gerenciamento-projetos
Instale as dependências:npm install
# ou
# yarn install
Configure as Variáveis de Ambiente:Copie o arquivo .env.example para um novo arquivo chamado .env:cp .env.example .env
Edite o arquivo .env e configure a variável DATABASE_URL com a string de conexão do seu banco de dados PostgreSQL.Exemplo: DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO?schema=public"(Se estiver usando o usuário postgres e o banco mydb localmente: DATABASE_URL="postgresql://postgres:sua_senha_postgres@localhost:5432/mydb?schema=public")Execute as Migrações do Prisma:Este comando cria as tabelas no seu banco de dados com base no prisma/schema.prisma.npx prisma migrate dev --name init
(Se for a primeira vez, o Prisma pode pedir para criar o banco de dados se ele não existir).Gere o Prisma Client:Este comando gera o cliente Prisma tipado com base no seu schema.npx prisma generate
▶️ Como Rodar a AplicaçãoModo de Desenvolvimento (com hot-reload):npm run dev
O servidor iniciará (geralmente na porta 3000, configurável no .env).Você verá mensagens no console indicando a conexão com o banco e o status do servidor.Build para Produção:npm run build
Isso compilará os arquivos TypeScript para JavaScript no diretório dist/.Iniciar em Modo de Produção (após o build):npm run start
📜 Scripts Disponíveis no package.jsonnpm run dev: Inicia o servidor em modo de desenvolvimento com ts-node-dev.npm run build: Compila o código TypeScript para JavaScript.npm run start: Inicia o servidor a partir dos arquivos compilados (para produção).npm run test: Executa os testes com Jest (se configurado).npm run prisma:generate: Gera/atualiza o Prisma Client.npm run prisma:migrate: Aplica as migrações do banco de dados.npm run prisma:studio: Abre o Prisma Studio (GUI para visualizar e editar dados do banco).📡 Endpoints da APIA URL base para todos os endpoints é http://localhost:PORTA/api/v1 (a porta padrão é 3000).❤️ Health CheckGET /healthDescrição: Verifica a saúde da API.Resposta (200 OK):{
  "message": "API is healthy and running!",
  "uptime": 110.513822,
  "timestamp": "2025-05-22T12:16:46.478Z"
}
🗂️ Projetos (/projects)POST /projectsDescrição: Cria um novo projeto.Corpo da Requisição (JSON):{
  "name": "Nome do Projeto", // string, obrigatório, min 3 caracteres
  "description": "Descrição opcional do projeto" // string, opcional
}
Resposta (201 Created): Detalhes do projeto criado.GET /projectsDescrição: Lista todos os projetos. Inclui tarefas associadas.Resposta (200 OK): Array de projetos.GET /projects/:projectIdDescrição: Busca um projeto específico pelo seu ID. Inclui tarefas associadas, ordenadas por data de criação.Resposta (200 OK): Detalhes do projeto.Resposta (404 Not Found): Se o projeto não existir.Resposta (400 Bad Request): Se o projectId for inválido.PUT /projects/:projectIdDescrição: Atualiza um projeto existente.Corpo da Requisição (JSON): (Pelo menos um campo deve ser fornecido){
  "name": "Novo Nome do Projeto", // string, opcional
  "description": "Nova descrição" // string, opcional, pode ser null para limpar
}
Resposta (200 OK): Detalhes do projeto atualizado.DELETE /projects/:projectIdDescrição: Deleta um projeto e todas as suas tarefas associadas.Resposta (204 No Content): Sem corpo na resposta.✅ Tarefas (/projects/:projectId/tasks)POST /projects/:projectId/tasksDescrição: Cria uma nova tarefa para o projeto especificado.Corpo da Requisição (JSON):{
  "title": "Título da Tarefa", // string, obrigatório, min 3 caracteres
  "description": "Descrição opcional da tarefa", // string, opcional
  "status": "PENDING", // string, opcional, default 'PENDING'. Valores: 'PENDING', 'IN_PROGRESS', 'COMPLETED'
  "dueDate": "2025-12-31T00:00:00.000Z" // string, opcional, formato ISO 8601
}
Resposta (201 Created): Detalhes da tarefa criada.GET /projects/:projectId/tasksDescrição: Lista todas as tarefas do projeto especificado, ordenadas por data de criação.Resposta (200 OK): Array de tarefas.GET /projects/:projectId/tasks/:taskIdDescrição: Busca uma tarefa específica dentro de um projeto.Resposta (200 OK): Detalhes da tarefa.PUT /projects/:projectId/tasks/:taskIdDescrição: Atualiza uma tarefa existente.Corpo da Requisição (JSON): (Pelo menos um campo deve ser fornecido){
  "title": "Novo Título da Tarefa", // opcional
  "description": "Nova descrição", // opcional, pode ser null
  "status": "IN_PROGRESS", // opcional
  "dueDate": "2026-01-15T00:00:00.000Z" // opcional, pode ser null
}
Resposta (200 OK): Detalhes da tarefa atualizada.DELETE /projects/:projectId/tasks/:taskIdDescrição: Deleta uma tarefa específica.Resposta (204 No Content): Sem corpo na resposta.🧪 TestesPara executar os testes de integração (exemplo inicial fornecido):npm test
Os arquivos de teste estão localizados em tests/integration/. É altamente recomendável expandir a cobertura de testes.🚀 Próximos Passos SugeridosAutenticação e Autorização: Implementar login de usuários (ex: JWT) e proteger rotas.Testes Abrangentes: Aumentar a cobertura de testes unitários (para services) e de integração.Documentação da API com Swagger/OpenAPI: Gerar documentação interativa.Paginação e Filtros: Para listagens com muitos dados.Logging Avançado: Utilizar bibliotecas como Winston para logs em produção.CI/CD: Configurar pipelines de integração e deploy contínuos (ex: GitHub Actions).Containerização: Dockerizar a aplicação para facilitar o deploy e o ambiente de desenvolvimento.Sinta-se à vontade para contribuir e melhorar este projeto!

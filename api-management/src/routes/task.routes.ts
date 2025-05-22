import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { validateIdParams } from '../middlewares/idValidator.middleware';

// O Router para tarefas será montado em /projects/:projectId/tasks
// mergeParams: true é crucial para que as rotas de tarefas tenham acesso ao projectId da rota pai (projetos)
const taskRouter = Router({ mergeParams: true });
const taskController = new TaskController();

// Middleware para validar o projectId em todas as rotas de tarefas,
// já que ele vem da rota pai e é essencial para todas as operações de tarefas.
// O validateIdParams(['projectId']) já está na rota de projetos para quando acessamos /projects/:projectId diretamente.
// Para as rotas de tarefas, o projectId já estará disponível em req.params.projectId devido ao mergeParams.
// Poderíamos adicionar uma validação específica aqui se necessário, mas o principal é garantir que ele exista.

// POST /projects/:projectId/tasks - Criar uma nova tarefa para um projeto
taskRouter.post(
    '/',
    validateIdParams(['projectId']), // Valida o projectId da URL
    taskController.create
);

// GET /projects/:projectId/tasks - Listar todas as tarefas de um projeto
taskRouter.get(
    '/',
    validateIdParams(['projectId']),
    taskController.findAllByProjectId
);

// GET /projects/:projectId/tasks/:taskId - Buscar uma tarefa específica
taskRouter.get(
    '/:taskId',
    validateIdParams(['projectId', 'taskId']), // Valida ambos os IDs
    taskController.findById
);

// PUT /projects/:projectId/tasks/:taskId - Atualizar uma tarefa específica
taskRouter.put(
    '/:taskId',
    validateIdParams(['projectId', 'taskId']),
    taskController.update
);

// DELETE /projects/:projectId/tasks/:taskId - Deletar uma tarefa específica
taskRouter.delete(
    '/:taskId',
    validateIdParams(['projectId', 'taskId']),
    taskController.delete
);

export { taskRouter };

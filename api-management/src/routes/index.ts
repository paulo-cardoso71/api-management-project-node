import { Router } from 'express';
import { projectRouter } from './project.routes';
import { taskRouter } from './task.routes'; // Importa as rotas de tarefas

const routes = Router();

// Monta as rotas de projetos no caminho /projects
routes.use('/projects', projectRouter);

// Monta as rotas de tarefas aninhadas sob /projects/:projectId/tasks
// O taskRouter já está configurado com mergeParams: true para acessar o :projectId
projectRouter.use('/:projectId/tasks', taskRouter);
// Esta linha acima aninha as rotas de tarefa DENTRO das rotas de projeto.
// Exemplo: GET /api/v1/projects/ID_DO_PROJETO/tasks

export { routes };

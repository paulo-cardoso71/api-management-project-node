import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { validateIdParams } from '../middlewares/idValidator.middleware';

const projectRouter = Router();
const projectController = new ProjectController();

// Rotas para /api/v1/projects

// POST /projects - Criar um novo projeto
projectRouter.post('/', projectController.create);

// GET /projects - Listar todos os projetos
projectRouter.get('/', projectController.findAll);

// GET /projects/:projectId - Buscar um projeto específico pelo ID
// Middleware para validar o formato do projectId
projectRouter.get(
    '/:projectId',
    validateIdParams(['projectId']),
    projectController.findById
);

// PUT /projects/:projectId - Atualizar um projeto específico
projectRouter.put(
    '/:projectId',
    validateIdParams(['projectId']),
    projectController.update
);

// DELETE /projects/:projectId - Deletar um projeto específico
projectRouter.delete(
    '/:projectId',
    validateIdParams(['projectId']),
    projectController.delete
);

export { projectRouter };

import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ProjectService } from '../services/project.service';
import { CreateProjectSchema, UpdateProjectSchema } from '../dtos/project.dtos';
import { ZodError } from 'zod';

export class ProjectController {
  private projectService = new ProjectService();

  // Handler para criar um novo projeto
  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = CreateProjectSchema.parse(req.body);
      const project = await this.projectService.create(validatedData);
      res.status(StatusCodes.CREATED).json({ success: true, data: project });
    } catch (error) {
      next(error); // Passa o erro para o middleware de tratamento de erros
    }
  };

  // Handler para buscar todos os projetos
  findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const projects = await this.projectService.findAll();
      res.status(StatusCodes.OK).json({ success: true, count: projects.length, data: projects });
    } catch (error) {
      next(error);
    }
  };

  // Handler para buscar um projeto pelo ID
  findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { projectId } = req.params;
      const project = await this.projectService.findById(projectId);
      // O service já lança ApiError se não encontrado, então não precisamos checar null aqui.
      res.status(StatusCodes.OK).json({ success: true, data: project });
    } catch (error) {
      next(error);
    }
  };

  // Handler para atualizar um projeto
  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { projectId } = req.params;
      const validatedData = UpdateProjectSchema.parse(req.body);

      // Verifica se há dados para atualizar
      if (Object.keys(validatedData).length === 0) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Nenhum dado fornecido para atualização.'
        });
        return;
      }

      const updatedProject = await this.projectService.update(projectId, validatedData);
      res.status(StatusCodes.OK).json({ success: true, data: updatedProject });
    } catch (error) {
      next(error);
    }
  };

  // Handler para deletar um projeto
  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { projectId } = req.params;
      await this.projectService.delete(projectId);
      res.status(StatusCodes.NO_CONTENT).send(); // Resposta 204 No Content para deleção bem-sucedida
    } catch (error) {
      next(error);
    }
  };
}

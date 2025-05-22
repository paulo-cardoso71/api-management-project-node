import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TaskService } from '../services/task.service';
import { CreateTaskSchema, UpdateTaskSchema } from '../dtos/task.dtos';
import { ZodError } from 'zod';

export class TaskController {
  private taskService = new TaskService();

  // Handler para criar uma nova tarefa em um projeto
  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { projectId } = req.params;
      const validatedData = CreateTaskSchema.parse(req.body);
      const task = await this.taskService.create(projectId, validatedData);
      res.status(StatusCodes.CREATED).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  };

  // Handler para buscar todas as tarefas de um projeto
  findAllByProjectId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { projectId } = req.params;
      const tasks = await this.taskService.findAllByProjectId(projectId);
      res.status(StatusCodes.OK).json({ success: true, count: tasks.length, data: tasks });
    } catch (error) {
      next(error);
    }
  };

  // Handler para buscar uma tarefa específica pelo ID
  findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { projectId, taskId } = req.params;
      const task = await this.taskService.findById(projectId, taskId);
      res.status(StatusCodes.OK).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  };

  // Handler para atualizar uma tarefa
  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { projectId, taskId } = req.params;
      const validatedData = UpdateTaskSchema.parse(req.body);

      if (Object.keys(validatedData).length === 0) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Nenhum dado fornecido para atualização.'
        });
        return;
      }

      const updatedTask = await this.taskService.update(projectId, taskId, validatedData);
      res.status(StatusCodes.OK).json({ success: true, data: updatedTask });
    } catch (error) {
      next(error);
    }
  };

  // Handler para deletar uma tarefa
  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { projectId, taskId } = req.params;
      await this.taskService.delete(projectId, taskId);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  };
}

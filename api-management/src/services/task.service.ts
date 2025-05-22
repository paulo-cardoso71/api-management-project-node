import { PrismaClient, Task } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dtos';
import { ApiError } from '../middlewares/errorHandler.middleware';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

export class TaskService {
  /**
   * Cria uma nova tarefa associada a um projeto.
   * @param projectId - O ID do projeto ao qual a tarefa pertence.
   * @param data - Dados para criação da tarefa.
   * @returns A tarefa criada.
   */
  async create(projectId: string, data: CreateTaskDto): Promise<Task> {
    try {
      // Verifica se o projeto existe
      const projectExists = await prisma.project.findUnique({ where: { id: projectId } });
      if (!projectExists) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Projeto com ID ${projectId} não encontrado para associar a tarefa.`);
      }

      const task = await prisma.task.create({
        data: {
          ...data,
          projectId, // Associa a tarefa ao projeto
          dueDate: data.dueDate ? new Date(data.dueDate) : null, // Converte string de data para objeto Date
        },
      });
      return task;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error("Erro ao criar tarefa no serviço:", error);
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Não foi possível criar a tarefa.');
    }
  }

  /**
   * Busca todas as tarefas de um projeto específico.
   * @param projectId - O ID do projeto.
   * @returns Uma lista de tarefas do projeto.
   */
  async findAllByProjectId(projectId: string): Promise<Task[]> {
    try {
      // Verifica se o projeto existe
      const projectExists = await prisma.project.findUnique({ where: { id: projectId } });
      if (!projectExists) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Projeto com ID ${projectId} não encontrado para listar tarefas.`);
      }

      return await prisma.task.findMany({
        where: { projectId },
        orderBy: {
          createdAt: 'asc', // Ordena por data de criação
        },
      });
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(`Erro ao buscar tarefas do projeto ${projectId} no serviço:`, error);
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Não foi possível buscar as tarefas do projeto ${projectId}.`);
    }
  }

  /**
   * Busca uma tarefa específica pelo seu ID e ID do projeto.
   * @param projectId - O ID do projeto.
   * @param taskId - O ID da tarefa.
   * @returns A tarefa encontrada ou null se não existir.
   */
  async findById(projectId: string, taskId: string): Promise<Task | null> {
    try {
      const task = await prisma.task.findUnique({
        where: {
          id: taskId,
          projectId: projectId, // Garante que a tarefa pertence ao projeto especificado
        },
      });
      if (!task) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Tarefa com ID ${taskId} não encontrada no projeto ${projectId}.`);
      }
      return task;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(`Erro ao buscar tarefa ${taskId} do projeto ${projectId} no serviço:`, error);
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Não foi possível buscar a tarefa ${taskId}.`);
    }
  }

  /**
   * Atualiza uma tarefa existente.
   * @param projectId - O ID do projeto.
   * @param taskId - O ID da tarefa a ser atualizada.
   * @param data - Dados para atualização da tarefa.
   * @returns A tarefa atualizada.
   */
  async update(projectId: string, taskId: string, data: UpdateTaskDto): Promise<Task> {
    try {
      // Verifica se a tarefa existe no projeto especificado antes de tentar atualizar
      const existingTask = await prisma.task.findUnique({
        where: { id: taskId, projectId: projectId },
      });
      if (!existingTask) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Tarefa com ID ${taskId} não encontrada no projeto ${projectId} para atualização.`);
      }

      const updatedTask = await prisma.task.update({
        where: {
          id: taskId,
          // projectId: projectId, // Opcional, mas bom para garantir consistência se o ID do projeto pudesse mudar
        },
        data: {
            ...data,
            dueDate: data.dueDate !== undefined ? (data.dueDate === null ? null : new Date(data.dueDate)) : undefined,
        },
      });
      return updatedTask;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(`Erro ao atualizar tarefa ${taskId} no serviço:`, error);
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Não foi possível atualizar a tarefa ${taskId}.`);
    }
  }

  /**
   * Deleta uma tarefa pelo seu ID e ID do projeto.
   * @param projectId - O ID do projeto.
   * @param taskId - O ID da tarefa a ser deletada.
   * @returns A tarefa deletada.
   */
  async delete(projectId: string, taskId: string): Promise<Task> {
    try {
      // Verifica se a tarefa existe no projeto especificado antes de tentar deletar
      const existingTask = await prisma.task.findUnique({
        where: { id: taskId, projectId: projectId },
      });
      if (!existingTask) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Tarefa com ID ${taskId} não encontrada no projeto ${projectId} para deleção.`);
      }

      const deletedTask = await prisma.task.delete({
        where: {
          id: taskId,
        },
      });
      return deletedTask;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(`Erro ao deletar tarefa ${taskId} no serviço:`, error);
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Não foi possível deletar a tarefa ${taskId}.`);
    }
  }
}

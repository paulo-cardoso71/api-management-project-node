import { PrismaClient, Project } from '@prisma/client';
import { CreateProjectDto, UpdateProjectDto } from '../dtos/project.dtos';
import { ApiError } from '../middlewares/errorHandler.middleware';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

export class ProjectService {
  /**
   * Cria um novo projeto.
   * @param data - Dados para criação do projeto.
   * @returns O projeto criado.
   */
  async create(data: CreateProjectDto): Promise<Project> {
    try {
      const project = await prisma.project.create({
        data,
      });
      return project;
    } catch (error) {
      // Logar o erro original para debugging interno
      console.error("Erro ao criar projeto no serviço:", error);
      // Lançar um erro mais genérico ou específico para a camada de controller
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Não foi possível criar o projeto.');
    }
  }

  /**
   * Busca todos os projetos.
   * @returns Uma lista de todos os projetos.
   */
  async findAll(): Promise<Project[]> {
    try {
      return await prisma.project.findMany({
        include: {
          tasks: true, // Inclui as tarefas associadas a cada projeto
        },
        orderBy: {
          createdAt: 'desc', // Ordena por data de criação, mais recentes primeiro
        }
      });
    } catch (error) {
      console.error("Erro ao buscar todos os projetos no serviço:", error);
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Não foi possível buscar os projetos.');
    }
  }

  /**
   * Busca um projeto pelo ID.
   * @param id - O ID do projeto.
   * @returns O projeto encontrado ou null se não existir.
   */
  async findById(id: string): Promise<Project | null> {
    try {
      const project = await prisma.project.findUnique({
        where: { id },
        include: {
          tasks: { // Inclui tarefas e ordena por data de criação
            orderBy: {
              createdAt: 'asc'
            }
          },
        },
      });
      if (!project) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Projeto com ID ${id} não encontrado.`);
      }
      return project;
    } catch (error) {
      if (error instanceof ApiError) throw error; // Re-lança ApiError
      console.error(`Erro ao buscar projeto ${id} no serviço:`, error);
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Não foi possível buscar o projeto ${id}.`);
    }
  }

  /**
   * Atualiza um projeto existente.
   * @param id - O ID do projeto a ser atualizado.
   * @param data - Dados para atualização do projeto.
   * @returns O projeto atualizado.
   */
  async update(id: string, data: UpdateProjectDto): Promise<Project> {
    try {
      // Verifica se o projeto existe antes de tentar atualizar
      const existingProject = await prisma.project.findUnique({ where: { id } });
      if (!existingProject) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Projeto com ID ${id} não encontrado para atualização.`);
      }

      const updatedProject = await prisma.project.update({
        where: { id },
        data,
      });
      return updatedProject;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(`Erro ao atualizar projeto ${id} no serviço:`, error);
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Não foi possível atualizar o projeto ${id}.`);
    }
  }

  /**
   * Deleta um projeto pelo ID.
   * A deleção é em cascata para as tarefas (definido no schema.prisma).
   * @param id - O ID do projeto a ser deletado.
   * @returns O projeto deletado.
   */
  async delete(id: string): Promise<Project> {
    try {
      // Verifica se o projeto existe antes de tentar deletar
      const existingProject = await prisma.project.findUnique({ where: { id } });
      if (!existingProject) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Projeto com ID ${id} não encontrado para deleção.`);
      }

      const deletedProject = await prisma.project.delete({
        where: { id },
      });
      return deletedProject;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(`Erro ao deletar projeto ${id} no serviço:`, error);
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Não foi possível deletar o projeto ${id}.`);
    }
  }
}

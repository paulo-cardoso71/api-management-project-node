import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

// Schema para validar se um ID é um CUID (formato usado pelo Prisma por padrão)
// CUIDs são strings alfanuméricas, geralmente com 25 caracteres, começando com 'c'.
// Esta é uma validação simples, pode ser ajustada para ser mais rigorosa se necessário.
const cuidSchema = z.string().regex(/^c[a-z0-9]{24}$/, {
  message: "O ID fornecido não está em um formato CUID válido (ex: 'clx123abcde...')",
});

// Middleware para validar IDs de parâmetros de rota (ex: /projects/:projectId)
export const validateIdParams = (paramNames: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const paramName of paramNames) {
        if (req.params[paramName]) {
          cuidSchema.parse(req.params[paramName]);
        } else {
          // Se o parâmetro não estiver presente, mas for esperado, pode-se lançar um erro
          // ou deixar passar se for opcional em algum contexto (não comum para IDs de rota).
          // Aqui, vamos assumir que se está no array, é esperado.
          return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: `Parâmetro de ID '${paramName}' ausente na rota.`,
          });
        }
      }
      next(); // Se todos os IDs forem válidos, prossegue para o próximo handler
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'ID de parâmetro inválido.',
          errors: error.errors.map(e => ({
            path: e.path.join('.'), // Embora aqui seja geralmente vazio para um string simples
            message: e.message,
          })),
        });
      }
      // Se for outro tipo de erro, passa para o error handler global
      next(error);
    }
  };
};

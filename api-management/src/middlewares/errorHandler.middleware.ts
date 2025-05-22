import { Request, Response, NextFunction } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { ZodError } from 'zod';

interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

// Middleware para tratamento centralizado de erros
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction // next é necessário mesmo que não usado explicitamente para que o Express o reconheça como error handler
): void => {
  console.error('💥 OCORREU UM ERRO:', err);

  // Erros de validação do Zod
  if (err instanceof ZodError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Erro de validação.',
      errors: err.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  // Erros operacionais conhecidos (lançados intencionalmente pela aplicação)
  if (err.isOperational) {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({
      success: false,
      message: err.message || getReasonPhrase(statusCode),
    });
    return;
  }

  // Erros inesperados (bugs, falhas de sistema)
  // Em produção, não vaze detalhes do erro para o cliente
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message =
    process.env.NODE_ENV === 'production'
      ? getReasonPhrase(statusCode) // Mensagem genérica em produção
      : err.message || getReasonPhrase(statusCode); // Mensagem detalhada em desenvolvimento

  res.status(statusCode).json({
    success: false,
    message: message,
    // Em desenvolvimento, pode ser útil enviar o stack trace
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

// Classe de Erro customizada para erros operacionais
export class ApiError extends Error implements AppError {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype); // Mantém a cadeia de protótipos
    Error.captureStackTrace(this); // Captura o stack trace
  }
}

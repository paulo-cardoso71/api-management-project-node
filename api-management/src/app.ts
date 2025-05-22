import 'express-async-errors'; // Deve ser importado no topo para capturar erros assíncronos
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import { routes } from './routes'; // Importa o agregador de rotas
import { errorHandler } from './middlewares/errorHandler.middleware'; // Importa o middleware de tratamento de erros

dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

const app: Express = express();

// Middlewares de segurança e parseamento
app.use(helmet()); // Ajuda a proteger a aplicação configurando vários cabeçalhos HTTP
app.use(cors()); // Habilita o Cross-Origin Resource Sharing
app.use(express.json()); // Permite que a aplicação entenda requisições com corpo em JSON
app.use(express.urlencoded({ extended: true })); // Permite que a aplicação entenda requisições com corpo urlencoded

// Rota de health check (verificação de saúde da API)
app.get('/health', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    message: 'API is healthy and running!',
    uptime: process.uptime(), // Tempo que a aplicação está no ar
    timestamp: new Date().toISOString(),
  });
});

// Rotas da aplicação
app.use('/api/v1', routes); // Prefixa todas as rotas com /api/v1

// Middleware para rotas não encontradas (404)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: `Rota não encontrada: ${req.method} ${req.originalUrl}`,
  });
});

// Middleware de tratamento de erros (deve ser o último middleware)
app.use(errorHandler);

export { app };

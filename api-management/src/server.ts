import { app } from './app'; // Importa a instância configurada do Express
import { PrismaClient } from '@prisma/client';

const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

async function main() {
  try {
    // Tenta conectar ao banco de dados ao iniciar o servidor
    await prisma.$connect();
    console.log('🔌 Conectado ao banco de dados com sucesso!');

    // Inicia o servidor HTTP
    const server = app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`🔗 URL base: http://localhost:${PORT}/api/v1`);
      console.log(`🩺 Health check: http://localhost:${PORT}/health`);
    });

    // Lida com o encerramento gracioso da aplicação
    const gracefulShutdown = async (signal: string) => {
      console.log(`\n🚦 Recebido sinal ${signal}. Desligando graciosamente...`);
      server.close(async () => {
        console.log('🚪 Servidor HTTP fechado.');
        await prisma.$disconnect();
        console.log('🔌 Desconectado do banco de dados.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM')); // Sinal de término padrão
    process.on('SIGINT', () => gracefulShutdown('SIGINT')); // Sinal de interrupção (Ctrl+C)

  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor ou conectar ao banco:', error);
    await prisma.$disconnect();
    process.exit(1); // Termina o processo com erro
  }
}

main();

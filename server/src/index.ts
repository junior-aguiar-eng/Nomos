import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { testConnection } from './config/db.js';
import { initSchema } from './schema.js';
import { registerDisciplinasRoutes } from './routes/disciplinas.js';
import { registerTemasRoutes } from './routes/temas.js';
import { registerCasosRoutes } from './routes/casos.js';
import { runSeed } from './services/seed-service.js';
import { pool } from './config/db.js';

dotenv.config();

const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info'
  }
});

async function startServer() {
  try {
    // 1. Registra CORS para permitir consumo do Vite frontend
    await fastify.register(cors, {
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    });

    // 2. Healthcheck
    fastify.get('/api/health', async () => {
      return { status: 'healthy', timestamp: new Date().toISOString() };
    });

    // 3. Registra rotas da API
    await registerDisciplinasRoutes(fastify);
    await registerTemasRoutes(fastify);
    await registerCasosRoutes(fastify);

    // 4. Conecta ao PostgreSQL e inicializa schema
    const isConnected = await testConnection();
    if (isConnected) {
      await initSchema();

      // Verifica se o banco já possui temas; se vazio, executa seed inicial automaticamente
      const countRes = await pool.query('SELECT COUNT(*) FROM temas');
      const totalTemas = parseInt(countRes.rows[0].count, 10);
      if (totalTemas === 0) {
        console.log('[AUTO-SEED] Base de dados vazia detectada. Executando ingestão inicial...');
        try {
          await runSeed();
        } catch (seedErr) {
          console.warn('[AUTO-SEED] Aviso durante auto-seed:', seedErr);
        }
      } else {
        console.log(`[DB] Base de dados já populada com ${totalTemas} temas doutrinários.`);
      }
    } else {
      console.warn('[DB] Servidor iniciado, mas conexão com banco de dados pendente.');
    }

    // 5. Inicia o servidor HTTP
    const port = Number(process.env.PORT) || 3001;
    const host = process.env.HOST || '0.0.0.0';

    await fastify.listen({ port, host });
    console.log(`🚀 NOMOS API rodando em http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();

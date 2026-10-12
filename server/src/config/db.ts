import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://nomos_user:nomos_password@localhost:5432/nomos_db',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

pool.on('error', (err: Error) => {
  console.error('[DB] Erro inesperado no pool do PostgreSQL:', err);
});

export async function testConnection(maxRetries = 10, delayMs = 1500): Promise<boolean> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const client = await pool.connect();
      const res = await client.query('SELECT NOW()');
      client.release();
      console.log('[DB] Conexão com PostgreSQL estabelecida com sucesso:', res.rows[0].now);
      return true;
    } catch (err: any) {
      console.warn(
        `[DB] Tentativa ${attempt}/${maxRetries} de conexão com PostgreSQL falhou (${err.message}). Aguardando ${delayMs}ms...`
      );
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }
  console.error('[DB] Todas as tentativas de conexão com PostgreSQL falharam.');
  return false;
}

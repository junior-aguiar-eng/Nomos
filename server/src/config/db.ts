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
  connectionTimeoutMillis: 2000
});

pool.on('error', (err: Error) => {
  console.warn('[DB] Pool do PostgreSQL em repouso:', err.message);
});

export async function testConnection(maxRetries = 2, delayMs = 500): Promise<boolean> {
  if (!process.env.DATABASE_URL) {
    console.info('[DB] DATABASE_URL não configurada — operando com base de dados doutrinária em memória.');
    return false;
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const client = await pool.connect();
      const res = await client.query('SELECT NOW()');
      client.release();
      console.log('[DB] Conexão com PostgreSQL estabelecida com sucesso:', res.rows[0].now);
      return true;
    } catch (err: any) {
      console.warn(
        `[DB] Tentativa ${attempt}/${maxRetries} de conexão com PostgreSQL falhou (${err.message}).`
      );
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }
  console.info('[DB] PostgreSQL não disponível — operando com base de dados doutrinária em memória.');
  return false;
}

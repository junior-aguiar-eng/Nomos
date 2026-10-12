import { pool } from './config/db.js';

export async function initSchema(): Promise<void> {
  const client = await pool.connect();
  try {
    console.log('[DB] Verificando e inicializando schema do banco de dados...');

    await client.query(`CREATE EXTENSION IF NOT EXISTS unaccent;`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS disciplinas (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(100) UNIQUE NOT NULL,
        nome VARCHAR(255) NOT NULL,
        icone VARCHAR(100)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS temas (
        id VARCHAR(100) PRIMARY KEY,
        disciplina_id INT REFERENCES disciplinas(id) ON DELETE CASCADE,
        numero_tema INT NOT NULL,
        titulo VARCHAR(255) NOT NULL,
        subtitulo TEXT,
        tempo_estimado_min INT DEFAULT 20,
        eixo VARCHAR(50),
        ementa_analitica TEXT,
        conteudo_markdown TEXT,
        ordem INT DEFAULT 0,
        related_case_id VARCHAR(100),
        related_concept_id VARCHAR(100),
        tsv TSVECTOR GENERATED ALWAYS AS (
          to_tsvector('portuguese', coalesce(titulo, '') || ' ' || coalesce(subtitulo, '') || ' ' || coalesce(ementa_analitica, '') || ' ' || coalesce(conteudo_markdown, ''))
        ) STORED
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_temas_disciplina_id ON temas(disciplina_id);
      CREATE INDEX IF NOT EXISTS idx_temas_tsv ON temas USING GIN(tsv);
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS casos_praticos (
        id VARCHAR(100) PRIMARY KEY,
        disciplina_id INT REFERENCES disciplinas(id) ON DELETE CASCADE,
        codigo_processo VARCHAR(100),
        titulo VARCHAR(255) NOT NULL,
        dificuldade VARCHAR(50),
        status VARCHAR(50) DEFAULT 'ativo',
        relatorio_fatos TEXT,
        dilema_central TEXT,
        alternativas JSONB,
        axis_id VARCHAR(50),
        assigned_role VARCHAR(255),
        institutional_context VARCHAR(255),
        night_vision_hint TEXT,
        compatibility_rules JSONB
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_casos_disciplina_id ON casos_praticos(disciplina_id);
    `);

    console.log('[DB] Schema inicializado com sucesso.');
  } finally {
    client.release();
  }
}

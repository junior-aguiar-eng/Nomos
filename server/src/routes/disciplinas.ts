import { FastifyInstance } from 'fastify';
import { pool } from '../config/db.js';

const DEFAULT_DISCIPLINAS = [
  { id: 1, slug: 'direito-constitucional', nome: 'Direito Constitucional', icone: 'Shield' },
  { id: 2, slug: 'direito-administrativo', nome: 'Direito Administrativo', icone: 'Scale' },
  { id: 3, slug: 'direito-penal', nome: 'Direito Penal', icone: 'Gavel' },
  { id: 4, slug: 'direito-tributario', nome: 'Direito Tributário', icone: 'Coins' },
  { id: 5, slug: 'direito-processo-civil', nome: 'Direito Processual Civil', icone: 'FileText' }
];

export async function registerDisciplinasRoutes(fastify: FastifyInstance): Promise<void> {
  // GET /api/disciplinas - Lista matérias ativas
  fastify.get('/api/disciplinas', async (_request, reply) => {
    try {
      const res = await pool.query(`
        SELECT id, slug, nome, icone
        FROM disciplinas
        ORDER BY id ASC
      `);
      if (res.rows.length === 0) {
        return reply.send(DEFAULT_DISCIPLINAS);
      }
      return reply.send(res.rows);
    } catch (err) {
      fastify.log.warn({ err }, '[API Disciplinas] Fallback para catálogo em memória.');
      return reply.send(DEFAULT_DISCIPLINAS);
    }
  });

  // GET /api/disciplinas/:slug/temas - Retorna apenas metadados dos temas sem conteudo_markdown
  fastify.get('/api/disciplinas/:slug/temas', async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const { q } = request.query as { q?: string };

    try {
      // 1. Obtém o ID da disciplina pelo slug (aceita 'administrativo' ou 'direito-administrativo')
      const discRes = await pool.query(
        `SELECT id, nome, slug FROM disciplinas 
         WHERE slug = $1 
            OR slug = 'direito-' || $1 
            OR 'direito-' || slug = $1
         LIMIT 1`,
        [slug]
      );

      if (discRes.rows.length === 0) {
        return reply.status(404).send({ error: `Disciplina '${slug}' não encontrada` });
      }

      const disciplinaId = discRes.rows[0].id;

      // 2. Monta consulta de temas (sem o campo pesado conteudo_markdown)
      let query: string;
      let params: unknown[];

      if (q && q.trim()) {
        const searchTerm = q.trim();
        query = `
          SELECT 
            t.id, t.disciplina_id, t.numero_tema, t.titulo, t.subtitulo,
            t.tempo_estimado_min, t.eixo, t.ementa_analitica, t.ordem,
            t.related_case_id, t.related_concept_id
          FROM temas t
          WHERE t.disciplina_id = $1
            AND (
              t.tsv @@ plainto_tsquery('portuguese', $2)
              OR unaccent(t.titulo) ILIKE unaccent('%' || $2 || '%')
              OR unaccent(t.subtitulo) ILIKE unaccent('%' || $2 || '%')
              OR unaccent(t.ementa_analitica) ILIKE unaccent('%' || $2 || '%')
              OR unaccent(coalesce(t.conteudo_markdown, '')) ILIKE unaccent('%' || $2 || '%')
            )
          ORDER BY t.numero_tema ASC, t.ordem ASC
        `;
        params = [disciplinaId, searchTerm];
      } else {
        query = `
          SELECT 
            t.id, t.disciplina_id, t.numero_tema, t.titulo, t.subtitulo,
            t.tempo_estimado_min, t.eixo, t.ementa_analitica, t.ordem,
            t.related_case_id, t.related_concept_id
          FROM temas t
          WHERE t.disciplina_id = $1
          ORDER BY t.numero_tema ASC, t.ordem ASC
        `;
        params = [disciplinaId];
      }

      const res = await pool.query(query, params);

      // Normaliza payload oferecendo tanto nomes em português quanto padrão compendium
      const themes = res.rows.map(row => ({
        id: row.id,
        disciplinaId: row.disciplina_id,
        number: row.numero_tema,
        numeroTema: row.numero_tema,
        numero_tema: row.numero_tema,
        title: row.titulo,
        titulo: row.titulo,
        subtitle: row.subtitulo,
        subtitulo: row.subtitulo,
        analyticalEmenta: row.ementa_analitica,
        ementaAnalitica: row.ementa_analitica,
        ementa_analitica: row.ementa_analitica,
        readingTimeMinutes: row.tempo_estimado_min,
        tempoEstimadoMin: row.tempo_estimado_min,
        tempo_estimado_min: row.tempo_estimado_min,
        axisId: row.eixo,
        eixo: row.eixo,
        ordem: row.ordem,
        relatedCaseId: row.related_case_id,
        related_case_id: row.related_case_id,
        relatedConceptId: row.related_concept_id,
        related_concept_id: row.related_concept_id
      }));

      return reply.send(themes);
    } catch (err) {
      fastify.log.warn({ err }, '[API Disciplinas Temas] Base relacional pendente, retornando lista vazia de temas.');
      return reply.send([]);
    }
  });
}

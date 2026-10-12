import { FastifyInstance } from 'fastify';
import { pool } from '../config/db.js';

export async function registerTemasRoutes(fastify: FastifyInstance): Promise<void> {
  // GET /api/temas/:id - Retorna o tema individual completo, incluindo ementa e conteudo_markdown
  fastify.get('/api/temas/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      const res = await pool.query(
        `
        SELECT 
          id, disciplina_id, numero_tema, titulo, subtitulo,
          tempo_estimado_min, eixo, ementa_analitica, conteudo_markdown,
          ordem, related_case_id, related_concept_id
        FROM temas
        WHERE id = $1
      `,
        [id]
      );

      if (res.rows.length === 0) {
        return reply.status(404).send({ error: `Tema com id '${id}' não encontrado` });
      }

      const row = res.rows[0];

      return reply.send({
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
        conteudoMarkdown: row.conteudo_markdown,
        conteudo_markdown: row.conteudo_markdown,
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
      });
    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Erro ao buscar dados completos do tema' });
    }
  });
}

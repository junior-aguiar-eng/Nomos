import { FastifyInstance } from 'fastify';
import { pool } from '../config/db.js';

function formatCase(row: any) {
  return {
    id: row.id,
    disciplinaId: row.disciplina_id,
    caseNumber: row.codigo_processo,
    codigo_processo: row.codigo_processo,
    codigoProcesso: row.codigo_processo,
    title: row.titulo,
    titulo: row.titulo,
    difficulty: row.dificuldade,
    dificuldade: row.dificuldade,
    status: row.status,
    briefing: row.relatorio_fatos,
    relatorio_fatos: row.relatorio_fatos,
    relatorioFatos: row.relatorio_fatos,
    legalProblem: row.dilema_central,
    dilema_central: row.dilema_central,
    dilemaCentral: row.dilema_central,
    axisId: row.axis_id,
    eixo: row.axis_id,
    assignedRole: row.assigned_role,
    papelAtribuido: row.assigned_role,
    institutionalContext: row.institutional_context,
    contextoInstitucional: row.institutional_context,
    nightVisionHint: row.night_vision_hint,
    dicaVisaoNoturna: row.night_vision_hint,
    availableDecisions: row.alternativas || [],
    alternativas: row.alternativas || [],
    compatibilityRules: row.compatibility_rules || [],
    regrasCompatibilidade: row.compatibility_rules || []
  };
}

export async function registerCasosRoutes(fastify: FastifyInstance): Promise<void> {
  // GET /api/casos - Lista casos para o Laboratório de Decisões
  fastify.get('/api/casos', async (_request, reply) => {
    try {
      const res = await pool.query(`
        SELECT 
          id, disciplina_id, codigo_processo, titulo, dificuldade, status,
          relatorio_fatos, dilema_central, alternativas, axis_id,
          assigned_role, institutional_context, night_vision_hint, compatibility_rules
        FROM casos_praticos
        ORDER BY id ASC
      `);

      const cases = res.rows.map(formatCase);
      return reply.send(cases);
    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Erro ao buscar casos práticos' });
    }
  });

  // GET /api/casos/:id - Retorna os detalhes e alternativas do caso prático
  fastify.get('/api/casos/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      const res = await pool.query(
        `
        SELECT 
          id, disciplina_id, codigo_processo, titulo, dificuldade, status,
          relatorio_fatos, dilema_central, alternativas, axis_id,
          assigned_role, institutional_context, night_vision_hint, compatibility_rules
        FROM casos_praticos
        WHERE id = $1
      `,
        [id]
      );

      if (res.rows.length === 0) {
        return reply.status(404).send({ error: `Caso prático '${id}' não encontrado` });
      }

      return reply.send(formatCase(res.rows[0]));
    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Erro ao buscar caso prático' });
    }
  });
}

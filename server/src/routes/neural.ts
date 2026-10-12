import { FastifyInstance } from 'fastify';
import { pool } from '../config/db.js';
import { GraphService, INITIAL_KNOWLEDGE_NODES } from '../services/graph-service.js';

function normalizeText(text: string): string {
  return (text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function matchNodeSemantics(n: any, queryClean: string): boolean {
  if (normalizeText(n.label).includes(queryClean)) return true;
  if (normalizeText(n.id).includes(queryClean)) return true;
  if (normalizeText(n.summary).includes(queryClean)) return true;
  if (n.court_theses?.some((t: string) => normalizeText(t).includes(queryClean))) return true;
  if (n.pitfalls?.warning && normalizeText(n.pitfalls.warning).includes(queryClean)) return true;
  if (n.pitfalls?.versus_title && normalizeText(n.pitfalls.versus_title).includes(queryClean)) return true;
  if (n.criteria?.some((c: any) => normalizeText(c.text).includes(queryClean))) return true;
  return false;
}

export async function registerNeuralRoutes(fastify: FastifyInstance): Promise<void> {
  const graphService = new GraphService(pool);

  // POST /api/neural/search - Busca neural e travessia de subgrafo
  fastify.post('/api/neural/search', async (request, reply) => {
    const { query, disciplinaSlug = '' } = (request.body as {
      query?: string;
      disciplinaSlug?: string;
    }) || {};

    if (!query || query.trim() === '') {
      return reply.status(400).send({ error: 'Parâmetro query é obrigatório' });
    }

    const cleanSlug = disciplinaSlug.trim().toLowerCase();
    const altSlug = cleanSlug.startsWith('direito-') ? cleanSlug.replace(/^direito-/, '') : `direito-${cleanSlug}`;
    const cleanQuery = normalizeText(query);

    try {
      const result = await graphService.searchNeural(cleanSlug, query);
      if (!result) {
        // Se a disciplina não tiver nós ou não houver correspondência, verifica nó estático estritamente da disciplina
        const staticMatch = INITIAL_KNOWLEDGE_NODES.find(
          n => (n.disciplina_slug === cleanSlug || n.disciplina_slug === altSlug) &&
               matchNodeSemantics(n, cleanQuery)
        );

        if (staticMatch) {
          return reply.send({
            focalNode: staticMatch,
            neighbors: [],
            subgraph: {
              nodes: [{ id: staticMatch.id, label: staticMatch.label, category: staticMatch.category, theme_slug: staticMatch.theme_slug }],
              edges: []
            }
          });
        }

        return reply.send({
          focalNode: null,
          status: 'pending',
          disciplinaSlug: cleanSlug,
          message: 'Nenhum instituto encontrado para esta disciplina. O conteúdo permanece estritamente isolado ou pendente de catalogação.'
        });
      }
      return reply.send(result);
    } catch (err) {
      fastify.log.warn({ err }, 'Erro ao consultar banco, usando fallback estrito da disciplina');
      const match = INITIAL_KNOWLEDGE_NODES.find(
        n => (n.disciplina_slug === cleanSlug || n.disciplina_slug === altSlug) &&
             matchNodeSemantics(n, cleanQuery)
      );

      if (!match) {
        return reply.send({
          focalNode: null,
          status: 'pending',
          disciplinaSlug: cleanSlug,
          message: 'Disciplina pendente de conteúdo nesta matéria.'
        });
      }

      return reply.send({
        focalNode: match,
        neighbors: [],
        subgraph: {
          nodes: [{ id: match.id, label: match.label, category: match.category, theme_slug: match.theme_slug }],
          edges: []
        }
      });
    }
  });

  // GET /api/neural/graph/:disciplineSlug - Topologia completa para rendering da órbita/constelação
  fastify.get('/api/neural/graph/:disciplineSlug', async (request, reply) => {
    const { disciplineSlug } = request.params as { disciplineSlug: string };
    try {
      const topology = await graphService.getGraphTopology(disciplineSlug);
      return reply.send(topology);
    } catch (err) {
      fastify.log.warn({ err }, 'Erro ao obter topologia do banco');
      // Fallback em memória estrito
      const cleanSlug = (disciplineSlug || '').trim().toLowerCase();
      const altSlug = cleanSlug.startsWith('direito-') ? cleanSlug.replace(/^direito-/, '') : `direito-${cleanSlug}`;
      const filteredNodes = INITIAL_KNOWLEDGE_NODES.filter(
        n => disciplineSlug === 'todas' || !disciplineSlug || n.disciplina_slug === cleanSlug || n.disciplina_slug === altSlug
      );
      return reply.send({
        nodes: filteredNodes.map(n => ({ id: n.id, label: n.label, category: n.category, theme_slug: n.theme_slug, summary: n.summary })),
        edges: []
      });
    }
  });

  // GET /api/neural/nodes - Autocomplete e lista de institutos
  fastify.get('/api/neural/nodes', async (request, reply) => {
    const { disciplina } = request.query as { disciplina?: string };
    const cleanSlug = (disciplina || '').trim().toLowerCase();
    const altSlug = cleanSlug.startsWith('direito-') ? cleanSlug.replace(/^direito-/, '') : `direito-${cleanSlug}`;

    try {
      let queryStr = 'SELECT id, label, category, disciplina_slug, theme_slug, summary FROM knowledge_nodes';
      const params: any[] = [];
      if (disciplina && disciplina !== 'todas') {
        queryStr += ' WHERE disciplina_slug IN ($1, $2)';
        params.push(cleanSlug, altSlug);
      }
      queryStr += ' ORDER BY label ASC;';

      const res = await pool.query(queryStr, params);
      return reply.send(res.rows);
    } catch {
      // Fallback em memória estrito
      const nodes = INITIAL_KNOWLEDGE_NODES.filter(n => !disciplina || disciplina === 'todas' || n.disciplina_slug === cleanSlug || n.disciplina_slug === altSlug);
      return reply.send(nodes.map(n => ({
        id: n.id,
        label: n.label,
        category: n.category,
        disciplina_slug: n.disciplina_slug,
        theme_slug: n.theme_slug,
        summary: n.summary
      })));
    }
  });

  // GET /api/neural/excerpt/:themeOrNodeId - Recuperação doutrinária sob demanda (sem embutir 3.6MB em JS)
  fastify.get('/api/neural/excerpt/:identifier', async (request, reply) => {
    const { identifier } = request.params as { identifier: string };
    try {
      // Tenta achar em temas
      const res = await pool.query(
        `SELECT id, titulo, subtitulo, ementa_analitica, conteudo_markdown 
         FROM temas 
         WHERE id = $1 OR related_concept_id = $1 OR unaccent(titulo) ILIKE unaccent('%' || $1 || '%')
         LIMIT 1;`,
        [identifier]
      );
      if (res.rows.length > 0) {
        return reply.send(res.rows[0]);
      }
      return reply.status(404).send({ error: 'Trecho doutrinário não encontrado no acervo' });
    } catch (err) {
      return reply.status(500).send({ error: 'Erro ao consultar acervo doutrinário' });
    }
  });
}

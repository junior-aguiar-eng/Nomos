import { LegalConcept } from '../types/nomos';
import { LEGAL_CONCEPTS_DATA } from '../data/legal-concepts';
import { stateManager } from './state-manager';

interface NodeCoordinate {
  x: number;
  y: number;
  col: number;
  row: number;
}

export class AtlasGraphEngine {
  private containerEl: HTMLElement | null = null;
  private canvasEl: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private nodesContainerEl: HTMLElement | null = null;
  private drawerEl: HTMLElement | null = null;

  private selectedConceptId: string | null = null;
  private hoveredConceptId: string | null = null;
  private positions: Map<string, NodeCoordinate> = new Map();
  private animationFrameId: number | null = null;
  private nightVisionConceptId: string | null = null;

  constructor() {
    // Inicialização no mount()
  }

  public mount(container: HTMLElement): void {
    this.containerEl = container;

    this.containerEl.innerHTML = `
      <div class="atlas-view-container">
        <!-- BARRA DE CABEÇALHOS DAS 4 RAIAS LÓGICAS -->
        <div class="blueprint-columns-header-bar">
          <div class="blueprint-col-header">
            <span>Coluna I • Matrizes do Poder</span>
            <span style="font-size:0.65rem;color:var(--text-muted);">Origem & Princípios</span>
          </div>
          <div class="blueprint-col-header">
            <span>Coluna II • Instrumentos & Atos</span>
            <span style="font-size:0.65rem;color:var(--text-muted);">Ato, Sanção & Agentes</span>
          </div>
          <div class="blueprint-col-header">
            <span>Coluna III • Relações Externas</span>
            <span style="font-size:0.65rem;color:var(--text-muted);">Cidadão, Mercado & Bens</span>
          </div>
          <div class="blueprint-col-header">
            <span>Coluna IV • Controle & Blindagem</span>
            <span style="font-size:0.65rem;color:var(--text-muted);">Fiscalização & Reparação</span>
          </div>
        </div>

        <!-- PALCO DO BLUEPRINT -->
        <div class="blueprint-stage-viewport" id="blueprint-stage-viewport">
          <canvas id="atlas-canvas"></canvas>
          <div class="atlas-nodes-layer" id="atlas-nodes-layer"></div>

          <!-- DRAWER LATERAL DE DETALHES -->
          <div class="atlas-details-drawer" id="atlas-details-drawer">
            <div class="drawer-header">
              <div class="drawer-title-group">
                <span class="drawer-category-badge" id="drawer-category-badge">INSTITUTO</span>
                <h2 class="drawer-title" id="drawer-title">Título do Conceito</h2>
              </div>
              <button class="drawer-close-btn" id="drawer-close-btn" title="Fechar">✕</button>
            </div>
            <div class="drawer-body" id="drawer-body">
              <!-- Conteúdo dinâmico injetado -->
            </div>
          </div>
        </div>
      </div>
    `;

    this.canvasEl = document.getElementById('atlas-canvas') as HTMLCanvasElement;
    this.ctx = this.canvasEl?.getContext('2d') || null;
    this.nodesContainerEl = document.getElementById('atlas-nodes-layer');
    this.drawerEl = document.getElementById('atlas-details-drawer');

    this.setupResizeHandler();
    this.setupDrawerClose();
    this.computeOrthogonalPositions();
    this.renderNodes();
    this.startCanvasAnimation();
  }

  private setupResizeHandler(): void {
    const handleResize = () => {
      const viewport = document.getElementById('blueprint-stage-viewport');
      if (!this.canvasEl || !viewport) return;
      const rect = viewport.getBoundingClientRect();
      this.canvasEl.width = rect.width;
      this.canvasEl.height = rect.height;
      this.computeOrthogonalPositions();
      this.renderNodes();
    };

    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 60);
  }

  private setupDrawerClose(): void {
    const closeBtn = document.getElementById('drawer-close-btn');
    closeBtn?.addEventListener('click', () => {
      this.closeDrawer();
    });
  }

  /**
   * Distribuição ortogonal estrita em 4 colunas (Raias Lógicas)
   */
  private computeOrthogonalPositions(): void {
    const viewport = document.getElementById('blueprint-stage-viewport');
    if (!viewport) return;

    const width = viewport.clientWidth || 1000;
    const height = viewport.clientHeight || 650;

    const colWidth = width / 4;
    const colCenters = [
      colWidth * 0.5,
      colWidth * 1.5,
      colWidth * 2.5,
      colWidth * 3.5
    ];

    // Mapeamento lógico de qual coluna cada instituto pertence no fluxo estatal
    const columnAssignments: Record<string, number> = {
      // Coluna 1: Matrizes do Poder (Regime, Poderes)
      'c-regime-juridico': 0,
      'c-poderes-adm': 0,

      // Coluna 2: Teoria do Ato, Sanção e Agentes
      'c-elementos-ato': 1,
      'c-convalidacao': 1,
      'c-poder-policia': 1,
      'c-pad-estabilidade': 1,

      // Coluna 3: Relações Externas (Mercado, Contratos e Bens)
      'c-licitacoes-principios': 2,
      'c-licitacao-direta': 2,
      'c-contratos-equilibrio': 2,
      'c-concessoes-servicos': 2,
      'c-bens-publicos': 2,
      'c-propriedade-desapropriacao': 2,

      // Coluna 4: Fiscalização, Controle e Responsabilidade
      'c-responsabilidade-civil': 3,
      'c-autotutela': 3,
      'c-controle-tce': 3,
      'c-remedios-constitucionais': 3,
      'c-improbidade-administrativa': 3
    };

    const colItemCounts = [0, 0, 0, 0];
    const colTotals = [2, 4, 6, 5];

    LEGAL_CONCEPTS_DATA.forEach(concept => {
      const colIdx = columnAssignments[concept.id] ?? 0;
      const rowIdx = colItemCounts[colIdx]++;
      const totalInCol = colTotals[colIdx];

      // Espaçamento vertical perfeitamente calculado
      const verticalPadding = 75;
      const availableHeight = height - (verticalPadding * 2);
      const step = availableHeight / Math.max(1, totalInCol - 1);
      const y = totalInCol === 1 ? height / 2 : verticalPadding + (rowIdx * step);

      this.positions.set(concept.id, {
        x: colCenters[colIdx],
        y: y,
        col: colIdx,
        row: rowIdx
      });
    });
  }

  public highlightConceptForNightVision(conceptId: string): void {
    this.nightVisionConceptId = conceptId;
    this.renderNodes();

    setTimeout(() => {
      this.nightVisionConceptId = null;
      this.renderNodes();
    }, 6000);
  }

  private renderNodes(): void {
    if (!this.nodesContainerEl) return;
    this.nodesContainerEl.innerHTML = '';

    const bookmarkedIds = stateManager.getState().bookmarkedConceptIds;

    LEGAL_CONCEPTS_DATA.forEach(concept => {
      const pos = this.positions.get(concept.id);
      if (!pos) return;

      const nodeEl = document.createElement('div');
      const isSelected = this.selectedConceptId === concept.id;
      const isNightVision = this.nightVisionConceptId === concept.id;
      const isBookmarked = bookmarkedIds.includes(concept.id);

      nodeEl.className = `blueprint-node-card ${isSelected ? 'active-selected' : ''} ${isNightVision ? 'highlight-night-vision' : ''}`;
      nodeEl.style.left = `${pos.x}px`;
      nodeEl.style.top = `${pos.y}px`;

      nodeEl.innerHTML = `
        <div class="blueprint-card-header">
          <span class="blueprint-category-tag">${concept.category}</span>
          <button class="blueprint-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-id="${concept.id}" title="Marcar para estudo">
            ${isBookmarked ? '★' : '☆'}
          </button>
        </div>
        <div class="blueprint-node-title">${concept.title}</div>
        <div class="blueprint-node-tagline">${concept.tagline}</div>
        <div class="blueprint-card-footer">
          <span class="blueprint-connections-count">${concept.relatedConceptIds.length} correlações</span>
          ${concept.mnemonic ? `<span style="font-size:0.62rem;font-weight:700;color:var(--accent-primary);">${concept.mnemonic}</span>` : ''}
        </div>
      `;

      nodeEl.addEventListener('mouseenter', () => {
        this.hoveredConceptId = concept.id;
      });

      nodeEl.addEventListener('mouseleave', () => {
        this.hoveredConceptId = null;
      });

      nodeEl.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('blueprint-bookmark-btn')) {
          e.stopPropagation();
          stateManager.toggleBookmark(concept.id);
          this.renderNodes();
          return;
        }
        this.selectConcept(concept.id);
      });

      this.nodesContainerEl?.appendChild(nodeEl);
    });
  }

  public selectConcept(conceptId: string): void {
    this.selectedConceptId = conceptId;
    this.renderNodes();

    const concept = LEGAL_CONCEPTS_DATA.find(c => c.id === conceptId);
    if (concept) {
      this.openDrawer(concept);
    }
  }

  private openDrawer(concept: LegalConcept): void {
    if (!this.drawerEl) return;

    const catBadge = document.getElementById('drawer-category-badge');
    const titleEl = document.getElementById('drawer-title');
    const bodyEl = document.getElementById('drawer-body');

    if (catBadge) catBadge.textContent = concept.category.toUpperCase();
    if (titleEl) titleEl.textContent = concept.title;

    if (bodyEl) {
      let distinctionsHtml = '';
      if (concept.practicalDistinctions.length > 0) {
        distinctionsHtml = `
          <div class="drawer-section">
            <h4 class="drawer-section-title">Distinção Dogmática</h4>
            ${concept.practicalDistinctions.map(d => `
              <div style="background:var(--bg-secondary);padding:0.65rem 0.85rem;border-radius:var(--radius-xs);margin-bottom:0.35rem;border-left:2px solid var(--accent-primary);">
                <strong style="color:var(--text-primary);font-size:0.82rem;">${d.versusTitle}</strong>
                <p style="font-size:0.8rem;color:var(--text-secondary);margin-top:0.2rem;">${d.difference}</p>
              </div>
            `).join('')}
          </div>
        `;
      }

      let supremeCourtHtml = '';
      if (concept.supremeCourtTheses.length > 0) {
        supremeCourtHtml = `
          <div class="drawer-section">
            <h4 class="drawer-section-title">Enunciados e Teses dos Tribunais</h4>
            ${concept.supremeCourtTheses.map(t => `
              <div class="drawer-theses-card">${t}</div>
            `).join('')}
          </div>
        `;
      }

      bodyEl.innerHTML = `
        <div class="drawer-section">
          <h4 class="drawer-section-title">Mecânica do Instituto</h4>
          <p class="drawer-mechanics-text">${concept.mechanics}</p>
        </div>

        <div class="drawer-section">
          <h4 class="drawer-section-title">Requisitos Constitutivos de Validade</h4>
          <ul class="drawer-checklist">
            ${concept.keyElements.map(elem => `<li>${elem}</li>`).join('')}
          </ul>
        </div>

        <div class="drawer-section">
          <h4 class="drawer-section-title">Vícios e Nulidades Insanáveis</h4>
          <div class="drawer-warning-box">
            <ul class="drawer-warning-list">
              ${concept.fatalFlaws.map(flaw => `<li>${flaw}</li>`).join('')}
            </ul>
          </div>
        </div>

        ${distinctionsHtml}
        ${supremeCourtHtml}
      `;
    }

    this.drawerEl.classList.add('open');
  }

  public closeDrawer(): void {
    this.drawerEl?.classList.remove('open');
    this.selectedConceptId = null;
    this.renderNodes();
  }

  private startCanvasAnimation(): void {
    let tick = 0;

    const render = () => {
      if (this.ctx && this.canvasEl) {
        this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        this.drawOrthogonalGrid(this.ctx, this.canvasEl.width, this.canvasEl.height);
        this.drawOrthogonalConnections(this.ctx, tick);
      }
      tick += 0.025;
      this.animationFrameId = requestAnimationFrame(render);
    };

    render();
  }

  private drawOrthogonalGrid(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    const colWidth = width / 4;
    ctx.strokeStyle = stateManager.getState().theme === 'crystal-light'
      ? 'rgba(229, 231, 235, 0.6)'
      : 'rgba(36, 47, 71, 0.4)';
    ctx.lineWidth = 1;

    // Linhas verticais delimitadoras de raia
    for (let c = 1; c < 4; c++) {
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(colWidth * c, 0);
      ctx.lineTo(colWidth * c, height);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  /**
   * Conexões em linhas ortogonais limpas (Manhattan / ângulos retos)
   */
  private drawOrthogonalConnections(ctx: CanvasRenderingContext2D, tick: number): void {
    const isDark = stateManager.getState().theme === 'deep-cyber-dark';
    const activeTarget = this.hoveredConceptId || this.selectedConceptId;

    LEGAL_CONCEPTS_DATA.forEach(concept => {
      const p1 = this.positions.get(concept.id);
      if (!p1) return;

      concept.relatedConceptIds.forEach(targetId => {
        const p2 = this.positions.get(targetId);
        if (!p2) return;

        const isHighlighted = activeTarget && (activeTarget === concept.id || activeTarget === targetId);

        // Cores institucionais sóbrias
        let strokeColor = isDark ? 'rgba(79, 99, 147, 0.25)' : 'rgba(203, 213, 225, 0.45)';
        let lineWidth = 1;

        if (isHighlighted) {
          strokeColor = isDark ? 'rgba(59, 130, 246, 0.85)' : 'rgba(30, 58, 138, 0.75)';
          lineWidth = 2;
        }

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;

        // Roteamento ortogonal Manhattan: p1.x -> midX -> p2.y -> p2.x
        const midX = (p1.x + p2.x) / 2;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(midX, p1.y);
        ctx.lineTo(midX, p2.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Se destacado, pulso discreto percorrendo o circuito
        if (isHighlighted) {
          const t = (Math.sin(tick * 1.5) + 1) / 2;
          let dotX: number, dotY: number;

          if (t < 0.33) {
            const subT = t / 0.33;
            dotX = p1.x + (midX - p1.x) * subT;
            dotY = p1.y;
          } else if (t < 0.66) {
            const subT = (t - 0.33) / 0.33;
            dotX = midX;
            dotY = p1.y + (p2.y - p1.y) * subT;
          } else {
            const subT = (t - 0.66) / 0.34;
            dotX = midX + (p2.x - midX) * subT;
            dotY = p2.y;
          }

          ctx.fillStyle = isDark ? '#38bdf8' : '#1e3a8a';
          ctx.beginPath();
          ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    });
  }

  public destroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

export const atlasGraphEngine = new AtlasGraphEngine();

import { stateManager } from './state-manager';
import { PRACTICAL_AXES } from '../data/axes';
import { PRACTICE_CASES_DATA } from '../data/practice-cases';

export class DossierEngine {
  private containerEl: HTMLElement | null = null;
  private unsubscribe: (() => void) | null = null;

  constructor() {
    // Inicialização no mount()
  }

  public mount(container: HTMLElement): void {
    this.containerEl = container;
    this.unsubscribe = stateManager.subscribe(() => {
      this.render();
    });
    this.render();
  }

  private render(): void {
    if (!this.containerEl) return;

    const state = stateManager.getState();
    const nextRankInfo = stateManager.getNextRankThreshold();
    const rankIcons: Record<string, string> = {
      'Estagiário de Direito': '🎓',
      'Assessor Jurídico': '💼',
      'Procurador do Estado': '🏛️',
      'Conselheiro / Magistrado': '⚖️'
    };

    const currentIcon = rankIcons[state.currentRank] || '⚖️';
    const xpProgressPct = Math.min(100, Math.round((state.totalXp / nextRankInfo.targetXp) * 100));

    this.containerEl.innerHTML = `
      <div class="dossier-view-container">
        <!-- HERO DA CARREIRA PÚBLICA -->
        <div class="dossier-hero-card">
          <div class="hero-rank-info">
            <div class="hero-rank-badge">${currentIcon}</div>
            <div class="hero-rank-text">
              <h1 class="hero-rank-title">${state.currentRank}</h1>
              <span class="hero-rank-subtitle">Carreira Jurídica Simulada no NOMOS • Universo Administrativo</span>
            </div>
          </div>

          <div class="hero-xp-meter">
            <div class="xp-numbers-row">
              <span class="xp-current">${state.totalXp} XP</span>
              <span class="xp-next">Próximo: ${nextRankInfo.nextRank} (${nextRankInfo.targetXp} XP)</span>
            </div>
            <div class="xp-progress-bar">
              <div class="xp-progress-fill" style="width: ${xpProgressPct}%"></div>
            </div>
          </div>
        </div>

        <!-- GRID DE PRECISÃO POR EIXO -->
        <div class="axis-mastery-grid">
          ${PRACTICAL_AXES.map(axis => {
            const stats = state.axisScores[axis.id];
            return `
              <div class="axis-mastery-card">
                <div class="axis-mastery-header">
                  <span class="axis-mastery-name">${axis.icon} Eixo ${axis.number}</span>
                  <span class="axis-mastery-pct">${stats.accuracyPercentage}%</span>
                </div>
                <div class="axis-mastery-desc">${axis.title}</div>
                <div class="axis-mastery-bar">
                  <div class="axis-mastery-fill" style="width: ${stats.accuracyPercentage}%; background: ${axis.color};"></div>
                </div>
                <div class="axis-mastery-footer">
                  ${stats.resolvedCount} de ${stats.totalCount} casos resolvidos
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- CADERNO DE DOUTRINA E ERROS -->
        <div class="dossier-notebook-section">
          <div class="notebook-section-header">
            <h2 class="notebook-section-title">📖 Caderno de Doutrina e Erros</h2>
            <div class="notebook-export-actions">
              <button class="export-btn primary" id="export-md-btn">
                📥 Exportar em Markdown (.md)
              </button>
              <button class="export-btn" id="print-pdf-btn">
                🖨️ Imprimir / Gerar PDF
              </button>
            </div>
          </div>

          <div class="notebook-records-list">
            ${
              state.resolutions.length === 0
                ? `
              <div style="padding: 2.5rem; text-align: center; color: var(--text-muted); background: var(--surface-glass-card); border-radius: var(--radius-md); border: 1px dashed var(--border-glass);">
                Nenhum caso prático julgado ainda. Acesse o <strong>Simulador</strong> para tomar suas primeiras decisões e construir seu dossiê!
              </div>
            `
                : state.resolutions
                    .map(r => {
                      const c = PRACTICE_CASES_DATA.find(cs => cs.id === r.caseId);
                      return `
                <div class="notebook-record-card ${r.success ? 'success' : 'failure'}">
                  <div class="record-header">
                    <span class="record-case-title">[${c?.caseNumber || r.caseId}] ${c?.title || 'Caso'}</span>
                    <span class="record-date">${new Date(r.timestamp).toLocaleDateString('pt-BR')} • +${r.xpEarned} XP</span>
                  </div>
                  <div class="record-verdict">${r.verdictTitle}</div>
                  <p class="record-feedback">${r.technicalFeedback}</p>
                </div>
              `;
                    })
                    .join('')
            }
          </div>
        </div>
      </div>
    `;

    this.setupListeners();
  }

  private setupListeners(): void {
    const exportMdBtn = document.getElementById('export-md-btn');
    exportMdBtn?.addEventListener('click', () => {
      this.downloadMarkdown();
    });

    const printPdfBtn = document.getElementById('print-pdf-btn');
    printPdfBtn?.addEventListener('click', () => {
      window.print();
    });
  }

  private downloadMarkdown(): void {
    const content = stateManager.generateMarkdownDossier();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NOMOS_Dossie_Caderno_Erros_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  public destroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

export const dossierEngine = new DossierEngine();

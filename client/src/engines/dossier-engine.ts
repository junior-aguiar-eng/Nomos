import { stateManager } from './state-manager';
import { PRACTICAL_AXES } from '../data/axes';
import {
  renderIcon,
  getRankIcon,
  getAxisIcon,
  BookOpen,
  Download,
  Printer,
  CheckCircle2,
  AlertTriangle
} from '../utils/icons';

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
    const xpProgressPct = Math.min(100, Math.round((state.totalXp / nextRankInfo.targetXp) * 100));

    this.containerEl.innerHTML = `
      <div class="dossier-view-container max-w-5xl mx-auto py-8 px-6 flex flex-col gap-8 w-full h-full overflow-y-auto">
        <!-- HERO DA CARREIRA PÚBLICA -->
        <div class="dossier-hero-card bg-white rounded-xl border border-slate-200/80 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
          <div class="hero-rank-info flex items-center gap-4">
            <div class="hero-rank-badge w-12 h-12 rounded-lg bg-blue-900 text-white flex items-center justify-center shadow-xs">
              ${getRankIcon(state.currentRank, 'w-6 h-6 text-white')}
            </div>
            <div class="hero-rank-text flex flex-col">
              <h1 class="hero-rank-title font-sans font-bold text-xl text-slate-900 leading-tight">${state.currentRank}</h1>
              <span class="hero-rank-subtitle text-xs text-slate-500">Carreira Jurídica Simulada no NOMOS • Universo Administrativo</span>
            </div>
          </div>

          <div class="hero-xp-meter flex flex-col gap-1.5 min-w-[240px] w-full sm:w-auto">
            <div class="xp-numbers-row flex justify-between text-xs font-mono">
              <span class="xp-current font-bold text-blue-900">${state.totalXp} XP</span>
              <span class="xp-next text-slate-500">Próximo: ${nextRankInfo.nextRank} (${nextRankInfo.targetXp} XP)</span>
            </div>
            <div class="xp-progress-bar h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div class="xp-progress-fill h-full bg-blue-900 rounded-full transition-all duration-300" style="width: ${xpProgressPct}%"></div>
            </div>
          </div>
        </div>

        <!-- GRID DE PRECISÃO POR EIXO -->
        <div>
          <div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Eixos de Formação Prática</div>
          <div class="axis-mastery-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            ${PRACTICAL_AXES.map(axis => {
              const stats = state.axisScores[axis.id];
              return `
                <div class="axis-mastery-card bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="p-2 bg-slate-100 rounded-lg text-slate-700">
                        ${getAxisIcon(axis.id, 'w-5 h-5 text-slate-700')}
                      </div>
                      <div>
                        <div class="font-semibold text-sm text-slate-900">Eixo ${axis.number}: ${axis.title}</div>
                        <div class="text-xs text-slate-500 line-clamp-1">${axis.subtitle}</div>
                      </div>
                    </div>
                    <span class="text-sm font-bold text-slate-700 font-mono">${stats.accuracyPercentage}%</span>
                  </div>

                  <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden my-3">
                    <div class="h-full bg-blue-900 rounded-full transition-all duration-300" style="width: ${stats.accuracyPercentage}%;"></div>
                  </div>

                  <div class="text-xs text-slate-500 flex items-center justify-between">
                    <span>${stats.resolvedCount} de ${stats.totalCount} casos resolvidos</span>
                    <span class="text-slate-400 font-mono">${stats.accuracyPercentage > 0 ? (stats.accuracyPercentage >= 70 ? 'Consistente' : 'Revisão') : 'Não iniciado'}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- CADERNO DE DOUTRINA E ERROS -->
        <div class="dossier-notebook-section flex flex-col gap-4">
          <div class="notebook-section-header flex items-center justify-between border-b border-slate-200/80 pb-3">
            <h2 class="notebook-section-title font-sans font-bold text-base text-slate-900 flex items-center gap-2">
              ${renderIcon(BookOpen, { className: 'w-5 h-5 text-blue-900' })}
              <span>Caderno de Doutrina e Erros</span>
            </h2>
            <div class="notebook-export-actions flex items-center gap-2">
              <button class="export-btn primary px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-900 text-white hover:bg-blue-950 flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer" id="export-md-btn">
                ${renderIcon(Download, { className: 'w-3.5 h-3.5 text-white' })}
                <span>Exportar Markdown (.md)</span>
              </button>
              <button class="export-btn px-3.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer" id="print-pdf-btn">
                ${renderIcon(Printer, { className: 'w-3.5 h-3.5 text-slate-600' })}
                <span>Imprimir / PDF</span>
              </button>
            </div>
          </div>

          <div class="notebook-records-list flex flex-col gap-3">
            ${
              state.resolutions.length === 0
                ? `
              <div class="p-8 text-center text-slate-400 bg-white rounded-xl border border-slate-200/80 text-sm">
                Nenhum caso prático julgado ainda. Acesse o <strong>Laboratório</strong> para deliberar e construir seu histórico analítico.
              </div>
            `
                : state.resolutions
                    .map(r => {
                      const cases = stateManager.getCases();
                      const c = cases.find(cs => cs.id === r.caseId);
                      return `
                <div class="notebook-record-card bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col gap-2 ${r.success ? 'border-l-4 border-l-emerald-600' : 'border-l-4 border-l-rose-600'}">
                  <div class="record-header flex items-center justify-between">
                    <span class="record-case-title font-sans text-xs font-bold tracking-wide uppercase text-slate-700">[${c?.caseNumber || r.caseId}] ${c?.title || 'Caso'}</span>
                    <span class="record-date font-mono text-[11px] text-slate-400">${new Date(r.timestamp).toLocaleDateString('pt-BR')} • +${r.xpEarned} XP</span>
                  </div>
                  <div class="record-verdict text-sm font-semibold flex items-center gap-1.5 ${r.success ? 'text-emerald-700' : 'text-rose-700'}">
                    ${r.success ? renderIcon(CheckCircle2, { className: 'w-4 h-4 text-emerald-600' }) : renderIcon(AlertTriangle, { className: 'w-4 h-4 text-rose-600' })}
                    <span>${r.verdictTitle}</span>
                  </div>
                  <p class="record-feedback text-xs text-slate-600 leading-relaxed">${r.technicalFeedback}</p>
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

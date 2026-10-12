import { PracticalCase, PracticalDecisionOption } from '../types/nomos';
import { PRACTICE_CASES_DATA } from '../data/practice-cases';
import { LEGAL_CONCEPTS_DATA } from '../data/legal-concepts';
import { stateManager } from './state-manager';
import { minervaPet } from './minerva-pet';
import { fetchCasos } from '../utils/api';
import {
  renderIcon,
  ClipboardList,
  Landmark,
  Scale,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Check
} from '../utils/icons';

export class SimulatorEngine {
  private containerEl: HTMLElement | null = null;
  private cases: PracticalCase[] = PRACTICE_CASES_DATA;
  private activeCaseIndex: number = 0;
  private selectedDecisionId: string | null = null;
  private selectedConceptIds: string[] = [];
  private onSwitchToAtlasCallback: ((conceptId: string) => void) | null = null;

  constructor() {
    // Inicialização no mount()
  }

  public mount(container: HTMLElement, onSwitchToAtlas?: (conceptId: string) => void): void {
    this.containerEl = container;
    this.onSwitchToAtlasCallback = onSwitchToAtlas || null;
    this.render();
    this.loadCases();
  }

  public async loadCases(): Promise<void> {
    try {
      const data = await fetchCasos();
      if (Array.isArray(data) && data.length > 0) {
        this.cases = data;
        stateManager.setCases(data);
        this.render();
      }
    } catch (err) {
      console.warn('[SimulatorEngine] Operando com base inicial enquanto API inicializa:', err);
    }
  }

  public getActiveCase(): PracticalCase {
    return this.cases[this.activeCaseIndex] || this.cases[0];
  }

  public setActiveCaseById(caseId: string): void {
    const idx = this.cases.findIndex(c => c.id === caseId);
    if (idx >= 0) {
      this.activeCaseIndex = idx;
      this.selectedDecisionId = null;
      this.selectedConceptIds = [];
      this.render();

      // Minerva scaneia o novo caso
      const activeCase = this.getActiveCase();
      minervaPet.setEmotion(
        'scanning',
        `Analisando ${activeCase.caseNumber}: você assume a função de ${activeCase.assignedRole}.`,
        'Examine os fatos e conecte a decisão aos fundamentos do Atlas.',
        6000
      );
    }
  }

  public triggerActiveCaseNightVision(): void {
    const activeCase = this.getActiveCase();
    const primaryRule = activeCase.compatibilityRules.find(r => r.outcome.success);
    const targetConceptId = primaryRule?.validConceptIds[0];

    minervaPet.setEmotion(
      'night_vision',
      `Visão Noturna: ${activeCase.nightVisionHint}`,
      'Nós destacados no Atlas Conceitual para fundamentar sua decisão.',
      9000
    );

    if (targetConceptId && this.onSwitchToAtlasCallback) {
      this.onSwitchToAtlasCallback(targetConceptId);
    }
  }

  private render(): void {
    if (!this.containerEl) return;

    const activeCase = this.getActiveCase();
    const state = stateManager.getState();
    const existingResolution = state.resolutions.find(r => r.caseId === activeCase.id);

    // Conceitos do mesmo eixo do caso para chips de fundamentação
    const availableConcepts = LEGAL_CONCEPTS_DATA.filter(c => c.axisId === activeCase.axisId);

    this.containerEl.innerHTML = `
      <div class="simulator-view-container w-full h-full flex bg-slate-50 overflow-hidden">
        <!-- SIDEBAR DE PROCESSOS E CASOS (MASTER-DETAIL CONTÍNUA) -->
        <aside class="simulator-sidebar w-80 min-w-80 h-full bg-slate-50/50 border-r border-slate-200/80 flex flex-col">
          <div class="simulator-sidebar-header h-14 px-4 border-b border-slate-200/80 bg-white flex items-center justify-between">
            <h3 class="simulator-sidebar-title font-sans font-bold text-sm text-slate-800 flex items-center gap-2">
              ${renderIcon(ClipboardList, { className: 'w-4 h-4 text-blue-900' })}
              <span>Processos do Eixo</span>
            </h3>
            <span class="text-xs font-mono text-slate-400">${this.cases.length} casos</span>
          </div>
          <div class="simulator-cases-list flex-1 overflow-y-auto">
            ${this.cases
              .map((c, idx) => {
                const res = state.resolutions.find(r => r.caseId === c.id);
                let statusClass = '';
                if (res) statusClass = res.success ? 'resolved-success' : 'resolved-failure';
                const isActive = idx === this.activeCaseIndex;

                return `
                <div class="case-sidebar-item group relative p-3.5 border-b border-slate-100 transition-colors cursor-pointer hover:bg-slate-100/70 ${isActive ? 'active bg-white border-l-3 border-l-blue-900 shadow-xs' : ''} ${statusClass}" data-case-id="${c.id}">
                  <div class="case-item-meta flex items-center justify-between text-xs">
                    <span class="case-item-number font-mono text-[11px] font-semibold text-slate-500 uppercase tracking-wide">${c.caseNumber}</span>
                    <span class="case-item-difficulty px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">${c.difficulty}</span>
                  </div>
                  <div class="case-item-title font-sans text-xs font-medium text-slate-900 mt-1 line-clamp-2 ${isActive ? 'font-semibold text-blue-900' : ''}">${c.title}</div>
                  <div class="case-status-row text-xs flex items-center gap-1.5 mt-1.5 font-medium ${res ? (res.success ? 'text-emerald-700' : 'text-rose-700') : 'text-slate-400'}">
                    ${
                      res
                        ? res.success
                          ? `${renderIcon(CheckCircle2, { className: 'w-3 h-3 text-emerald-600' })} <span>Acerto Técnico</span>`
                          : `${renderIcon(AlertTriangle, { className: 'w-3 h-3 text-rose-600' })} <span>Tropeço Registrado</span>`
                        : `${renderIcon(HelpCircle, { className: 'w-3 h-3 text-slate-400' })} <span>Pendente</span>`
                    }
                  </div>
                </div>
              `;
              })
              .join('')}
          </div>
        </aside>

        <!-- ÁREA CENTRAL DE DECISÃO -->
        <main class="simulator-workspace flex-1 h-full overflow-y-auto py-8 px-10 flex flex-col gap-6 max-w-4xl mx-auto">
          <!-- CABEÇALHO DO PROCESSO -->
          <div class="case-dossier-header bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col gap-2">
            <div class="case-role-bar flex items-center gap-2">
              <span class="case-role-badge inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-100">
                ${renderIcon(Landmark, { className: 'w-3.5 h-3.5 text-blue-900' })}
                <span>${activeCase.assignedRole}</span>
              </span>
              <span class="case-context-tag text-xs text-slate-500">• ${activeCase.institutionalContext}</span>
            </div>
            <div class="case-identifier text-xs font-semibold tracking-wide uppercase text-slate-500 font-mono">[${activeCase.caseNumber}]</div>
            <h1 class="case-dossier-title font-sans font-bold text-lg text-slate-900 leading-snug">${activeCase.title}</h1>
          </div>

          <!-- RELATÓRIO FÁTICO -->
          <div class="case-briefing-card bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col gap-3">
            <span class="briefing-label text-xs font-bold uppercase tracking-wider text-slate-400">Relatório Circunstanciado dos Fatos</span>
            <p class="briefing-text text-sm text-slate-700 leading-relaxed">${activeCase.briefing}</p>

            <div class="legal-problem-box bg-slate-50 border-l-3 border-l-blue-900 p-3.5 rounded-r-lg flex flex-col gap-1 mt-1">
              <span class="legal-problem-title text-xs font-bold uppercase tracking-wider text-blue-900">Dilema Jurídico Central</span>
              <p class="legal-problem-desc text-xs font-semibold text-slate-800 leading-relaxed">${activeCase.legalProblem}</p>
            </div>
          </div>

          <!-- FASE 1: ESCOLHA DA DECISÃO ADMINISTRATIVA -->
          <div class="decision-stage-section flex flex-col gap-3">
            <h3 class="stage-title font-sans font-bold text-xs uppercase tracking-wider text-slate-700">1. Escolha a Conduta ou Decisão Administrativa</h3>
            <div class="decision-options-grid flex flex-col gap-2.5">
              ${activeCase.availableDecisions
                .map((opt: PracticalDecisionOption) => {
                  const isSelected = this.selectedDecisionId === opt.id;
                  return `
                  <div class="decision-card-option bg-white rounded-xl border p-4 shadow-xs hover:border-slate-300 transition-all cursor-pointer flex items-start gap-3.5 ${isSelected ? 'selected border-blue-900 bg-blue-50/40 ring-1 ring-blue-900/30' : 'border-slate-200/80'}" data-decision-id="${opt.id}">
                    <div class="decision-radio-indicator w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 shrink-0 ${isSelected ? 'border-blue-900 bg-blue-900 text-white' : 'border-slate-300'}">
                      ${isSelected ? renderIcon(Check, { className: 'w-2.5 h-2.5 text-white', strokeWidth: 3 }) : ''}
                    </div>
                    <div class="decision-text-content flex flex-col gap-0.5">
                      <div class="decision-option-label text-sm font-semibold text-slate-900">${opt.label}</div>
                      <div class="decision-option-summary text-xs text-slate-500 leading-relaxed">${opt.actionSummary}</div>
                    </div>
                  </div>
                `;
                })
                .join('')}
            </div>
          </div>

          <!-- FASE 2: VINCULAÇÃO DE NÓS DE FUNDAMENTAÇÃO DO ATLAS -->
          <div class="grounding-stage-section flex flex-col gap-2.5">
            <h3 class="stage-title font-sans font-bold text-xs uppercase tracking-wider text-slate-700">2. Vincule os Institutos Doutrinários de Sustentação (Atlas)</h3>
            <p class="text-xs text-slate-500">
              Selecione de 1 a 3 nós conceituais para fundamentar sua decisão técnica:
            </p>
            <div class="grounding-chips-grid flex flex-wrap gap-2">
              ${availableConcepts
                .map(concept => {
                  const isSelected = this.selectedConceptIds.includes(concept.id);
                  return `
                  <button class="grounding-concept-chip px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${isSelected ? 'selected bg-blue-900 text-white border-blue-900 shadow-xs' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'}" data-concept-id="${concept.id}">
                    <span class="chip-icon flex items-center">${isSelected ? renderIcon(Check, { className: 'w-3 h-3 text-white' }) : '+'}</span>
                    <span>${concept.title}</span>
                  </button>
                `;
                })
                .join('')}
            </div>
          </div>

          <!-- BOTÃO DE AÇÃO -->
          <div class="simulator-actions-row flex justify-end mt-2">
            <button class="submit-verdict-btn px-6 py-2.5 rounded-lg text-sm font-semibold bg-blue-900 text-white hover:bg-blue-950 flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all" id="submit-verdict-btn" ${!this.selectedDecisionId || this.selectedConceptIds.length === 0 ? 'disabled' : ''}>
              ${renderIcon(Scale, { className: 'w-4 h-4 text-white' })}
              <span>Emitir Decisão & Parecer Técnico</span>
            </button>
          </div>

          <!-- RESULTADO / VEREDITO (CASO JÁ RESOLVIDO OU SUBMETIDO) -->
          <div id="verdict-container">
            ${existingResolution ? this.renderExistingVerdict(existingResolution) : ''}
          </div>
        </main>
      </div>
    `;

    this.setupListeners();
  }

  private renderExistingVerdict(res: {
    success: boolean;
    verdictTitle: string;
    technicalFeedback: string;
    xpEarned: number;
  }): string {
    return `
      <div class="verdict-result-card bg-white rounded-xl border p-5 shadow-xs flex flex-col gap-2.5 ${res.success ? 'border-emerald-500/80 border-l-4 border-l-emerald-600' : 'border-rose-500/80 border-l-4 border-l-rose-600'}">
        <div class="verdict-header flex items-center justify-between">
          <h2 class="verdict-status-title text-base font-bold flex items-center gap-2 ${res.success ? 'text-emerald-700' : 'text-rose-700'}">
            ${res.success ? renderIcon(CheckCircle2, { className: 'w-5 h-5 text-emerald-600' }) : renderIcon(AlertTriangle, { className: 'w-5 h-5 text-rose-600' })}
            <span>${res.verdictTitle}</span>
          </h2>
          <span class="verdict-xp-badge font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-blue-900">+${res.xpEarned} XP</span>
        </div>
        <p class="verdict-feedback-text text-xs text-slate-600 leading-relaxed">${res.technicalFeedback}</p>
      </div>
    `;
  }

  private setupListeners(): void {
    if (!this.containerEl) return;

    // Clique nos itens da sidebar
    this.containerEl.querySelectorAll<HTMLElement>('.case-sidebar-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.caseId;
        if (id) this.setActiveCaseById(id);
      });
    });

    // Clique nas opções de decisão (Fase 1)
    this.containerEl.querySelectorAll<HTMLElement>('.decision-card-option').forEach(el => {
      el.addEventListener('click', () => {
        this.selectedDecisionId = el.dataset.decisionId || null;
        this.containerEl
          ?.querySelectorAll('.decision-card-option')
          .forEach(c =>
            c.classList.remove(
              'selected',
              'border-blue-900',
              'bg-blue-50/40',
              'ring-1',
              'ring-blue-900/30'
            )
          );
        el.classList.add(
          'selected',
          'border-blue-900',
          'bg-blue-50/40',
          'ring-1',
          'ring-blue-900/30'
        );
        this.updateSubmitButtonState();
      });
    });

    // Clique nos chips de fundamentação (Fase 2)
    this.containerEl.querySelectorAll<HTMLElement>('.grounding-concept-chip').forEach(el => {
      el.addEventListener('click', () => {
        const conceptId = el.dataset.conceptId;
        if (!conceptId) return;

        const iconSpan = el.querySelector('.chip-icon');
        if (this.selectedConceptIds.includes(conceptId)) {
          this.selectedConceptIds = this.selectedConceptIds.filter(id => id !== conceptId);
          el.classList.remove(
            'selected',
            'bg-blue-900',
            'text-white',
            'border-blue-900',
            'shadow-xs'
          );
          el.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
          if (iconSpan) iconSpan.textContent = '+';
        } else {
          if (this.selectedConceptIds.length < 3) {
            this.selectedConceptIds.push(conceptId);
            el.classList.add(
              'selected',
              'bg-blue-900',
              'text-white',
              'border-blue-900',
              'shadow-xs'
            );
            el.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
            if (iconSpan) {
              iconSpan.innerHTML = renderIcon(Check, { className: 'w-3 h-3 text-white' });
            }
          }
        }
        this.updateSubmitButtonState();
      });
    });

    // Submissão
    const submitBtn = document.getElementById('submit-verdict-btn');
    submitBtn?.addEventListener('click', () => {
      this.evaluateDecision();
    });
  }

  private updateSubmitButtonState(): void {
    const btn = document.getElementById('submit-verdict-btn') as HTMLButtonElement | null;
    if (btn) {
      btn.disabled = !this.selectedDecisionId || this.selectedConceptIds.length === 0;
    }
  }

  private evaluateDecision(): void {
    if (!this.selectedDecisionId) return;

    const activeCase = this.getActiveCase();
    const rule = activeCase.compatibilityRules.find(r => r.decisionId === this.selectedDecisionId);

    if (!rule) return;

    // Avalia acerto da fundamentação
    const hasRequiredConcept = rule.validConceptIds.some(id =>
      this.selectedConceptIds.includes(id)
    );
    const hasFatalFlaw = rule.fatalFlawConceptIds.some(id => this.selectedConceptIds.includes(id));

    const finalSuccess = rule.outcome.success && hasRequiredConcept && !hasFatalFlaw;
    const finalXp = finalSuccess
      ? rule.outcome.xpEarned
      : Math.max(15, Math.floor(rule.outcome.xpEarned * 0.3));

    // Grava no StateManager
    stateManager.recordCaseResolution({
      caseId: activeCase.id,
      axisId: activeCase.axisId,
      timestamp: Date.now(),
      chosenDecisionId: this.selectedDecisionId,
      linkedConceptIds: [...this.selectedConceptIds],
      success: finalSuccess,
      verdictTitle: rule.outcome.verdictTitle,
      technicalFeedback: rule.outcome.technicalFeedback,
      xpEarned: finalXp
    });

    // Dispara emoção da Minerva
    if (finalSuccess) {
      minervaPet.setEmotion(
        'triumph',
        `Vitória técnica! Veredito acolhido com rigor impecável. Você conquistou +${finalXp} XP.`,
        'Decisão e fundamentação em perfeita harmonia com o Direito Administrativo.',
        8000
      );
    } else {
      minervaPet.setEmotion(
        'nullity_alarm',
        `Alerta de Nulidade: ${rule.outcome.verdictTitle}. Analise o feedback técnico para não repetir o erro.`,
        'Tropeço registrado no seu Dossiê de Erros para revisão ativa.',
        9000
      );
    }

    // Re-renderiza o veredito na tela
    const verdictContainer = document.getElementById('verdict-container');
    if (verdictContainer) {
      verdictContainer.innerHTML = `
        <div class="verdict-result-card bg-white rounded-xl border p-5 shadow-xs flex flex-col gap-2.5 ${finalSuccess ? 'border-emerald-500/80 border-l-4 border-l-emerald-600' : 'border-rose-500/80 border-l-4 border-l-rose-600'}">
          <div class="verdict-header flex items-center justify-between">
            <h2 class="verdict-status-title text-base font-bold flex items-center gap-2 ${finalSuccess ? 'text-emerald-700' : 'text-rose-700'}">
              ${finalSuccess ? renderIcon(CheckCircle2, { className: 'w-5 h-5 text-emerald-600' }) : renderIcon(AlertTriangle, { className: 'w-5 h-5 text-rose-600' })}
              <span>${rule.outcome.verdictTitle}</span>
            </h2>
            <span class="verdict-xp-badge font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-blue-900">+${finalXp} XP</span>
          </div>
          <p class="verdict-feedback-text text-xs text-slate-600 leading-relaxed">${rule.outcome.technicalFeedback}</p>
          <div class="verdict-grounding-box bg-slate-50 border-l-2 border-l-blue-900 p-3 rounded-r text-xs font-mono text-slate-700">
            <strong>Fundamento Legal / Súmula:</strong> ${rule.outcome.legalGrounding}
          </div>
        </div>
      `;
      verdictContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // Atualiza a sidebar
    this.render();
  }
}

export const simulatorEngine = new SimulatorEngine();

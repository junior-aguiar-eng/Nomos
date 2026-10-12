import { PracticalCase, PracticalDecisionOption } from '../types/nomos';
import { PRACTICE_CASES_DATA } from '../data/practice-cases';
import { LEGAL_CONCEPTS_DATA } from '../data/legal-concepts';
import { stateManager } from './state-manager';
import { minervaPet } from './minerva-pet';

export class SimulatorEngine {
  private containerEl: HTMLElement | null = null;
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
  }

  public getActiveCase(): PracticalCase {
    return PRACTICE_CASES_DATA[this.activeCaseIndex] || PRACTICE_CASES_DATA[0];
  }

  public setActiveCaseById(caseId: string): void {
    const idx = PRACTICE_CASES_DATA.findIndex(c => c.id === caseId);
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
      `👁️ Visão Noturna: ${activeCase.nightVisionHint}`,
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
      <div class="simulator-view-container">
        <!-- SIDEBAR DE PROCESSOS E CASOS -->
        <aside class="simulator-sidebar">
          <div class="simulator-sidebar-header">
            <h3 class="simulator-sidebar-title">📋 Processos do Eixo</h3>
          </div>
          <div class="simulator-cases-list">
            ${PRACTICE_CASES_DATA.map((c, idx) => {
              const res = state.resolutions.find(r => r.caseId === c.id);
              let statusClass = '';
              if (res) statusClass = res.success ? 'resolved-success' : 'resolved-failure';
              const isActive = idx === this.activeCaseIndex;

              return `
                <div class="case-sidebar-item ${isActive ? 'active' : ''} ${statusClass}" data-case-id="${c.id}">
                  <div class="case-item-meta">
                    <span class="case-item-number">${c.caseNumber}</span>
                    <span class="case-item-difficulty">${c.difficulty}</span>
                  </div>
                  <div class="case-item-title">${c.title}</div>
                  <div style="font-size:0.72rem;color:var(--accent-primary);margin-top:2px;">
                    ${res ? (res.success ? '✔ Acerto Técnico' : '✖ Tropeço Registrado') : '• Pendente de Julgamento'}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </aside>

        <!-- ÁREA CENTRAL DE DECISÃO -->
        <main class="simulator-workspace">
          <!-- CABEÇALHO DO PROCESSO -->
          <div class="case-dossier-header">
            <div class="case-role-bar">
              <span class="case-role-badge">🏛️ ${activeCase.assignedRole}</span>
              <span class="case-context-tag">• ${activeCase.institutionalContext}</span>
            </div>
            <h1 class="case-dossier-title">[${activeCase.caseNumber}] ${activeCase.title}</h1>
          </div>

          <!-- RELATÓRIO FÁTICO -->
          <div class="case-briefing-card">
            <span class="briefing-label">Relatório Circunstanciado dos Fatos</span>
            <p class="briefing-text">${activeCase.briefing}</p>

            <div class="legal-problem-box">
              <span class="legal-problem-title">Dilema Jurídico Central</span>
              <p class="legal-problem-desc">${activeCase.legalProblem}</p>
            </div>
          </div>

          <!-- FASE 1: ESCOLHA DA DECISÃO ADMINISTRATIVA -->
          <div class="decision-stage-section">
            <h3 class="stage-title">1. Escolha a Conduta ou Decisão Administrativa</h3>
            <div class="decision-options-grid">
              ${activeCase.availableDecisions
                .map((opt: PracticalDecisionOption) => {
                  const isSelected = this.selectedDecisionId === opt.id;
                  return `
                  <div class="decision-card-option ${isSelected ? 'selected' : ''}" data-decision-id="${opt.id}">
                    <div class="decision-radio-indicator"></div>
                    <div class="decision-text-content">
                      <div class="decision-option-label">${opt.label}</div>
                      <div class="decision-option-summary">${opt.actionSummary}</div>
                    </div>
                  </div>
                `;
                })
                .join('')}
            </div>
          </div>

          <!-- FASE 2: VINCULAÇÃO DE NÓS DE FUNDAMENTAÇÃO DO ATLAS -->
          <div class="grounding-stage-section">
            <h3 class="stage-title">2. Vincule os Institutos Doutrinários de Sustentação (Atlas)</h3>
            <p style="font-size:0.82rem;color:var(--text-muted);">
              Selecione de 1 a 3 nós conceituais para fundamentar sua decisão técnica:
            </p>
            <div class="grounding-chips-grid">
              ${availableConcepts
                .map(concept => {
                  const isSelected = this.selectedConceptIds.includes(concept.id);
                  return `
                  <button class="grounding-concept-chip ${isSelected ? 'selected' : ''}" data-concept-id="${concept.id}">
                    ${isSelected ? '✔' : '+'} ${concept.title}
                  </button>
                `;
                })
                .join('')}
            </div>
          </div>

          <!-- BOTÃO DE AÇÃO -->
          <div class="simulator-actions-row">
            <button class="submit-verdict-btn" id="submit-verdict-btn" ${!this.selectedDecisionId || this.selectedConceptIds.length === 0 ? 'disabled' : ''}>
              ⚖️ Emitir Decisão & Parecer Técnico
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
      <div class="verdict-result-card ${res.success ? 'success' : 'failure'}">
        <div class="verdict-header">
          <h2 class="verdict-status-title">${res.verdictTitle}</h2>
          <span class="verdict-xp-badge">⭐ +${res.xpEarned} XP</span>
        </div>
        <p class="verdict-feedback-text">${res.technicalFeedback}</p>
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
          .forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
        this.updateSubmitButtonState();
      });
    });

    // Clique nos chips de fundamentação (Fase 2)
    this.containerEl.querySelectorAll<HTMLElement>('.grounding-concept-chip').forEach(el => {
      el.addEventListener('click', () => {
        const conceptId = el.dataset.conceptId;
        if (!conceptId) return;

        if (this.selectedConceptIds.includes(conceptId)) {
          this.selectedConceptIds = this.selectedConceptIds.filter(id => id !== conceptId);
          el.classList.remove('selected');
          el.textContent = `+ ${el.textContent?.replace('✔', '').trim()}`;
        } else {
          if (this.selectedConceptIds.length < 3) {
            this.selectedConceptIds.push(conceptId);
            el.classList.add('selected');
            el.textContent = `✔ ${el.textContent?.replace('+', '').trim()}`;
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
        <div class="verdict-result-card ${finalSuccess ? 'success' : 'failure'}">
          <div class="verdict-header">
            <h2 class="verdict-status-title">${rule.outcome.verdictTitle}</h2>
            <span class="verdict-xp-badge">⭐ +${finalXp} XP</span>
          </div>
          <p class="verdict-feedback-text">${rule.outcome.technicalFeedback}</p>
          <div class="verdict-grounding-box">
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

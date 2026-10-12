import { DoctrineTopic } from '../data/doctrine-library';
import { DOCTRINE_LIBRARY_DATA } from '../data/doctrine-library';
import { PRACTICAL_AXES } from '../data/axes';
import { minervaPet } from './minerva-pet';

export class CompendiumEngine {
  private containerEl: HTMLElement | null = null;
  private activeTopicIndex: number = 0;
  private searchQuery: string = '';
  private onNavigateToCaseCallback: ((caseId: string) => void) | null = null;
  private onNavigateToConceptCallback: ((conceptId: string) => void) | null = null;

  constructor() {
    // Inicialização no mount()
  }

  public mount(
    container: HTMLElement,
    onNavigateToCase?: (caseId: string) => void,
    onNavigateToConcept?: (conceptId: string) => void
  ): void {
    this.containerEl = container;
    this.onNavigateToCaseCallback = onNavigateToCase || null;
    this.onNavigateToConceptCallback = onNavigateToConcept || null;
    this.render();
  }

  public setActiveTopicById(topicId: string): void {
    const idx = DOCTRINE_LIBRARY_DATA.findIndex(t => t.id === topicId);
    if (idx >= 0) {
      this.activeTopicIndex = idx;
      this.render();

      const topic = this.getActiveTopic();
      minervaPet.setEmotion(
        'idle',
        `Compêndio Doutrinário: Tema ${topic.number} — ${topic.title}.`,
        'Leitura aprofundada com ementas, seções analíticas e jurisprudência vinculante.',
        5000
      );
    }
  }

  public getActiveTopic(): DoctrineTopic {
    return DOCTRINE_LIBRARY_DATA[this.activeTopicIndex] || DOCTRINE_LIBRARY_DATA[0];
  }

  private render(): void {
    if (!this.containerEl) return;

    const activeTopic = this.getActiveTopic();
    const axis = PRACTICAL_AXES.find(a => a.id === activeTopic.axisId);

    // Filtra lista por busca se houver
    const filteredTopics = DOCTRINE_LIBRARY_DATA.filter(t => {
      if (!this.searchQuery) return true;
      const q = this.searchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.subtitle.toLowerCase().includes(q) ||
        t.analyticalEmenta.toLowerCase().includes(q)
      );
    });

    this.containerEl.innerHTML = `
      <div class="compendium-view-container">
        <!-- SUMÁRIO ANALÍTICO LATERAL -->
        <aside class="compendium-sidebar">
          <div class="compendium-sidebar-header">
            <div class="sidebar-headline">
              <span class="sidebar-category-label">BIBLIOTECA DOGMÁTICA</span>
              <h3 class="compendium-sidebar-title">Compêndio Analítico</h3>
            </div>
            <div class="compendium-search-box">
              <input type="text" id="compendium-search-input" class="compendium-search-input" placeholder="Buscar instituto, tema ou súmula..." value="${this.searchQuery}">
            </div>
          </div>

          <div class="compendium-topics-list">
            ${filteredTopics
              .map(topic => {
                const isActive = topic.id === activeTopic.id;
                const topicAxis = PRACTICAL_AXES.find(a => a.id === topic.axisId);
                return `
                <div class="compendium-topic-item ${isActive ? 'active' : ''}" data-topic-id="${topic.id}">
                  <div class="topic-item-header">
                    <span class="topic-number-badge">Tema ${topic.number < 10 ? '0' + topic.number : topic.number}</span>
                    <span class="topic-reading-time">${topic.readingTimeMinutes} min</span>
                  </div>
                  <div class="topic-item-title">${topic.title}</div>
                  <div class="topic-axis-tag">${topicAxis?.title || ''}</div>
                </div>
              `;
              })
              .join('')}
          </div>
        </aside>

        <!-- SALA DE LEITURA EDITORIAL -->
        <main class="compendium-reader-area" id="compendium-reader-area">
          <article class="editorial-treatise-wrapper">
            <!-- CABEÇALHO DO TRATADO -->
            <header class="treatise-header">
              <div class="treatise-meta-bar">
                <span class="treatise-number-tag">TRATADO TEMÁTICO Nº ${activeTopic.number}</span>
                <span class="treatise-axis-pill">Eixo ${axis?.number}: ${axis?.title}</span>
              </div>
              <h1 class="treatise-title">${activeTopic.title}</h1>
              <p class="treatise-subtitle">${activeTopic.subtitle}</p>
            </header>

            <!-- EMENTA ANALÍTICA -->
            <div class="analytical-ementa-card">
              <div class="ementa-title-tag">EMENTA ANALÍTICA</div>
              <p class="ementa-body-text">${activeTopic.analyticalEmenta}</p>
            </div>

            <!-- SEÇÕES DE ESTUDO DENSO -->
            <div class="treatise-sections-flow">
              ${activeTopic.sections
                .map(
                  sec => `
                <section class="treatise-section-block" id="section-${sec.id}">
                  <h2 class="section-title">
                    <span class="section-number">${sec.number}</span> ${sec.title}
                  </h2>
                  <div class="section-paragraphs">
                    ${sec.content.map(p => `<p class="treatise-paragraph">${p}</p>`).join('')}
                  </div>

                  ${
                    sec.keyTheses && sec.keyTheses.length > 0
                      ? `
                    <div class="sovereign-theses-box">
                      <div class="theses-box-header">TESES VINCULANTES E ENUNCIADOS DOS TRIBUNAIS</div>
                      ${sec.keyTheses.map(t => `<div class="thesis-item">${t}</div>`).join('')}
                    </div>
                  `
                      : ''
                  }

                  ${
                    sec.statutoryBasis && sec.statutoryBasis.length > 0
                      ? `
                    <div class="statutory-basis-row">
                      <span class="statutory-label">Base Legal Positiva:</span>
                      ${sec.statutoryBasis.map(b => `<span class="statutory-badge">${b}</span>`).join('')}
                    </div>
                  `
                      : ''
                  }
                </section>
              `
                )
                .join('')}
            </div>

            <!-- PONTES PRÁTICAS E APLICAÇÃO -->
            <footer class="treatise-footer-bridges">
              <div class="bridges-headline">APLICAÇÃO PRÁTICA DO INSTITUTO</div>
              <div class="bridges-buttons-row">
                ${
                  activeTopic.relatedCaseId
                    ? `
                  <button class="bridge-action-btn primary" id="bridge-case-btn" data-case-id="${activeTopic.relatedCaseId}">
                    Simular Caso Prático Correlato
                  </button>
                `
                    : ''
                }
                ${
                  activeTopic.relatedConceptId
                    ? `
                  <button class="bridge-action-btn secondary" id="bridge-concept-btn" data-concept-id="${activeTopic.relatedConceptId}">
                    Examinar no Blueprint Sistêmico
                  </button>
                `
                    : ''
                }
              </div>
            </footer>
          </article>
        </main>
      </div>
    `;

    this.setupListeners();
  }

  private setupListeners(): void {
    if (!this.containerEl) return;

    // Clique nos tópicos da sidebar
    this.containerEl.querySelectorAll<HTMLElement>('.compendium-topic-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.topicId;
        if (id) {
          this.setActiveTopicById(id);
          const reader = document.getElementById('compendium-reader-area');
          reader?.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

    // Busca instantânea
    const searchInput = document.getElementById(
      'compendium-search-input'
    ) as HTMLInputElement | null;
    searchInput?.addEventListener('input', e => {
      this.searchQuery = (e.target as HTMLInputElement).value;
      this.render();
      // Re-foca o input mantendo o cursor
      const refreshedInput = document.getElementById(
        'compendium-search-input'
      ) as HTMLInputElement | null;
      if (refreshedInput) {
        refreshedInput.focus();
        refreshedInput.selectionStart = refreshedInput.selectionEnd = refreshedInput.value.length;
      }
    });

    // Botões de pontes práticas
    const caseBtn = document.getElementById('bridge-case-btn');
    caseBtn?.addEventListener('click', () => {
      const caseId = caseBtn.getAttribute('data-case-id');
      if (caseId && this.onNavigateToCaseCallback) {
        this.onNavigateToCaseCallback(caseId);
      }
    });

    const conceptBtn = document.getElementById('bridge-concept-btn');
    conceptBtn?.addEventListener('click', () => {
      const conceptId = conceptBtn.getAttribute('data-concept-id');
      if (conceptId && this.onNavigateToConceptCallback) {
        this.onNavigateToConceptCallback(conceptId);
      }
    });
  }
}

export const compendiumEngine = new CompendiumEngine();

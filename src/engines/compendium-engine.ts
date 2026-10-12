import { DOCTRINE_LIBRARY_DATA, DoctrineTopic, DoctrineSection } from '../data/doctrine-library';
import { PRACTICAL_AXES } from '../data/axes';
import { minervaPet } from './minerva-pet';
import { renderIcon, BookOpen, Search, Scale, Layers } from '../utils/icons';

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

  public getActiveTopic(): DoctrineTopic {
    return DOCTRINE_LIBRARY_DATA[this.activeTopicIndex] || DOCTRINE_LIBRARY_DATA[0];
  }

  public setActiveTopicById(topicId: string): void {
    const idx = DOCTRINE_LIBRARY_DATA.findIndex(t => t.id === topicId);
    if (idx >= 0) {
      this.activeTopicIndex = idx;
      this.render();

      const topic = this.getActiveTopic();
      minervaPet.setEmotion(
        'idle',
        `Tema ${topic.number}: ${topic.title}.`,
        'Sala de Leitura com fundamentação dogmática densa e teses vinculantes.',
        5000
      );
    }
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
      <div class="compendium-view-container w-full h-full flex bg-slate-50 overflow-hidden">
        <!-- SUMÁRIO ANALÍTICO LATERAL (MASTER-DETAIL CONTÍNUA) -->
        <aside class="compendium-sidebar w-80 min-w-80 h-full bg-slate-50/50 border-r border-slate-200/80 flex flex-col">
          <div class="compendium-sidebar-header p-4 border-b border-slate-200/80 bg-white flex flex-col gap-2.5">
            <div class="sidebar-headline flex items-center justify-between">
              <span class="sidebar-category-label text-[10px] font-bold uppercase tracking-wider text-slate-400">Biblioteca Dogmática</span>
              <span class="text-xs font-mono text-slate-400">${DOCTRINE_LIBRARY_DATA.length} tratados</span>
            </div>
            <div class="compendium-search-box relative flex items-center">
              <div class="absolute left-3 text-slate-400 pointer-events-none">
                ${renderIcon(Search, { className: 'w-3.5 h-3.5 text-slate-400' })}
              </div>
              <input type="text" id="compendium-search-input" class="compendium-search-input w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:border-blue-900 focus:outline-none transition-colors" placeholder="Buscar instituto, tema ou súmula..." value="${this.searchQuery}">
            </div>
          </div>

          <div class="compendium-topics-list flex-1 overflow-y-auto">
            ${filteredTopics
              .map(topic => {
                const isActive = topic.id === activeTopic.id;
                const topicAxis = PRACTICAL_AXES.find(a => a.id === topic.axisId);
                return `
                <div class="compendium-topic-item group relative p-3.5 border-b border-slate-100 transition-colors cursor-pointer hover:bg-slate-100/70 ${isActive ? 'active bg-white border-l-3 border-l-blue-900 shadow-xs' : ''}" data-topic-id="${topic.id}">
                  <div class="topic-item-header flex items-center justify-between text-xs">
                    <span class="topic-number-badge font-semibold text-slate-500 uppercase tracking-wider">Tema ${topic.number < 10 ? '0' + topic.number : topic.number}</span>
                    <span class="topic-reading-time text-slate-400 font-mono">${topic.readingTimeMinutes} min</span>
                  </div>
                  <div class="topic-item-title font-sans text-xs font-medium text-slate-900 mt-1 line-clamp-2 ${isActive ? 'font-semibold text-blue-900' : ''}">${topic.title}</div>
                  <div class="topic-axis-tag text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                    ${renderIcon(BookOpen, { className: 'w-3 h-3 text-slate-400' })}
                    <span class="line-clamp-1">${topicAxis?.title || ''}</span>
                  </div>
                </div>
              `;
              })
              .join('')}
          </div>
        </aside>

        <!-- SALA DE LEITURA EDITORIAL -->
        <main class="compendium-reader-area flex-1 h-full overflow-y-auto py-8 px-12 flex justify-center bg-slate-50" id="compendium-reader-area">
          <article class="editorial-treatise-wrapper max-w-3xl w-full flex flex-col gap-8">
            <!-- CABEÇALHO DO TRATADO -->
            <header class="treatise-header border-b border-slate-200/80 pb-6 flex flex-col gap-2">
              <div class="treatise-meta-bar flex items-center gap-2 text-xs">
                <span class="treatise-number-tag font-semibold text-blue-900 uppercase tracking-wider">Tratado Temático Nº ${activeTopic.number}</span>
                <span class="text-slate-300">•</span>
                <span class="treatise-axis-pill text-slate-500 font-medium">Eixo ${axis?.number}: ${axis?.title}</span>
              </div>
              <h1 class="treatise-title font-sans font-bold text-2xl text-slate-900 leading-tight">${activeTopic.title}</h1>
              <p class="treatise-subtitle text-sm text-slate-600 leading-relaxed">${activeTopic.subtitle}</p>
            </header>

            <!-- EMENTA ANALÍTICA -->
            <div class="analytical-ementa-card bg-white rounded-xl border border-slate-200/80 border-l-3 border-l-blue-900 p-5 shadow-xs flex flex-col gap-2">
              <div class="ementa-title-tag text-[11px] font-bold uppercase tracking-wider text-blue-900">Ementa Analítica</div>
              <p class="ementa-body-text font-serif italic text-sm text-slate-700 leading-relaxed">${activeTopic.analyticalEmenta}</p>
            </div>

            <!-- SEÇÕES DE ESTUDO DENSO (TEXTO DOUTRINÁRIO COM FONTE SERIFADA) -->
            <div class="treatise-sections-flow flex flex-col gap-8">
              ${activeTopic.sections
                .map(
                  (sec: DoctrineSection) => `
                <section class="treatise-section-block flex flex-col gap-3" id="section-${sec.id}">
                  <h2 class="section-title font-sans font-bold text-base text-slate-900 border-b border-slate-200/80 pb-2 flex items-baseline gap-2">
                    <span class="section-number text-blue-900 font-mono text-sm">${sec.number}</span>
                    <span>${sec.title}</span>
                  </h2>
                  <div class="section-paragraphs doctrine-body flex flex-col gap-4">
                    ${sec.content.map((p: string) => `<p class="treatise-paragraph font-serif text-[1.05rem] leading-relaxed text-slate-800 text-justify">${p}</p>`).join('')}
                  </div>

                  ${
                    sec.keyTheses && sec.keyTheses.length > 0
                      ? `
                    <div class="sovereign-theses-box bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col gap-2 my-2">
                      <div class="theses-box-header text-[11px] font-bold uppercase tracking-wider text-blue-900">Teses Vinculantes e Enunciados dos Tribunais</div>
                      ${sec.keyTheses.map((t: string) => `<div class="thesis-item font-mono text-xs text-slate-800 bg-slate-50 border-l-2 border-l-blue-900 p-2.5 rounded-r">${t}</div>`).join('')}
                    </div>
                  `
                      : ''
                  }

                  ${
                    sec.statutoryBasis && sec.statutoryBasis.length > 0
                      ? `
                    <div class="statutory-basis-row flex flex-wrap items-center gap-1.5 mt-1 text-xs text-slate-500">
                      <span class="statutory-label font-semibold">Base Legal Positiva:</span>
                      ${sec.statutoryBasis.map((b: string) => `<span class="statutory-badge font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 text-[11px]">${b}</span>`).join('')}
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
            <footer class="treatise-footer-bridges border-t border-slate-200/80 pt-6 flex flex-col gap-3">
              <div class="bridges-headline text-[11px] font-bold uppercase tracking-wider text-slate-400">Aplicação Prática do Instituto</div>
              <div class="bridges-buttons-row flex gap-3">
                ${
                  activeTopic.relatedCaseId
                    ? `
                  <button class="bridge-action-btn primary px-4 py-2 rounded-lg text-xs font-semibold bg-blue-900 text-white hover:bg-blue-950 flex items-center gap-2 cursor-pointer shadow-xs transition-colors" id="bridge-case-btn" data-case-id="${activeTopic.relatedCaseId}">
                    ${renderIcon(Scale, { className: 'w-4 h-4 text-white' })}
                    <span>Simular Caso Prático Correlato</span>
                  </button>
                `
                    : ''
                }
                ${
                  activeTopic.relatedConceptId
                    ? `
                  <button class="bridge-action-btn secondary px-4 py-2 rounded-lg text-xs font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors" id="bridge-concept-btn" data-concept-id="${activeTopic.relatedConceptId}">
                    ${renderIcon(Layers, { className: 'w-4 h-4 text-slate-600' })}
                    <span>Examinar no Blueprint Sistêmico</span>
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

import { DoctrineTopic } from '../data/doctrine-library';
import { PRACTICAL_AXES } from '../data/axes';
import { minervaPet } from './minerva-pet';
import { renderIcon, BookOpen, Search, Scale, Layers } from '../utils/icons';
import { fetchTemas, fetchTemaCompleto } from '../utils/api';
import { marked } from 'marked';

export class CompendiumEngine {
  private containerEl: HTMLElement | null = null;
  private topics: DoctrineTopic[] = [];
  private activeTopicId: string | null = null;
  private activeTopicDetail: DoctrineTopic | null = null;
  private searchQuery: string = '';
  private isLoadingList: boolean = false;
  private isLoadingDetail: boolean = false;
  private errorMessage: string | null = null;
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
    this.initCompendium();
  }

  private async initCompendium(): Promise<void> {
    this.render();
    await this.loadTopics();
  }

  public async loadTopics(query: string = ''): Promise<void> {
    this.isLoadingList = true;
    this.errorMessage = null;
    this.searchQuery = query;
    this.render();

    try {
      const data = await fetchTemas('direito-administrativo', query);
      this.topics = Array.isArray(data) ? data : [];

      if (this.topics.length > 0) {
        // Se não há tema selecionado ou o selecionado não está na lista filtrada
        const currentSelected = this.topics.find(t => t.id === this.activeTopicId);
        const targetId = currentSelected ? currentSelected.id : this.topics[0].id;
        await this.setActiveTopicById(targetId);
      } else {
        this.activeTopicId = null;
        this.activeTopicDetail = null;
        this.render();
      }
    } catch (err) {
      console.error('[CompendiumEngine] Erro ao buscar temas da API:', err);
      this.errorMessage = 'Não foi possível conectar à API de Doutrina. Verifique se o servidor backend está ativo.';
      this.render();
    } finally {
      this.isLoadingList = false;
      this.render();
    }
  }

  public async setActiveTopicById(topicId: string): Promise<void> {
    this.activeTopicId = topicId;
    this.isLoadingDetail = true;
    this.render();

    try {
      const fullTopic = await fetchTemaCompleto(topicId);
      this.activeTopicDetail = fullTopic;

      if (fullTopic) {
        minervaPet.setEmotion(
          'idle',
          `Tema ${fullTopic.number}: ${fullTopic.title}.`,
          'Sala de Leitura com fundamentação dogmática densa servida sob demanda via API.',
          5000
        );
      }
    } catch (err) {
      console.error(`[CompendiumEngine] Erro ao carregar tema ${topicId}:`, err);
    } finally {
      this.isLoadingDetail = false;
      this.render();
      const reader = document.getElementById('compendium-reader-area');
      reader?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  public getActiveTopic(): DoctrineTopic | null {
    if (this.activeTopicDetail) return this.activeTopicDetail;
    return this.topics.find(t => t.id === this.activeTopicId) || this.topics[0] || null;
  }

  private render(): void {
    if (!this.containerEl) return;

    const activeTopic = this.getActiveTopic();
    const axis = activeTopic ? PRACTICAL_AXES.find(a => a.id === activeTopic.axisId) : null;

    this.containerEl.innerHTML = `
      <div class="compendium-view-container w-full h-full flex bg-slate-50 overflow-hidden">
        <!-- SUMÁRIO ANALÍTICO LATERAL (MASTER-DETAIL CONTÍNUA) -->
        <aside class="compendium-sidebar w-80 min-w-80 h-full bg-slate-50/50 border-r border-slate-200/80 flex flex-col">
          <div class="compendium-sidebar-header p-4 border-b border-slate-200/80 bg-white flex flex-col gap-2.5">
            <div class="sidebar-headline flex items-center justify-between">
              <span class="sidebar-category-label text-[10px] font-bold uppercase tracking-wider text-slate-400">Biblioteca Dogmática</span>
              <span class="text-xs font-mono text-slate-400">${this.topics.length} tratados</span>
            </div>
            <div class="compendium-search-box relative flex items-center">
              <div class="absolute left-3 text-slate-400 pointer-events-none">
                ${renderIcon(Search, { className: 'w-3.5 h-3.5 text-slate-400' })}
              </div>
              <input type="text" id="compendium-search-input" class="compendium-search-input w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:border-blue-900 focus:outline-none transition-colors" placeholder="Buscar instituto, tema ou súmula..." value="${this.searchQuery}">
            </div>
          </div>

          <div class="compendium-topics-list flex-1 overflow-y-auto">
            ${
              this.isLoadingList && this.topics.length === 0
                ? `
              <div class="p-4 space-y-3">
                <div class="h-12 bg-slate-200/60 rounded animate-pulse"></div>
                <div class="h-12 bg-slate-200/60 rounded animate-pulse"></div>
                <div class="h-12 bg-slate-200/60 rounded animate-pulse"></div>
              </div>
            `
                : this.topics.length === 0
                  ? `
              <div class="p-6 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
                <span>Nenhum tratado encontrado para "${this.searchQuery}".</span>
              </div>
            `
                  : this.topics
                      .map(topic => {
                        const isActive = topic.id === (activeTopic?.id || this.activeTopicId);
                        const topicAxis = PRACTICAL_AXES.find(a => a.id === topic.axisId);
                        return `
                <div class="compendium-topic-item group relative p-3.5 border-b border-slate-100 transition-colors cursor-pointer hover:bg-slate-100/70 ${isActive ? 'active bg-white border-l-3 border-l-blue-900 shadow-xs' : ''}" data-topic-id="${topic.id}">
                  <div class="topic-item-header flex items-center justify-between text-xs">
                    <span class="topic-number-badge font-semibold text-slate-500 uppercase tracking-wider">Tema ${topic.number < 10 ? '0' + topic.number : topic.number}</span>
                    <span class="topic-reading-time text-slate-400 font-mono">${topic.readingTimeMinutes || 20} min</span>
                  </div>
                  <div class="topic-item-title font-sans text-xs font-medium text-slate-900 mt-1 line-clamp-2 ${isActive ? 'font-semibold text-blue-900' : ''}">${topic.title}</div>
                  <div class="topic-axis-tag text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                    ${renderIcon(BookOpen, { className: 'w-3 h-3 text-slate-400' })}
                    <span class="line-clamp-1">${topicAxis?.title || ''}</span>
                  </div>
                </div>
              `;
                      })
                      .join('')
            }
          </div>
        </aside>

        <!-- SALA DE LEITURA EDITORIAL -->
        <main class="compendium-reader-area flex-1 h-full overflow-y-auto py-8 px-12 flex justify-center bg-slate-50" id="compendium-reader-area">
          ${
            this.errorMessage
              ? `
            <div class="editorial-treatise-wrapper max-w-3xl w-full flex flex-col items-center justify-center gap-4 text-center py-20">
              <div class="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                ${renderIcon(BookOpen, { className: 'w-6 h-6' })}
              </div>
              <h2 class="font-sans font-bold text-lg text-slate-800">Conexão com a Biblioteca</h2>
              <p class="text-xs text-slate-600 max-w-md">${this.errorMessage}</p>
              <button id="compendium-retry-btn" class="px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-semibold hover:bg-blue-950 transition-colors cursor-pointer">Tentar Novamente</button>
            </div>
          `
              : this.isLoadingDetail
                ? `
            <!-- SKELETON LOADER LEVE -->
            <div class="editorial-treatise-wrapper max-w-3xl w-full flex flex-col gap-8 animate-pulse">
              <div class="border-b border-slate-200/80 pb-6 flex flex-col gap-3">
                <div class="h-4 w-44 bg-slate-200/80 rounded"></div>
                <div class="h-8 w-3/4 bg-slate-200/80 rounded"></div>
                <div class="h-4 w-1/2 bg-slate-200/80 rounded"></div>
              </div>
              <div class="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col gap-2">
                <div class="h-3 w-32 bg-slate-200/80 rounded"></div>
                <div class="h-16 w-full bg-slate-200/60 rounded"></div>
              </div>
              <div class="space-y-4 pt-2">
                <div class="h-5 w-full bg-slate-200/70 rounded"></div>
                <div class="h-5 w-full bg-slate-200/70 rounded"></div>
                <div class="h-5 w-4/5 bg-slate-200/70 rounded"></div>
                <div class="h-5 w-full bg-slate-200/70 rounded"></div>
                <div class="h-5 w-3/4 bg-slate-200/70 rounded"></div>
              </div>
            </div>
          `
                : activeTopic
                  ? `
            <article class="editorial-treatise-wrapper max-w-3xl w-full flex flex-col gap-8">
              <!-- CABEÇALHO DO TRATADO -->
              <header class="treatise-header border-b border-slate-200/80 pb-6 flex flex-col gap-2">
                <div class="treatise-meta-bar flex items-center gap-2 text-xs">
                  <span class="treatise-number-tag font-semibold text-blue-900 uppercase tracking-wider">Tratado Temático Nº ${activeTopic.number}</span>
                  <span class="text-slate-300">•</span>
                  <span class="treatise-axis-pill text-slate-500 font-medium">Eixo ${axis?.number || 1}: ${axis?.title || ''}</span>
                </div>
                <h1 class="treatise-title font-sans font-bold text-2xl text-slate-900 leading-tight">${activeTopic.title}</h1>
                <p class="treatise-subtitle text-sm text-slate-600 leading-relaxed">${activeTopic.subtitle}</p>
              </header>

              <!-- EMENTA ANALÍTICA -->
              <div class="analytical-ementa-card bg-white rounded-xl border border-slate-200/80 border-l-3 border-l-blue-900 p-5 shadow-xs flex flex-col gap-2">
                <div class="ementa-title-tag text-[11px] font-bold uppercase tracking-wider text-blue-900">Ementa Analítica</div>
                <p class="ementa-body-text font-serif italic text-sm text-slate-700 leading-relaxed">${activeTopic.analyticalEmenta}</p>
              </div>

              <!-- CORPO DOUTRINÁRIO (RENDERIZADO VIA MARKDOWN DA API) -->
              <div class="doctrine-markdown-body treatise-sections-flow flex flex-col gap-4">
                ${
                  activeTopic.conteudoMarkdown
                    ? marked.parse(activeTopic.conteudoMarkdown)
                    : '<p class="text-sm text-slate-500 italic">Carregando conteúdo doutrinário completo...</p>'
                }
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
          `
                  : `
            <div class="p-12 text-center text-slate-400">Selecione um tema doutrinário para iniciar o estudo.</div>
          `
          }
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
        if (id && id !== this.activeTopicId) {
          this.setActiveTopicById(id);
        }
      });
    });

    // Busca instantânea com debounce
    const searchInput = document.getElementById(
      'compendium-search-input'
    ) as HTMLInputElement | null;
    let searchTimeout: any = null;
    searchInput?.addEventListener('input', e => {
      const val = (e.target as HTMLInputElement).value;
      this.searchQuery = val;
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.loadTopics(val);
      }, 300);
    });

    // Botão de retry em caso de erro
    const retryBtn = document.getElementById('compendium-retry-btn');
    retryBtn?.addEventListener('click', () => {
      this.initCompendium();
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

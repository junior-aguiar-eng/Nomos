import { stateManager } from './engines/state-manager';
import { compendiumEngine } from './engines/compendium-engine';
import { atlasGraphEngine } from './engines/atlas-graph';
import { simulatorEngine } from './engines/simulator-engine';
import { dossierEngine } from './engines/dossier-engine';
import { minervaPet } from './engines/minerva-pet';
import { renderIcon, Moon, Sun, getRankIcon } from './utils/icons';

type AppView = 'compendium' | 'atlas' | 'simulator' | 'dossier';

class NomosApp {
  private currentView: AppView = 'compendium';

  public init(): void {
    console.log('[NOMOS] Inicializando Studio Jurídico...');

    // 1. Aplica tema inicial
    this.applyTheme(stateManager.getState().theme);

    // 2. Monta os 4 motores institucionais
    this.mountEngines();

    // 3. Configura controles da interface
    this.setupNavigation();
    this.setupThemeToggle();
    this.setupStateSubscriptions();
    this.updateHeaderBadges();

    console.log('[NOMOS] Operando com os 4 Pilares Institucionais.');
  }

  private applyTheme(theme: 'crystal-light' | 'deep-cyber-dark'): void {
    document.documentElement.dataset.theme = theme;
  }

  private mountEngines(): void {
    const compendiumPane = document.getElementById('compendium-view-pane');
    const atlasPane = document.getElementById('atlas-view-pane');
    const simulatorPane = document.getElementById('simulator-view-pane');
    const dossierPane = document.getElementById('dossier-view-pane');
    const minervaHost = document.getElementById('minerva-host');

    // 1. Monta o Compêndio Doutrinário com pontes práticas para o Simulador e Blueprint
    if (compendiumPane) {
      compendiumEngine.mount(
        compendiumPane,
        (caseId: string) => {
          this.switchView('simulator');
          simulatorEngine.setActiveCaseById(caseId);
        },
        (conceptId: string) => {
          this.switchView('atlas');
          atlasGraphEngine.selectConcept(conceptId);
          atlasGraphEngine.highlightConceptForNightVision(conceptId);
        }
      );
    }

    // 2. Monta o Blueprint Sistêmico
    if (atlasPane) {
      atlasGraphEngine.mount(atlasPane);
    }

    // 3. Monta o Laboratório de Decisões
    if (simulatorPane) {
      simulatorEngine.mount(simulatorPane, (conceptId: string) => {
        this.switchView('atlas');
        atlasGraphEngine.highlightConceptForNightVision(conceptId);
        atlasGraphEngine.selectConcept(conceptId);
      });
    }

    // 4. Monta o Dossiê de Carreira e Caderno de Erros
    if (dossierPane) {
      dossierEngine.mount(dossierPane);
    }

    // 5. Monta o Emblema Institucional Minerva
    if (minervaHost) {
      minervaPet.mount(minervaHost, () => {
        if (this.currentView === 'simulator') {
          simulatorEngine.triggerActiveCaseNightVision();
        } else if (this.currentView === 'compendium') {
          minervaPet.setEmotion(
            'night_vision',
            'Visão Noturna ativa: consulte os enunciados vinculantes destacados nas caixas de jurisprudência do tratado.',
            'O domínio dogmático exige a correlação entre a norma e a súmula.',
            6000
          );
        } else {
          minervaPet.setEmotion(
            'night_vision',
            'Visão Noturna ativa: acompanhe as linhas ortogonais para verificar a derivação das competências.',
            'Cada coluna representa uma fase funcional da atividade estatal.',
            6000
          );
        }
      });
    }
  }

  private setupNavigation(): void {
    const viewButtons = document.querySelectorAll<HTMLElement>('.view-nav-btn');
    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view as AppView | undefined;
        if (view) {
          this.switchView(view);
        }
      });
    });
  }

  public switchView(view: AppView): void {
    this.currentView = view;

    // Atualiza botões da barra superior (Segmented control)
    document.querySelectorAll<HTMLElement>('.view-nav-btn').forEach(btn => {
      const isActive = btn.dataset.view === view;
      btn.classList.toggle('active', isActive);
      if (isActive) {
        btn.className =
          'view-nav-btn active px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all bg-white text-slate-900 shadow-xs';
      } else {
        btn.className =
          'view-nav-btn px-3.5 py-1.5 text-xs font-medium rounded-md transition-all text-slate-600 hover:text-slate-900';
      }
    });

    // Atualiza painéis ativos
    const compendiumPane = document.getElementById('compendium-view-pane');
    const atlasPane = document.getElementById('atlas-view-pane');
    const simulatorPane = document.getElementById('simulator-view-pane');
    const dossierPane = document.getElementById('dossier-view-pane');

    compendiumPane?.classList.toggle('active', view === 'compendium');
    atlasPane?.classList.toggle('active', view === 'atlas');
    simulatorPane?.classList.toggle('active', view === 'simulator');
    dossierPane?.classList.toggle('active', view === 'dossier');

    // Feedback técnico solene de Minerva
    if (view === 'compendium') {
      const topic = compendiumEngine.getActiveTopic();
      if (topic) {
        minervaPet.setEmotion(
          'idle',
          `Compêndio Doutrinário: Tema ${topic.number} — ${topic.title}.`,
          'Sala de Leitura com fundamentação dogmática densa e enunciados vinculantes.',
          5000
        );
      }
    } else if (view === 'atlas') {
      minervaPet.setEmotion(
        'idle',
        'Blueprint Sistêmico: diagrama ortogonal estruturado em 4 raias lógicas.',
        'Passe o mouse sobre os institutos para iluminar os circuitos de correlação.',
        5000
      );
    } else if (view === 'simulator') {
      const activeCase = simulatorEngine.getActiveCase();
      minervaPet.setEmotion(
        'scanning',
        `Autuação do ${activeCase.caseNumber}: papel atribuído — ${activeCase.assignedRole}.`,
        'Delibere sobre a conduta administrativa e sustente com base nos nós dogmáticos.',
        5000
      );
    } else if (view === 'dossier') {
      minervaPet.setEmotion(
        'idle',
        'Dossiê de Carreira: análise do histórico de julgamentos e exportação do caderno.',
        'A precisão dogmática consolida sua autoridade na carreira pública simulada.',
        5000
      );
    }
  }

  private setupThemeToggle(): void {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    toggleBtn?.addEventListener('click', () => {
      stateManager.toggleTheme();
    });
  }

  private updateHeaderBadges(): void {
    const state = stateManager.getState();
    const rankTitleEl = document.getElementById('header-rank-title');
    const rankXpEl = document.getElementById('header-rank-xp');
    const rankIconEl = document.getElementById('header-rank-icon');
    const themeBtn = document.getElementById('theme-toggle-btn');

    if (rankTitleEl) rankTitleEl.textContent = state.currentRank;
    if (rankXpEl) rankXpEl.textContent = `${state.totalXp} XP`;
    if (rankIconEl)
      rankIconEl.innerHTML = getRankIcon(state.currentRank, 'w-3.5 h-3.5 text-blue-900');
    if (themeBtn) {
      themeBtn.innerHTML = renderIcon(state.theme === 'crystal-light' ? Moon : Sun, {
        className: 'w-4 h-4 text-slate-600'
      });
    }
  }

  private setupStateSubscriptions(): void {
    stateManager.subscribe(state => {
      this.applyTheme(state.theme);
      this.updateHeaderBadges();
    });
  }
}

// Inicialização automática
document.addEventListener('DOMContentLoaded', () => {
  const app = new NomosApp();
  app.init();
});

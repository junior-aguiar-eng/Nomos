import {
  NODUS_DISCIPLINES,
  DISCIPLINE_THEMES_MAP,
  THEME_SUGGESTIONS_MAP,
  FAINT_PERIPHERAL_NODES,
  TOPIC_DOSSIERS,
  TopicDossier,
  SourceItem,
  ThemeNode,
  SuggestionNode
} from '../data/nodus-data';
import { PRACTICE_CASES_DATA } from '../data/practice-cases';

export type AppLevel = 'constelacao' | 'disciplina' | 'convergencia' | 'imersao';

export class NodusApp {
  private container: HTMLElement;
  private currentLevel: AppLevel = 'constelacao';
  public currentDisciplineId = 'constitucional';
  public currentThemeId = 'controle-constitucionalidade';
  public currentTopicId = 'controle-concentrado-constitucionalidade';
  private activeModalSource: SourceItem | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public init(): void {
    this.render();
  }

  public setLevel(level: AppLevel): void {
    const disc = NODUS_DISCIPLINES.find(d => d.id === this.currentDisciplineId);
    if (!disc?.isImplemented && (level === 'convergencia' || level === 'imersao')) {
      this.currentLevel = 'disciplina';
    } else {
      this.currentLevel = level;
    }
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public openDiscipline(disciplineId: string): void {
    this.currentDisciplineId = disciplineId;
    const disc = NODUS_DISCIPLINES.find(d => d.id === disciplineId);
    const themes = DISCIPLINE_THEMES_MAP[disciplineId];

    if (disc?.isImplemented && themes && themes.length > 0) {
      this.currentThemeId = themes[0].id;
      const topicForDiscipline = Object.values(TOPIC_DOSSIERS).find(d => d.disciplineId === disciplineId);
      this.currentTopicId = topicForDiscipline ? topicForDiscipline.id : '';
    } else {
      this.currentThemeId = '';
      this.currentTopicId = '';
    }
    this.setLevel('disciplina');
  }

  public openTheme(themeId: string): void {
    this.currentThemeId = themeId;
    const topicForTheme = Object.values(TOPIC_DOSSIERS).find(
      d => d.disciplineId === this.currentDisciplineId && d.themeId === themeId
    );
    this.currentTopicId = topicForTheme ? topicForTheme.id : '';
    this.setLevel('convergencia');
  }

  public openTopic(topicId: string): void {
    const dossier = TOPIC_DOSSIERS[topicId];
    if (dossier) {
      this.currentDisciplineId = dossier.disciplineId;
      this.currentThemeId = dossier.themeId;
      this.currentTopicId = topicId;
      this.setLevel('imersao');
    }
  }

  public openSourceModal(source: SourceItem): void {
    this.activeModalSource = source;
    this.renderModal();
  }

  public closeModal(): void {
    this.activeModalSource = null;
    const backdrop = document.getElementById('nodus-modal-backdrop');
    if (backdrop) {
      backdrop.classList.remove('open');
      setTimeout(() => backdrop.remove(), 300);
    }
  }

  /**
   * ABRE O LABORATÓRIO DE DECISÕES COM CASO REAL DE PROVA
   */
  public openDecisionSimulator(caseId: string): void {
    const practicalCase = PRACTICE_CASES_DATA.find(c => c.id === caseId);
    if (!practicalCase) {
      console.warn(`[NodusApp] Caso ${caseId} não disponível ou em curadoria.`);
      return;
    }

    let modalBackdrop = document.getElementById('decision-simulator-backdrop');
    if (!modalBackdrop) {
      modalBackdrop = document.createElement('div');
      modalBackdrop.id = 'decision-simulator-backdrop';
      modalBackdrop.className = 'modal-backdrop';
      document.body.appendChild(modalBackdrop);
    }

    modalBackdrop.innerHTML = `
      <div class="modal-dialog" style="max-width:880px;background:#FAF8F5;border:1px solid #8A6B1F;border-radius:18px;padding:36px;box-shadow:0 30px 80px rgba(18,55,42,.35)">
        
        <!-- Cabeçalho do Caso -->
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;border-bottom:1px solid rgba(138,107,31,.3);padding-bottom:18px;margin-bottom:22px">
          <div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
              <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;background:rgba(115,32,55,.12);color:#732037;padding:3px 10px;border-radius:4px">
                ${practicalCase.caseNumber}
              </span>
              <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8A6B1F">
                Função: ${practicalCase.assignedRole}
              </span>
            </div>
            <h2 style="margin:0;font-family:'Instrument Serif',Georgia,serif;font-size:36px;line-height:1.1;color:#12372A">
              ${practicalCase.title}
            </h2>
            <p style="margin:4px 0 0;font-size:13px;color:#4A6A5A">
              ${practicalCase.institutionalContext}
            </p>
          </div>
          <button type="button" id="close-sim-btn" style="background:none;border:1px solid rgba(138,107,31,.4);border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#732037;font-size:18px">✕</button>
        </div>

        <!-- Fatos e Dilema -->
        <div style="display:flex;flex-direction:column;gap:18px;margin-bottom:28px">
          <div style="background:rgba(255,255,255,.75);padding:20px;border-radius:10px;border-left:4px solid #1A4333">
            <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#1A4333;font-weight:600">Relatório dos Fatos</span>
            <p style="margin:8px 0 0;font-size:15px;line-height:1.6;color:#2E4A3D">${practicalCase.briefing}</p>
          </div>

          <div style="background:rgba(209,176,104,.15);padding:16px 20px;border-radius:10px;border-left:4px solid #D1B068">
            <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#7A5E18;font-weight:600">Problema Jurídico Central</span>
            <p style="margin:6px 0 0;font-family:'Instrument Serif',Georgia,serif;font-size:22px;line-height:1.25;color:#12372A">${practicalCase.legalProblem}</p>
          </div>
        </div>

        <!-- Opções de Decisão -->
        <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:24px">
          <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#732037">
            Escolha a sua decisão fundamentada:
          </span>
          <div id="sim-decisions-list" style="display:flex;flex-direction:column;gap:10px">
            ${practicalCase.availableDecisions.map((dec) => `
              <button type="button" class="sim-dec-btn" data-decision-id="${dec.id}" style="text-align:left;background:#FFFFFF;border:1px solid rgba(18,55,42,.2);border-radius:10px;padding:16px 20px;cursor:pointer;transition:all .2s ease;display:flex;flex-direction:column;gap:4px">
                <span style="font-family:'Instrument Serif',Georgia,serif;font-size:22px;line-height:1.2;color:#12372A">${dec.label}</span>
                <span style="font-size:13px;line-height:1.45;color:#3C5A4C">${dec.actionSummary}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Box de Feedback e Veredito -->
        <div id="sim-verdict-box" style="display:none;padding:22px;border-radius:12px;margin-bottom:20px"></div>

        <div style="display:flex;justify-content:flex-end;gap:14px">
          <button type="button" id="sim-cancel-btn" class="mode-btn" style="padding:10px 22px">Fechar</button>
        </div>

      </div>
    `;

    requestAnimationFrame(() => modalBackdrop?.classList.add('open'));

    const closeFn = () => {
      modalBackdrop?.classList.remove('open');
    };
    document.getElementById('close-sim-btn')!.onclick = closeFn;
    document.getElementById('sim-cancel-btn')!.onclick = closeFn;
    modalBackdrop.onclick = (e) => {
      if (e.target === modalBackdrop) closeFn();
    };

    modalBackdrop.querySelectorAll<HTMLButtonElement>('.sim-dec-btn').forEach(btn => {
      btn.onclick = () => {
        const decId = btn.dataset.decisionId;
        const rule = practicalCase.compatibilityRules.find(r => r.decisionId === decId) || practicalCase.compatibilityRules[0];
        const outcome = rule.outcome;

        modalBackdrop?.querySelectorAll('.sim-dec-btn').forEach(b => ((b as HTMLElement).style.borderColor = 'rgba(18,55,42,.2)'));
        btn.style.borderColor = outcome.success ? '#1A4333' : '#732037';
        btn.style.background = outcome.success ? 'rgba(26,67,51,.08)' : 'rgba(115,32,55,.08)';

        const verdictBox = document.getElementById('sim-verdict-box')!;
        verdictBox.style.display = 'block';
        verdictBox.style.background = outcome.success ? 'rgba(26,67,51,.1)' : 'rgba(115,32,55,.1)';
        verdictBox.style.border = `1px solid ${outcome.success ? '#1A4333' : '#732037'}`;
        verdictBox.innerHTML = `
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
            <span style="font-size:20px">${outcome.success ? '✓' : '⚠'}</span>
            <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;color:${outcome.success ? '#1A4333' : '#732037'}">
              ${outcome.verdictTitle}
            </span>
          </div>
          <p style="margin:0 0 10px;font-size:15px;line-height:1.6;color:#12372A">
            ${outcome.technicalFeedback}
          </p>
          <div style="font-family:'IBM Plex Mono',monospace;font-size:12px;color:#8A6B1F;border-top:1px dashed rgba(138,107,31,.3);padding-top:8px">
            Fundamento: ${outcome.legalGrounding}
          </div>
        `;
      };
    });
  }

  /**
   * ABRE O DRAWER LATERAL COM TRECHO DOUTRINÁRIO SOB DEMANDA
   */
  public async openDoctrineDrawer(identifier: string): Promise<void> {
    let drawerBackdrop = document.getElementById('doctrine-drawer-backdrop');
    if (!drawerBackdrop) {
      drawerBackdrop = document.createElement('div');
      drawerBackdrop.id = 'doctrine-drawer-backdrop';
      drawerBackdrop.className = 'doctrine-drawer-backdrop';
      document.body.appendChild(drawerBackdrop);
    }

    let drawer = document.getElementById('doctrine-drawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'doctrine-drawer';
      drawer.className = 'doctrine-drawer';
      document.body.appendChild(drawer);
    }

    drawer.innerHTML = `
      <div style="padding:24px 32px;border-bottom:1px solid rgba(148,116,36,.3);display:flex;align-items:center;justify-content:space-between">
        <div>
          <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#732037">Acervo Dogmático sob Demanda</span>
          <h3 id="drawer-title" style="margin:4px 0 0;font-family:'Instrument Serif',Georgia,serif;font-size:28px;color:#12372A">Carregando doutrina...</h3>
        </div>
        <button type="button" id="close-drawer-btn" style="background:none;border:1px solid rgba(138,107,31,.4);border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#732037;font-size:18px">✕</button>
      </div>
      <div id="drawer-body" style="flex:1;overflow-y:auto;padding:32px;font-size:15px;line-height:1.75;color:#2E4A3D">
        <div style="display:flex;align-items:center;gap:12px;color:#8A6B1F">
          <span class="fl f1" style="width:12px;height:12px;border-radius:50%;background:#C9A961"></span>
          <span>Recuperando excerto dogmático no repositório...</span>
        </div>
      </div>
    `;

    requestAnimationFrame(() => {
      drawerBackdrop?.classList.add('open');
      drawer?.classList.add('open');
    });

    const closeFn = () => {
      drawerBackdrop?.classList.remove('open');
      drawer?.classList.remove('open');
    };
    drawerBackdrop.onclick = closeFn;
    document.getElementById('close-drawer-btn')!.onclick = closeFn;

    try {
      const res = await fetch(`/api/neural/excerpt/${encodeURIComponent(identifier)}`);
      if (res.ok) {
        const data = await res.json();
        document.getElementById('drawer-title')!.textContent = data.titulo || 'Tratado Doutrinário';
        document.getElementById('drawer-body')!.innerHTML = `
          <div style="margin-bottom:20px;padding:16px;background:rgba(209,176,104,.15);border-radius:8px;border-left:3px solid #8A6B1F">
            <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#7A5E18">Ementa Analítica</span>
            <p style="margin:4px 0 0;font-family:'Instrument Serif',Georgia,serif;font-size:20px;line-height:1.35;color:#12372A">${data.ementa_analitica || data.subtitulo || ''}</p>
          </div>
          <div class="prose" style="font-size:15px;line-height:1.75">
            ${(data.conteudo_markdown || '')
              .split('\n\n')
              .map((p: string) => `<p style="margin-bottom:14px">${p.replace(/^#+\s*/, '')}</p>`)
              .join('')}
          </div>
        `;
        return;
      }
    } catch {
      // Ignora erro
    }

    // Fallback estruturado dinâmico estritamente alinhado à disciplina ativa
    const currentDossier = Object.values(TOPIC_DOSSIERS).find(d => d.themeId === identifier || d.id === identifier);
    const disc = NODUS_DISCIPLINES.find(d => d.id === this.currentDisciplineId) || NODUS_DISCIPLINES[0];

    document.getElementById('drawer-title')!.textContent = currentDossier
      ? `${currentDossier.title} ${currentDossier.titleItalicWord}`
      : `Tratado Dogmático — Direito ${disc.name}`;
    document.getElementById('drawer-body')!.innerHTML = `
      <div style="margin-bottom:20px;padding:16px;background:rgba(209,176,104,.15);border-radius:8px;border-left:3px solid #8A6B1F">
        <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#7A5E18">Dogmática e Jurisprudência · Direito ${disc.name}</span>
        <p style="margin:4px 0 0;font-family:'Instrument Serif',Georgia,serif;font-size:20px;line-height:1.35;color:#12372A">
          ${currentDossier?.subtitle || `Análise doutrinária e síntese sistemática de Direito ${disc.name}.`}
        </p>
      </div>
      <div class="prose" style="font-size:15px;line-height:1.75">
        ${currentDossier 
          ? currentDossier.requirements.map(r => `<p style="margin-bottom:14px"><strong>Critério ${r.roman}:</strong> ${r.text}</p>`).join('')
          : `<p style="margin-bottom:14px">O acervo doutrinário integral desta matéria encontra-se em consolidação editorial no repositório.</p>`}
      </div>
    `;
  }

  private render(): void {
    let contentHtml = '';

    switch (this.currentLevel) {
      case 'constelacao':
        contentHtml = this.renderConstelacaoBoard();
        break;
      case 'disciplina':
        contentHtml = this.renderDisciplinaBoard();
        break;
      case 'convergencia':
        contentHtml = this.renderConvergenciaBoard();
        break;
      case 'imersao':
        contentHtml = this.renderImersaoBoard();
        break;
    }

    this.container.innerHTML = `
      ${this.renderNavbar()}
      <div id="nodus-main-content">
        ${contentHtml}
      </div>
    `;

    this.attachEventListeners();
  }

  /**
   * NAVBAR DE CONTROLE INSTITUCIONAL
   */
  private renderNavbar(): string {
    const currentDiscNode = NODUS_DISCIPLINES.find(d => d.id === this.currentDisciplineId);
    const isCurrentActive = currentDiscNode?.isImplemented ?? false;

    return `
      <header id="nodus-navbar">
        <div style="display:flex;align-items:center;gap:18px">
          <button type="button" id="brand-logo-btn" style="display:flex;align-items:center;gap:12px;background:none;border:0;cursor:pointer;padding:0">
            <svg width="30" height="30" viewBox="0 0 34 34" aria-hidden="true">
              <line x1="8" y1="24" x2="17" y2="9" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1.2"></line>
              <line x1="17" y1="9" x2="27" y2="22" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1.2"></line>
              <line x1="8" y1="24" x2="27" y2="22" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1.2"></line>
              <circle cx="8" cy="24" r="3.2" fill="#B8923C"></circle>
              <circle cx="17" cy="9" r="3.2" fill="#B8923C"></circle>
              <circle cx="27" cy="22" r="3.2" fill="#B8923C"></circle>
            </svg>
            <div style="display:flex;align-items:baseline;gap:6px">
              <span style="font-family:'Instrument Serif',Georgia,serif;font-size:28px;line-height:1;letter-spacing:.04em;color:#12372A">NOMOS</span>
              <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#8A6B1F">Studio Jurídico</span>
            </div>
          </button>

          <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#4A6A5A;border-left:1px solid rgba(138,107,31,.3);padding-left:14px">
            Pesquisa Neural do Conhecimento
          </span>
        </div>

        <div style="display:flex;align-items:center;gap:12px">
          <div class="nav-mode-pill">
            <button class="mode-btn ${this.currentLevel === 'constelacao' ? 'active' : ''}" data-goto-level="constelacao">1. Constelação</button>
            <button class="mode-btn ${this.currentLevel === 'disciplina' ? 'active' : ''}" data-goto-level="disciplina">2. Disciplina</button>
            <button class="mode-btn ${this.currentLevel === 'convergencia' ? 'active' : ''}" data-goto-level="convergencia" ${!isCurrentActive ? 'style="opacity:.45"' : ''} title="${!isCurrentActive ? 'Disciplina pendente de conteúdo' : 'Pesquisa neural do tema'}">3. Convergência</button>
            <button class="mode-btn ${this.currentLevel === 'imersao' ? 'active' : ''}" data-goto-level="imersao" ${!isCurrentActive ? 'style="opacity:.45"' : ''} title="${!isCurrentActive ? 'Disciplina pendente de conteúdo' : 'Dossiê do instituto'}">4. Dossiê</button>
          </div>
        </div>
      </header>
    `;
  }

  /**
   * PAINEL 1: CONSTELAÇÃO (MACRO DE DISCIPLINAS)
   */
  private renderConstelacaoBoard(): string {
    const publicos = NODUS_DISCIPLINES.filter(d => d.cluster === 'publico');
    const privados = NODUS_DISCIPLINES.filter(d => d.cluster === 'privado');
    const processos = NODUS_DISCIPLINES.filter(d => d.cluster === 'processo');

    const renderNodeBtn = (node: any) => `
      <button type="button" class="nd ${node.id === this.currentDisciplineId ? 'on' : ''}" style="left:${node.x};top:${node.y}" data-open-discipline="${node.id}" title="${node.name}">
        <span class="fl ${node.driftClass}">
          <span class="dot" style="${!node.isImplemented ? 'background:rgba(18,55,42,.35);box-shadow:none' : ''}"></span>
          <span class="lb" style="${!node.isImplemented ? 'color:#5C7367' : ''}">${node.name}</span>
          <span class="cta" style="${!node.isImplemented ? 'background:rgba(115,32,55,.12);color:#732037;border:1px solid rgba(115,32,55,.25)' : ''}">
            ${node.isImplemented ? 'explorar →' : 'pendente'}
          </span>
        </span>
      </button>
    `;

    return `
      <div style="position:relative;min-height:900px;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;background:var(--bg-radial)">

        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;padding:24px 48px">
          <div style="display:flex;align-items:center;gap:14px">
            <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
              <line x1="8" y1="24" x2="17" y2="9" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1"></line>
              <line x1="17" y1="9" x2="27" y2="22" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1"></line>
              <line x1="8" y1="24" x2="27" y2="22" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1"></line>
              <circle cx="8" cy="24" r="3" fill="#B8923C"></circle>
              <circle cx="17" cy="9" r="3" fill="#B8923C"></circle>
              <circle cx="27" cy="22" r="3" fill="#B8923C"></circle>
            </svg>
            <span style="font-family:'Instrument Serif',Georgia,serif;font-size:32px;line-height:1;letter-spacing:.02em">NOMOS</span>
          </div>
          <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#4A6A5A">mapa neural do direito</span>
        </div>

        <div class="stage" style="position:relative;flex:1 1 auto;min-height:700px">

          <!-- Hub Central: Direito Constitucional (Matriz Gravitacional) -->
          <button type="button" class="hub" style="left:50%;top:45%" data-open-discipline="constitucional" title="Clique para explorar a matriz constitucional">
            <span class="fl f3">
              <span class="disc">
                <span style="font-family:'Instrument Serif',Georgia,serif;font-size:30px;line-height:1.02;color:#F3EDDD;padding:0 20px">Direito Constitucional</span>
                <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#E3C677">centro · matriz</span>
              </span>
            </span>
          </button>

          <!-- I. Direito Público -->
          <span class="cl" style="left:24%;top:17%"><b>I</b>Direito público</span>
          ${publicos.map(renderNodeBtn).join('')}

          <!-- II. Direito Privado -->
          <span class="cl" style="left:76%;top:17%"><b>II</b>Direito privado</span>
          ${privados.map(renderNodeBtn).join('')}

          <!-- III. Processo e Garantias -->
          <span class="cl" style="left:50%;top:70%"><b>III</b>Processo e garantias</span>
          ${processos.map(renderNodeBtn).join('')}
        </div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:28px 48px;padding:20px 48px 36px">
          <h1 style="margin:0;max-width:520px;font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:42px;line-height:1.05;letter-spacing:-.005em">
            Estude pelo caminho das <em style="color:#6D1A33;font-style:italic">ideias</em>, não pela ordem das páginas.
          </h1>

          <ol style="margin:0;padding:0;list-style:none;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:32px;flex:1 1 520px;max-width:720px;border-top:1px solid rgba(138,107,31,.6)">
            <li style="padding-top:14px;display:flex;flex-direction:column;gap:6px">
              <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.14em;color:#8A6B1F">01</span>
              <span style="font-family:'Instrument Serif',Georgia,serif;font-size:24px;line-height:1.1">Escolha a disciplina</span>
              <span style="font-size:14px;line-height:1.5;color:#3C5A4C">Matérias ativas se abrem em temas.</span>
            </li>
            <li style="padding-top:14px;display:flex;flex-direction:column;gap:6px">
              <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.14em;color:#8A6B1F">02</span>
              <span style="font-family:'Instrument Serif',Georgia,serif;font-size:24px;line-height:1.1">Escolha o tema</span>
              <span style="font-size:14px;line-height:1.5;color:#3C5A4C">O mapa o traz ao centro.</span>
            </li>
            <li style="padding-top:14px;display:flex;flex-direction:column;gap:6px">
              <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.14em;color:#8A6B1F">03</span>
              <span style="font-family:'Instrument Serif',Georgia,serif;font-size:24px;line-height:1.1">Diga o que quer estudar</span>
              <span style="font-size:14px;line-height:1.5;color:#3C5A4C">A resposta vem estruturada.</span>
            </li>
          </ol>
        </div>

      </div>
    `;
  }

  /**
   * PAINEL 2: DISCIPLINA ABERTA (ÓRBITA DINÂMICA OU TELA PENDENTE)
   */
  private renderDisciplinaBoard(): string {
    const disc = NODUS_DISCIPLINES.find(d => d.id === this.currentDisciplineId) || NODUS_DISCIPLINES[0];
    const discTitle = `Direito ${disc.name}`;
    const themes: ThemeNode[] | undefined = DISCIPLINE_THEMES_MAP[this.currentDisciplineId];

    // SE A DISCIPLINA ESTIVER PENDENTE DE CONTEÚDO (NÃO IMPLEMENTADA):
    // EXIBE TELA DE STATUS PENDENTE SEM CORRELACIONAR COM OUTRA MATÉRIA!
    if (!themes || themes.length === 0) {
      return `
        <div style="position:relative;min-height:900px;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;background:var(--bg-radial)">

          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;padding:24px 48px">
            <div style="display:flex;align-items:center;gap:28px;flex-wrap:wrap">
              <div style="display:flex;align-items:center;gap:14px">
                <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
                  <line x1="8" y1="24" x2="17" y2="9" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1"></line>
                  <line x1="17" y1="9" x2="27" y2="22" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1"></line>
                  <line x1="8" y1="24" x2="27" y2="22" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1"></line>
                  <circle cx="8" cy="24" r="3" fill="#B8923C"></circle>
                  <circle cx="17" cy="9" r="3" fill="#B8923C"></circle>
                  <circle cx="27" cy="22" r="3" fill="#B8923C"></circle>
                </svg>
                <span style="font-family:'Instrument Serif',Georgia,serif;font-size:32px;line-height:1;letter-spacing:.02em">NOMOS</span>
              </div>
              <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#732037">
                Constelação › ${discTitle} · Pendente de Conteúdo
              </span>
            </div>

            <button type="button" class="back" data-retract-to="constelacao">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M10 3 L5 8 L10 13" fill="none" stroke="#6D1A33" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              Retrair à Constelação
            </button>
          </div>

          <div class="stage" style="position:relative;flex:1 1 auto;min-height:700px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;padding:40px 48px;box-sizing:border-box">

            <div class="fl f2" style="position:relative;z-index:2">
              <div style="width:280px;height:280px;border-radius:50%;background:rgba(255,255,255,.8);border:2px dashed rgba(115,32,55,.45);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:26px;text-align:center;box-shadow:0 16px 40px rgba(18,55,42,.06)">
                <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#732037;background:rgba(115,32,55,.1);padding:4px 14px;border-radius:999px;margin-bottom:12px;font-weight:600">
                  Pendente de Conteúdo
                </span>
                <h2 style="margin:0;font-family:'Instrument Serif',Georgia,serif;font-size:36px;line-height:1.05;color:#12372A">
                  ${discTitle}
                </h2>
                <p style="margin:10px 0 0;font-size:13px;line-height:1.45;color:#4A6A5A">
                  Acervo dogmático em curadoria editorial.
                </p>
              </div>
            </div>

            <div style="max-width:580px;text-align:center;position:relative;z-index:2;display:flex;flex-direction:column;gap:18px;align-items:center">
              <p style="margin:0;font-size:16px;line-height:1.65;color:#2E4A3D">
                Os temas, grafos neurais e dossiês de <strong>${discTitle}</strong> ainda não foram indexados no acervo. Esta disciplina permanece em estado pendente, sem correlação artificial com conteúdos de outras matérias.
              </p>
              <button type="button" class="go" data-retract-to="constelacao" style="min-height:44px;padding:0 28px;font-size:12px">
                ← Escolher Uma Disciplina Ativa
              </button>
            </div>

          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;padding:16px 48px 36px">
            <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#732037">
              ${discTitle} · Módulo em Curadoria
            </span>
            <span style="font-size:13px;color:#4A6A5A">
              Disciplinas com acervo ativo no momento: Constitucional, Administrativo, Penal, Tributário e Processo Civil.
            </span>
          </div>

        </div>
      `;
    }

    // DISCIPLINA ATIVA COM TEMAS IMPLEMENTADOS
    return `
      <div style="position:relative;min-height:900px;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;background:var(--bg-radial)">

        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;padding:24px 48px">
          <div style="display:flex;align-items:center;gap:28px;flex-wrap:wrap">
            <div style="display:flex;align-items:center;gap:14px">
              <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
                <line x1="8" y1="24" x2="17" y2="9" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1"></line>
                <line x1="17" y1="9" x2="27" y2="22" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1"></line>
                <line x1="8" y1="24" x2="27" y2="22" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1"></line>
                <circle cx="8" cy="24" r="3" fill="#B8923C"></circle>
                <circle cx="17" cy="9" r="3" fill="#B8923C"></circle>
                <circle cx="27" cy="22" r="3" fill="#B8923C"></circle>
              </svg>
              <span style="font-family:'Instrument Serif',Georgia,serif;font-size:32px;line-height:1;letter-spacing:.02em">NOMOS</span>
            </div>
            <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#4A6A5A">
              Constelação › ${discTitle}
            </span>
          </div>

          <button type="button" class="back" data-retract-to="constelacao">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M10 3 L5 8 L10 13" fill="none" stroke="#6D1A33" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            Retrair
          </button>
        </div>

        <div class="stage" style="position:relative;flex:1 1 auto;min-height:700px">

          <!-- Ramos esmaecidos nas bordas -->
          ${FAINT_PERIPHERAL_NODES.map(f => `
            <div class="faint" aria-hidden="true" style="position:absolute;left:${f.x};top:${f.y};opacity:.35">
              <span class="fl ${f.driftClass}">
                <span style="width:6px;height:6px;border-radius:50%;background:#1F5C41"></span>
                <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;color:#12372A">${f.name}</span>
              </span>
            </div>
          `).join('')}

          <!-- Hub Central da Disciplina Aberta -->
          <div class="hub large" style="left:50%;top:50%;cursor:default">
            <span class="fl f3">
              <span class="disc">
                <span style="font-family:'Instrument Serif',Georgia,serif;font-size:32px;line-height:1.02;color:#F3EDDD;padding:0 22px">${discTitle}</span>
                <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#E3C677">disciplina ativa</span>
              </span>
            </span>
          </div>

          <!-- Órbita dos Temas Dinâmicos -->
          ${themes.map(theme => `
            <button type="button" 
                    class="nd theme-node ${theme.isHighlighted ? 'on' : ''}" 
                    style="left:${theme.x};top:${theme.y}" 
                    data-open-theme="${theme.id}"
                    title="${theme.name}">
              <span class="fl ${theme.driftClass}">
                <span class="dot"></span>
                <span class="lb">${theme.name}</span>
                ${theme.ctaText ? `<span class="cta">${theme.ctaText}</span>` : ''}
              </span>
            </button>
          `).join('')}

        </div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:16px;padding:12px 48px 36px">
          <p style="margin:0;font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#4A6A5A">
            ${discTitle} · ${themes.length} grandes eixos temáticos
          </p>
          <p style="margin:0;max-width:340px;font-size:15px;line-height:1.55;color:#3C5A4C">
            Escolha um tema. Ele é trazido ao centro e o restante do mapa recua.
          </p>
        </div>

      </div>
    `;
  }

  /**
   * PAINEL 3: CONVERGÊNCIA (PESQUISA NEURAL & AUTOCOMPLETE)
   */
  private renderConvergenciaBoard(): string {
    const disc = NODUS_DISCIPLINES.find(d => d.id === this.currentDisciplineId) || NODUS_DISCIPLINES[0];
    const themes = DISCIPLINE_THEMES_MAP[this.currentDisciplineId];

    if (!disc.isImplemented || !themes || themes.length === 0) {
      return this.renderDisciplinaBoard();
    }

    const theme = themes.find(t => t.id === this.currentThemeId) || themes[0];
    const themeName = theme.name;
    const suggestions: SuggestionNode[] = THEME_SUGGESTIONS_MAP[this.currentThemeId] || [];

    return `
      <div style="position:relative;min-height:900px;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;background:var(--bg-radial-focus)">

        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;padding:24px 48px;position:relative;z-index:2">
          <div style="display:flex;align-items:center;gap:28px;flex-wrap:wrap">
            <div style="display:flex;align-items:center;gap:14px">
              <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
                <line x1="8" y1="24" x2="17" y2="9" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1"></line>
                <line x1="17" y1="9" x2="27" y2="22" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1"></line>
                <line x1="8" y1="24" x2="27" y2="22" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1"></line>
                <circle cx="8" cy="24" r="3" fill="#B8923C"></circle>
                <circle cx="17" cy="9" r="3" fill="#B8923C"></circle>
                <circle cx="27" cy="22" r="3" fill="#B8923C"></circle>
              </svg>
              <span style="font-family:'Instrument Serif',Georgia,serif;font-size:32px;line-height:1;letter-spacing:.02em">NOMOS</span>
            </div>
            <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#4A6A5A">
              Constelação › Direito ${disc.name} › ${themeName}
            </span>
          </div>

          <button type="button" class="back" data-retract-to="disciplina">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M10 3 L5 8 L10 13" fill="none" stroke="#6D1A33" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            Retrair
          </button>
        </div>

        <div class="stage" style="position:relative;flex:1 1 auto;min-height:700px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;padding:0 48px 40px;box-sizing:border-box">

          <!-- Sugestões temáticas flutuantes (restritas à disciplina ativa) -->
          ${suggestions.map(s => `
            <button type="button" class="sg" style="left:${s.x};top:${s.y}" data-search-suggestion="${s.query}">
              <span class="fl ${s.driftClass}">
                <span class="dot"></span>
                <span class="lb">${s.name}</span>
              </span>
            </button>
          `).join('')}

          <!-- Núcleo Central Gravitacional -->
          <div class="fl f3" style="position:relative;z-index:1">
            <span class="core" aria-hidden="true">
              <span style="width:14px;height:14px;border-radius:50%;background:#C9A961;box-shadow:0 0 0 5px rgba(201,169,97,.35)"></span>
            </span>
          </div>

          <h1 style="position:relative;z-index:1;margin:0;max-width:880px;text-align:center;font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:68px;line-height:1.02;letter-spacing:-.01em">
            O que você quer estudar hoje em <em style="color:#6D1A33;font-style:italic">${themeName.toLowerCase()}?</em>
          </h1>

          <div style="position:relative;width:100%;max-width:680px;z-index:10">
            <form id="convergence-search-form" class="field" style="position:relative">
              <label for="busca-instituto" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">
                O que você quer estudar em ${themeName}
              </label>
              <input id="busca-instituto" type="text" placeholder="Digite um instituto de Direito ${disc.name}..." autocomplete="off">
              <button type="submit" class="go">
                Pesquisar
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8 H13 M9 4 L13 8 L9 12" fill="none" stroke="#F3EDDD" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>
            </form>
            <div id="neural-autocomplete-dropdown" class="autocomplete-dropdown" style="display:none"></div>
          </div>

          <div id="search-feedback-msg" style="display:none;position:relative;z-index:1;font-size:14px;color:#732037;background:rgba(115,32,55,.08);padding:10px 18px;border-radius:8px;border:1px solid rgba(115,32,55,.2)"></div>

          <p style="position:relative;z-index:1;margin:0;font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#4A6A5A">
            pesquisa neural restrita a Direito ${disc.name}
          </p>

        </div>

      </div>
    `;
  }

  /**
   * PAINEL 4: IMERSÃO (DOSSIÊ ESTRUTURADO DE CONCURSO & LABORATÓRIO DE DECISÕES)
   */
  private renderImersaoBoard(): string {
    const disc = NODUS_DISCIPLINES.find(d => d.id === this.currentDisciplineId) || NODUS_DISCIPLINES[0];
    const dossier: TopicDossier | undefined = TOPIC_DOSSIERS[this.currentTopicId];
    
    // Se a matéria for pendente OU não houver dossiê OU o dossiê for de OUTRA matéria:
    if (!disc.isImplemented || !dossier || dossier.disciplineId !== this.currentDisciplineId) {
      return `
        <div style="position:relative;min-height:900px;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;background:var(--bg-radial)">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;padding:24px 48px">
            <div style="display:flex;align-items:center;gap:28px;flex-wrap:wrap">
              <div style="display:flex;align-items:center;gap:14px">
                <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
                  <line x1="8" y1="24" x2="17" y2="9" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1"></line>
                  <line x1="17" y1="9" x2="27" y2="22" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1"></line>
                  <line x1="8" y1="24" x2="27" y2="22" stroke="#8A6B1F" stroke-opacity=".7" stroke-width="1"></line>
                  <circle cx="8" cy="24" r="3" fill="#B8923C"></circle>
                  <circle cx="17" cy="9" r="3" fill="#B8923C"></circle>
                  <circle cx="27" cy="22" r="3" fill="#B8923C"></circle>
                </svg>
                <span style="font-family:'Instrument Serif',Georgia,serif;font-size:32px;line-height:1;letter-spacing:.02em">NOMOS</span>
              </div>
              <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#4A6A5A">
                Constelação › Direito ${disc.name} · Dossiê
              </span>
            </div>
            <button type="button" class="back" data-retract-to="${disc.isImplemented ? 'disciplina' : 'constelacao'}">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M10 3 L5 8 L10 13" fill="none" stroke="#6D1A33" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              Retrair
            </button>
          </div>

          <div class="stage" style="position:relative;flex:1 1 auto;min-height:700px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;padding:40px 48px;box-sizing:border-box">
            <div class="fl f2" style="position:relative;z-index:2">
              <div style="width:280px;height:280px;border-radius:50%;background:rgba(255,255,255,.8);border:2px dashed rgba(115,32,55,.45);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:26px;text-align:center;box-shadow:0 16px 40px rgba(18,55,42,.06)">
                <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#732037;background:rgba(115,32,55,.1);padding:4px 14px;border-radius:999px;margin-bottom:12px;font-weight:600">
                  Dossiê Pendente
                </span>
                <h2 style="margin:0;font-family:'Instrument Serif',Georgia,serif;font-size:36px;line-height:1.05;color:#12372A">
                  Direito ${disc.name}
                </h2>
                <p style="margin:10px 0 0;font-size:13px;line-height:1.45;color:#4A6A5A">
                  Acervo dogmático em curadoria editorial.
                </p>
              </div>
            </div>

            <div style="max-width:580px;text-align:center;position:relative;z-index:2;display:flex;flex-direction:column;gap:18px;align-items:center">
              <p style="margin:0;font-size:16px;line-height:1.65;color:#2E4A3D">
                ${disc.isImplemented 
                  ? `Os temas de <strong>Direito ${disc.name}</strong> estão ativos, mas o dossiê detalhado deste instituto específico ainda está em redação dogmática.`
                  : `A disciplina <strong>Direito ${disc.name}</strong> permanece pendente de conteúdo nesta versão. Nenhum instituto ou matéria estranha foi correlacionado.`}
              </p>
              <button type="button" class="go" data-retract-to="${disc.isImplemented ? 'disciplina' : 'constelacao'}" style="min-height:44px;padding:0 28px;font-size:12px">
                ${disc.isImplemented ? `← Voltar aos Temas de Direito ${disc.name}` : `← Escolher Uma Disciplina Ativa`}
              </button>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div style="display:flex;flex-wrap:wrap;min-height:1640px;box-sizing:border-box;background:var(--bg-radial-immersion)">

        <!-- Barra Lateral Esquerda: Trilha e Vizinhos no Mapa -->
        <aside style="flex:0 0 288px;box-sizing:border-box;padding:32px 28px;background:rgba(18,55,42,.06);border-right:1px solid rgba(18,55,42,.18);display:flex;flex-direction:column;gap:40px">
          <div style="display:flex;align-items:center;gap:14px">
            <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
              <line x1="8" y1="24" x2="17" y2="9" stroke="#8A6B1F" stroke-opacity=".6" stroke-width="1"></line>
              <line x1="17" y1="9" x2="27" y2="22" stroke="#8A6B1F" stroke-opacity=".6" stroke-width="1"></line>
              <line x1="8" y1="24" x2="27" y2="22" stroke="#8A6B1F" stroke-opacity=".6" stroke-width="1"></line>
              <circle cx="8" cy="24" r="3" fill="#B8923C"></circle>
              <circle cx="17" cy="9" r="3" fill="#B8923C"></circle>
              <circle cx="27" cy="22" r="3" fill="#B8923C"></circle>
            </svg>
            <span style="font-family:'Instrument Serif',Georgia,serif;font-size:32px;line-height:1;letter-spacing:.02em">NOMOS</span>
          </div>

          <!-- Trilha de Retração Interativa -->
          <nav aria-label="Trilha de estudo" style="display:flex;flex-direction:column;gap:14px">
            <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#4A6A5A">
              Trilha · retrair até…
            </span>
            <div style="display:flex;flex-direction:column;gap:2px;padding-left:5px;margin-left:5px;border-left:1px solid rgba(18,55,42,.18)">
              <button class="step" data-retract-to="constelacao" style="margin-left:-11px">
                <span style="width:10px;height:10px;border-radius:50%;background:#2F7A57;border:1px solid #12372A;flex:0 0 auto"></span>
                Constelação
              </button>
              <button class="step" data-retract-to="disciplina" style="margin-left:-11px">
                <span style="width:10px;height:10px;border-radius:50%;background:#6D1A33;border:1px solid #3A0E1C;flex:0 0 auto"></span>
                Direito ${disc.name}
              </button>
              <button class="step" data-retract-to="convergencia" style="margin-left:-11px">
                <span style="width:10px;height:10px;border-radius:50%;background:#6D1A33;border:1px solid #3A0E1C;flex:0 0 auto"></span>
                Pesquisa Neural
              </button>
              <div aria-current="page" style="display:flex;align-items:center;gap:14px;min-height:44px;margin-left:-11px;color:#7A5E18;font-size:15px;font-weight:500">
                <span style="position:relative;width:10px;height:10px;flex:0 0 auto;display:flex;align-items:center;justify-content:center">
                  <span style="width:10px;height:10px;border-radius:50%;background:#C9A961"></span>
                </span>
                ${dossier.title} ${dossier.titleItalicWord}
              </div>
            </div>
          </nav>

          <!-- Vizinhos no Mapa do Grafo (Estritos à mesma disciplina) -->
          <div style="display:flex;flex-direction:column;gap:6px">
            <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#4A6A5A">
              Vizinhos no grafo (${disc.name})
            </span>
            ${dossier.neighbors.map(n => `
              <button type="button" class="nb" data-open-neighbor="${n.id}">
                <i></i>${n.name}
              </button>
            `).join('')}
          </div>
        </aside>

        <!-- Corpo Principal da Leitura e Dossiê -->
        <main style="flex:999 1 640px;min-width:0;box-sizing:border-box;padding:56px 64px 72px;display:flex;flex-direction:column;gap:56px">

          <!-- Cabeçalho do Instituto -->
          <header style="display:flex;flex-direction:column;gap:22px;max-width:960px">
            <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#4A6A5A">
              ${disc.name} › ${dossier.title} ${dossier.titleItalicWord}
            </span>
            <h1 style="margin:0;font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:88px;line-height:.98;letter-spacing:-.015em">
              ${dossier.title} <em style="color:#6D1A33;font-style:italic">${dossier.titleItalicWord}</em>
            </h1>
            <p style="margin:0;font-family:'Instrument Serif',Georgia,serif;font-size:30px;line-height:1.28;color:#2E4A3D;text-wrap:pretty">
              ${dossier.subtitle}
            </p>
            <div style="display:flex;flex-wrap:wrap;gap:10px">
              ${dossier.statuteBadges.map(badge => `
                <span style="display:inline-flex;align-items:center;min-height:32px;padding:0 14px;border:1px solid rgba(138,107,31,.55);border-radius:999px;font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:#7A5E18">
                  ${badge}
                </span>
              `).join('')}
            </div>
          </header>

          <!-- Seção I: Requisitos de Validade (Critérios de Banca) -->
          <section style="display:flex;flex-direction:column;gap:20px" aria-labelledby="h-cabe">
            <h2 id="h-cabe" style="margin:0;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#6D1A33">
              ${dossier.requirementsHeading}
            </h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));gap:16px">
              ${dossier.requirements.map(req => `
                <div style="box-sizing:border-box;padding:24px;border:1px solid rgba(18,55,42,.18);border-radius:14px;background:rgba(255,255,255,.55);display:flex;flex-direction:column;gap:12px">
                  <span style="font-family:'Instrument Serif',Georgia,serif;font-size:40px;line-height:1;color:#7A5E18">${req.roman}</span>
                  <p style="margin:0;font-size:16px;line-height:1.55;color:#2E4A3D">${req.text}</p>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Seção II: Linha do Tempo do Procedimento (Rito Procedimental) -->
          <section style="display:flex;flex-direction:column;gap:20px" aria-labelledby="h-fluxo">
            <h2 id="h-fluxo" style="margin:0;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#6D1A33">
              ${dossier.timelineHeading}
            </h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(170px,100%),1fr));gap:0;border-top:1px solid rgba(138,107,31,.55)">
              ${dossier.timeline.map(step => `
                <div style="padding:20px 18px 0 0;display:flex;flex-direction:column;gap:10px;position:relative">
                  <span style="position:absolute;top:-6px;left:0;width:11px;height:11px;border-radius:50%;background:${step.isFocal ? '#C9A961' : '#6D1A33'};border:1px solid ${step.isFocal ? '#8A6B1F' : '#3A0E1C'};${step.isFocal ? 'box-shadow:0 0 14px 3px rgba(201,169,97,.4)' : ''}"></span>
                  <span style="padding-top:12px;font-family:'Instrument Serif',Georgia,serif;font-size:26px;line-height:1;${step.isFocal ? 'color:#7A5E18' : ''}">${step.title}</span>
                  <p style="margin:0;font-size:14px;line-height:1.5;color:#3C5A4C">${step.description}</p>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Seção III: Como Não Confundir na Prova & Fontes Dogmáticas -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(380px,100%),1fr));gap:24px;align-items:start">

            <!-- Card "Como Não Confundir na Prova" (Bordô nobre) -->
            <section aria-labelledby="h-controv" style="box-sizing:border-box;padding:28px;border-radius:14px;background:rgba(109,26,51,.08);border:1px solid rgba(109,26,51,.35);display:flex;flex-direction:column;gap:16px">
              <h2 id="h-controv" style="margin:0;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#6D1A33">
                ${dossier.controversyHeading}
              </h2>
              <p style="margin:0;font-family:'Instrument Serif',Georgia,serif;font-size:26px;line-height:1.25;text-wrap:pretty">
                ${dossier.controversyStatement}
              </p>
              ${dossier.controversyPositions.map(pos => `
                <p style="margin:0;font-size:15px;line-height:1.55;color:#2E4A3D">${pos}</p>
              `).join('')}
              <p style="margin:0;font-size:14px;line-height:1.55;color:#6D1A33;border-top:1px dashed rgba(109,26,51,.3);padding-top:12px">
                <strong>Atenção prática de concurso:</strong> ${dossier.practicalConsequence}
              </p>
            </section>

            <!-- Card de Fontes Doutrinárias & Jurisprudência -->
            <section aria-labelledby="h-fontes" style="box-sizing:border-box;padding:28px;border-radius:14px;border:1px solid rgba(18,55,42,.18);background:rgba(255,255,255,.55);display:flex;flex-direction:column;gap:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <h2 id="h-fontes" style="margin:0;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#4A6A5A">
                  ${dossier.sourcesHeading}
                </h2>
                <button type="button" class="mode-btn" data-fetch-doctrine="${dossier.themeId}" style="padding:4px 10px;font-size:11px;color:#8A6B1F">
                  📖 Acervo sob Demanda
                </button>
              </div>

              ${dossier.sources.map(src => `
                <button type="button" class="src" data-view-source="${src.id}">
                  <span style="font-size:15px;line-height:1.4">${src.citation}</span>
                  <span class="open">abrir trecho →</span>
                </button>
              `).join('')}

              <button type="button" class="src" data-fetch-doctrine="${dossier.themeId}" style="margin-top:6px;border:1px dashed rgba(138,107,31,.5);background:rgba(209,176,104,.1)">
                <span style="font-size:14px;color:#7A5E18;font-weight:500">Ver Trecho Completo do Tratado Dogmático</span>
                <span class="open" style="color:#7A5E18">abrir gaveta →</span>
              </button>
            </section>

          </div>

          <!-- Seção IV: CTA para o Laboratório de Decisões Práticas -->
          ${dossier.relatedCaseId ? `
            <div class="case-cta-card">
              <div>
                <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#732037">
                  Laboratório de Decisões Jurídicas · Caso Real
                </span>
                <h3 style="margin:6px 0 0;font-family:'Instrument Serif',Georgia,serif;font-size:28px;color:#12372A">
                  Aplique este conhecimento no caso prático
                </h3>
                <p style="margin:4px 0 0;font-size:14px;color:#3C5A4C">
                  Assuma o papel de Parecerista ou Autoridade Julgadora, enfrente o dilema real e avalie suas decisões perante o Tribunal.
                </p>
              </div>
              <button type="button" class="case-cta-btn" data-test-case="${dossier.relatedCaseId}">
                ⚡ Testar no Laboratório de Decisões →
              </button>
            </div>
          ` : ''}

          <!-- Seção V: Perguntas de Aprofundamento -->
          <section style="display:flex;flex-direction:column;gap:14px;padding-top:8px">
            <label for="campo-aprofundar" style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#4A6A5A">
              Aprofundar em ${dossier.title} ${dossier.titleItalicWord}
            </label>
            <form id="deepen-inquiry-form" class="ask">
              <input id="campo-aprofundar" type="text" placeholder="Pergunte algo mais específico sobre este instituto...">
              <button type="submit">Perguntar</button>
            </form>
            <div id="inquiry-response-box" style="display:none;padding:18px 24px;border-radius:12px;background:rgba(255,255,255,.65);border:1px solid rgba(138,107,31,.4);margin-top:10px"></div>
          </section>

        </main>
      </div>
    `;
  }

  /**
   * PAINEL 5: LINGUAGEM VISUAL & DESIGN SYSTEM
  /**
   * MODAL DE LEITURA DAS FONTES DOGMÁTICAS
   */
  private renderModal(): void {
    if (!this.activeModalSource) return;
    const src = this.activeModalSource;

    let backdrop = document.getElementById('nodus-modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'nodus-modal-backdrop';
      backdrop.className = 'modal-backdrop';
      document.body.appendChild(backdrop);
    }

    backdrop.innerHTML = `
      <div class="modal-dialog">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:20px;border-bottom:1px solid rgba(138,107,31,.3);padding-bottom:16px">
          <div>
            <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6D1A33">
              ${src.type === 'lei' ? 'Estatuto Legal' : src.type === 'jurisprudencia' ? 'Precedente Vinculante' : 'Doutrina Clássica'}
            </span>
            <h3 style="margin:4px 0 0;font-family:'Instrument Serif',Georgia,serif;font-size:32px;line-height:1.1;color:#12372A">
              ${src.title}
            </h3>
            <p style="margin:4px 0 0;font-size:13px;color:#4A6A5A">
              ${src.citation}
            </p>
          </div>
          <button type="button" id="close-modal-btn" style="background:none;border:1px solid rgba(138,107,31,.4);border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#6D1A33;font-size:18px;line-height:1">
            ✕
          </button>
        </div>

        <div style="font-size:16px;line-height:1.7;color:#2E4A3D;background:rgba(255,255,255,.65);padding:22px;border-radius:10px;border-left:4px solid #C9A961;margin-bottom:24px">
          ${src.excerpt}
        </div>

        <div style="display:flex;justify-content:flex-end;gap:12px">
          <button type="button" id="copy-citation-btn" class="mode-btn" style="background:rgba(18,55,42,.08);color:#12372A;padding:8px 18px">
            Copiar citação
          </button>
          <button type="button" id="modal-ok-btn" class="go" style="min-height:38px;padding:0 22px;font-size:11px">
            Fechar
          </button>
        </div>
      </div>
    `;

    requestAnimationFrame(() => {
      backdrop?.classList.add('open');
    });

    document.getElementById('close-modal-btn')?.addEventListener('click', () => this.closeModal());
    document.getElementById('modal-ok-btn')?.addEventListener('click', () => this.closeModal());
    document.getElementById('copy-citation-btn')?.addEventListener('click', () => {
      navigator.clipboard.writeText(`${src.citation} - "${src.excerpt}"`);
      const btn = document.getElementById('copy-citation-btn');
      if (btn) btn.textContent = 'Copiado!';
      setTimeout(() => {
        if (btn) btn.textContent = 'Copiar citação';
      }, 2000);
    });

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) this.closeModal();
    });
  }

  /**
   * BINDINGS DE EVENTOS E INTERATIVIDADE
   */
  private attachEventListeners(): void {
    // 1. Logo clica para voltar à Constelação
    document.getElementById('brand-logo-btn')?.addEventListener('click', () => {
      this.setLevel('constelacao');
    });

    // 2. Seletor de Níveis
    document.querySelectorAll<HTMLButtonElement>('[data-goto-level]').forEach(btn => {
      btn.addEventListener('click', () => {
        const level = btn.dataset.gotoLevel as AppLevel;
        if (!level) return;

        const currentDisc = NODUS_DISCIPLINES.find(d => d.id === this.currentDisciplineId);
        if (!currentDisc?.isImplemented && (level === 'convergencia' || level === 'imersao')) {
          this.setLevel('disciplina');
          return;
        }

        this.setLevel(level);
      });
    });

    // 4. Retração
    document.querySelectorAll<HTMLButtonElement>('[data-retract-to]').forEach(btn => {
      btn.addEventListener('click', () => {
        const level = btn.dataset.retractTo as AppLevel;
        if (level) this.setLevel(level);
      });
    });

    // 5. Abertura de Disciplina
    document.querySelectorAll<HTMLButtonElement>('[data-open-discipline]').forEach(btn => {
      btn.addEventListener('click', () => {
        const discId = btn.dataset.openDiscipline;
        if (discId) this.openDiscipline(discId);
      });
    });

    // 6. Abertura de Tema
    document.querySelectorAll<HTMLButtonElement>('[data-open-theme]').forEach(btn => {
      btn.addEventListener('click', () => {
        const themeId = btn.dataset.openTheme;
        if (themeId) this.openTheme(themeId);
      });
    });

    // 7. Pesquisa Neural em Convergência (Form e Autocomplete Estrito à Disciplina Ativa)
    const searchInput = document.getElementById('busca-instituto') as HTMLInputElement | null;
    const dropdown = document.getElementById('neural-autocomplete-dropdown');
    const disc = NODUS_DISCIPLINES.find(d => d.id === this.currentDisciplineId) || NODUS_DISCIPLINES[0];

    if (searchInput && dropdown) {
      searchInput.addEventListener('input', () => {
        const val = searchInput.value.trim().toLowerCase();
        if (val.length < 2) {
          dropdown.style.display = 'none';
          return;
        }

        // Filtra tópicos ESTRITAMENTE da disciplina ativa
        const matchedDossiers = Object.values(TOPIC_DOSSIERS).filter(
          d =>
            d.disciplineId === this.currentDisciplineId &&
            (d.title.toLowerCase().includes(val) ||
              d.titleItalicWord.toLowerCase().includes(val) ||
              d.subtitle.toLowerCase().includes(val) ||
              d.id.toLowerCase().includes(val))
        );

        if (matchedDossiers.length > 0) {
          dropdown.style.display = 'block';
          dropdown.innerHTML = matchedDossiers
            .slice(0, 5)
            .map(
              d => `
            <div class="autocomplete-item" data-ac-topic="${d.id}">
              <div class="ac-title">${d.title} ${d.titleItalicWord}</div>
              <div class="ac-sub">Direito ${disc.name} · ${d.themeId}</div>
            </div>
          `
            )
            .join('');

          dropdown.querySelectorAll<HTMLDivElement>('[data-ac-topic]').forEach(item => {
            item.onclick = () => {
              const topicId = item.dataset.acTopic;
              if (topicId) {
                dropdown.style.display = 'none';
                this.openTopic(topicId);
              }
            };
          });
        } else {
          dropdown.style.display = 'none';
        }
      });
    }

    const searchForm = document.getElementById('convergence-search-form') as HTMLFormElement | null;
    searchForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = document.getElementById('busca-instituto') as HTMLInputElement | null;
      const query = input?.value.trim().toLowerCase() || '';
      const feedbackEl = document.getElementById('search-feedback-msg');

      if (!query) return;

      // Dispara busca neural no backend com disciplina explícita
      try {
        const res = await fetch('/api/neural/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, disciplinaSlug: this.currentDisciplineId })
        });
        if (res.ok) {
          const data = await res.json();
          // Verifica se o nó retornado pertence estritamente à disciplina ativa
          const focalSlug = (data?.focalNode?.disciplina_slug || '').replace(/^direito-/, '');
          const currentDiscNormalized = this.currentDisciplineId.replace(/^direito-/, '');
          const isSameDisc = focalSlug === currentDiscNormalized;

          if (data?.focalNode?.id && isSameDisc) {
            if (TOPIC_DOSSIERS[data.focalNode.id]) {
              this.openTopic(data.focalNode.id);
              return;
            }
            const focal = data.focalNode;
            TOPIC_DOSSIERS[focal.id] = {
              id: focal.id,
              disciplineId: this.currentDisciplineId,
              themeId: focal.theme_slug || this.currentThemeId,
              title: focal.label,
              titleItalicWord: '',
              subtitle: focal.summary,
              statuteBadges: focal.statute_badges || [`Direito ${disc.name}`],
              requirementsHeading: 'Requisitos e Critérios de Validade',
              requirements: focal.criteria || [{ roman: 'I', text: focal.summary }],
              timelineHeading: 'Rito Procedimental',
              timeline: focal.timeline || [{ title: 'Início', description: focal.summary, isFocal: true }],
              controversyHeading: 'Como Não Confundir na Prova',
              controversyStatement: focal.pitfalls?.versus_title || 'Distinção Dogmática em Concursos',
              controversyPositions: [focal.pitfalls?.warning || 'Atenção aos requisitos estritos da lei.'],
              practicalConsequence: focal.pitfalls?.practical_difference || 'Exame detalhado de legalidade.',
              sourcesHeading: 'Teses dos Tribunais Superiores',
              sources: (focal.court_theses || []).map((thesis: string, idx: number) => ({
                id: `src-${focal.id}-${idx}`,
                title: 'Tese Jurisprudencial',
                citation: thesis,
                type: 'jurisprudencia' as const,
                authorOrCourt: 'Tribunais',
                excerpt: thesis
              })),
              neighbors: (data.neighbors || [])
                .filter((nb: any) => {
                  const nbSlug = (nb.node?.disciplina_slug || '').replace(/^direito-/, '');
                  return !nbSlug || nbSlug === currentDiscNormalized;
                })
                .map((nb: any) => ({
                  id: nb.node?.id || focal.id,
                  name: nb.node?.label || 'Instituto Conexo'
                })),
              relatedCaseId: focal.related_case_id
            };
            this.openTopic(focal.id);
            return;
          }
        }
      } catch {
        // Fallback local estrito
      }

      // Busca estrita nos dossiês da MESMA disciplina
      const disciplineDossiers = Object.values(TOPIC_DOSSIERS).filter(d => d.disciplineId === this.currentDisciplineId);
      const matched = disciplineDossiers.find(d => 
        d.title.toLowerCase().includes(query) || 
        d.titleItalicWord.toLowerCase().includes(query) ||
        d.subtitle.toLowerCase().includes(query) ||
        d.id.toLowerCase().includes(query)
      );

      if (matched) {
        if (feedbackEl) feedbackEl.style.display = 'none';
        this.openTopic(matched.id);
      } else {
        // Não encontra nada? Mostra feedback e NUNCA cai em Direito Administrativo!
        if (feedbackEl) {
          feedbackEl.style.display = 'block';
          feedbackEl.textContent = `Nenhum instituto encontrado para "${query}" em Direito ${disc.name}. O conteúdo permanece restrito e isolado nesta matéria.`;
        }
      }
    });

    // 8. Sugestões de Convergência (só aciona tópicos da disciplina atual)
    document.querySelectorAll<HTMLButtonElement>('[data-search-suggestion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = (btn.dataset.searchSuggestion || '').toLowerCase();
        const disciplineDossiers = Object.values(TOPIC_DOSSIERS).filter(d => d.disciplineId === this.currentDisciplineId);
        const matched = disciplineDossiers.find(d => 
          query.includes(d.id.toLowerCase()) || 
          query.includes(d.title.toLowerCase()) || 
          d.title.toLowerCase().includes(query)
        );

        if (matched) {
          this.openTopic(matched.id);
        } else {
          // Preenche campo de busca sem forçar outra matéria
          const input = document.getElementById('busca-instituto') as HTMLInputElement | null;
          if (input) {
            input.value = btn.dataset.searchSuggestion || '';
            input.focus();
          }
        }
      });
    });

    // 9. Vizinhos no Grafo em Imersão
    document.querySelectorAll<HTMLButtonElement>('[data-open-neighbor]').forEach(btn => {
      btn.addEventListener('click', () => {
        const neighborId = btn.dataset.openNeighbor;
        if (neighborId && TOPIC_DOSSIERS[neighborId]) {
          // Só abre se for da mesma disciplina
          if (TOPIC_DOSSIERS[neighborId].disciplineId === this.currentDisciplineId) {
            this.openTopic(neighborId);
          }
        }
      });
    });

    // 10. Abertura de Fontes no Modal
    document.querySelectorAll<HTMLButtonElement>('[data-view-source]').forEach(btn => {
      btn.addEventListener('click', () => {
        const sourceId = btn.dataset.viewSource;
        const currentDossier = TOPIC_DOSSIERS[this.currentTopicId];
        if (currentDossier) {
          const found = currentDossier.sources.find(s => s.id === sourceId);
          if (found) {
            this.openSourceModal(found);
          }
        }
      });
    });

    // 11. Botão "Testar no Laboratório de Decisões"
    document.querySelectorAll<HTMLButtonElement>('[data-test-case]').forEach(btn => {
      btn.addEventListener('click', () => {
        const caseId = btn.dataset.testCase;
        if (caseId) {
          this.openDecisionSimulator(caseId);
        }
      });
    });

    // 12. Botão "Ver Trecho Dogmático sob Demanda"
    document.querySelectorAll<HTMLButtonElement>('[data-fetch-doctrine]').forEach(btn => {
      btn.addEventListener('click', () => {
        const themeOrId = btn.dataset.fetchDoctrine || this.currentTopicId;
        this.openDoctrineDrawer(themeOrId);
      });
    });

    // 13. Pergunta de Aprofundamento em Imersão
    const deepenForm = document.getElementById('deepen-inquiry-form') as HTMLFormElement | null;
    deepenForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('campo-aprofundar') as HTMLInputElement | null;
      const query = input?.value.trim() || '';
      const box = document.getElementById('inquiry-response-box');
      const currentDossier = TOPIC_DOSSIERS[this.currentTopicId];
      const dName = currentDossier ? currentDossier.title : 'este instituto';

      if (box) {
        box.style.display = 'block';
        const statutes = currentDossier?.statuteBadges?.slice(0, 2).join(' e ') || 'normas aplicáveis';
        const coreControversy = currentDossier?.controversyPositions?.[0];
        const positionSummary = coreControversy
          ? ` Destaca-se a orientação segundo a qual: "${coreControversy.slice(0, 140)}...".`
          : '';
        box.innerHTML = `
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#8A6B1F">Síntese Dogmática Direta</span>
          </div>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#12372A">
            Em resposta a <em>"${query || `consulta sobre ${dName}`}"</em>:
            O núcleo dogmático de <strong>${dName}</strong> orienta-se precipuamente com base em <strong>${statutes}</strong>.${positionSummary} A resolução hermenêutica requer balanceamento entre a literalidade das disposições pertinentes e os precedentes vinculantes correlatos.
          </p>
        `;
      }
    });
  }
}

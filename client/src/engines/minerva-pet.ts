import { renderIcon, Eye, X, Sparkles, AlertTriangle, CheckCircle2 } from '../utils/icons';

export type MinervaEmotion = 'idle' | 'scanning' | 'triumph' | 'nullity_alarm' | 'night_vision';

export class MinervaPet {
  private avatarEl: HTMLElement | null = null;
  private bubbleEl: HTMLElement | null = null;
  private backdropEl: HTMLElement | null = null;
  private closeBtnEl: HTMLElement | null = null;
  private bubbleTextEl: HTMLElement | null = null;
  private bubbleSubtextEl: HTMLElement | null = null;
  private nightVisionBtnEl: HTMLElement | null = null;

  private currentEmotion: MinervaEmotion = 'idle';
  private onNightVisionCallback: (() => void) | null = null;
  private resetTimer: number | null = null;

  constructor() {
    // Inicialização no mount()
  }

  public mount(targetContainer: HTMLElement, onNightVision?: () => void): void {
    this.onNightVisionCallback = onNightVision || null;

    targetContainer.innerHTML = `
      <div class="minerva-container" id="minerva-container">
        <!-- BACKDROP DA GAVETA RETRÁTIL -->
        <div class="minerva-drawer-backdrop fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 opacity-0 pointer-events-none transition-opacity duration-300" id="minerva-drawer-backdrop"></div>

        <!-- GAVETA LATERAL RETRÁTIL (SLIDE-OVER DRAWER) -->
        <aside class="minerva-drawer fixed inset-y-0 right-0 w-96 max-w-[90vw] bg-white shadow-2xl border-l border-slate-200 z-50 p-6 flex flex-col transition-transform duration-300 translate-x-full" id="minerva-bubble" aria-label="Consultoria Dogmática Minerva">
          <!-- CABEÇALHO DA GAVETA -->
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span class="text-xs font-bold uppercase tracking-wider text-blue-900">Minerva • Consultoria Dogmática</span>
            </div>
            <button class="minerva-close-btn p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer" id="minerva-close-btn" title="Fechar painel" aria-label="Fechar">
              ${renderIcon(X, { className: 'w-4 h-4' })}
            </button>
          </div>

          <!-- CORPO DA GAVETA -->
          <div class="flex-1 overflow-y-auto py-5 flex flex-col gap-4">
            <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0 shadow-xs" id="minerva-drawer-icon-container">
                ${renderIcon(Sparkles, { className: 'w-5 h-5 text-white' })}
              </div>
              <div>
                <div class="text-xs font-semibold text-slate-900" id="minerva-status-label">Em prontidão consultiva</div>
                <div class="text-[11px] text-slate-400">Orientação analítica de Direito Administrativo</div>
              </div>
            </div>

            <div class="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col gap-2">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Diretriz Técnica</span>
              <div class="text-xs text-slate-700 leading-relaxed" id="minerva-bubble-text">
                Compêndio Doutrinário ativo. Estude as seções com rigor ou consulte o Blueprint Sistêmico para correlacionar os institutos.
              </div>
            </div>

            <div class="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100/80 flex flex-col gap-1.5" id="minerva-subtext-container">
              <span class="text-[10px] font-bold uppercase tracking-wider text-blue-900">Fundamento Dogmático</span>
              <div class="text-xs text-slate-600 leading-relaxed" id="minerva-bubble-subtext">
                A Visão Noturna destaca os fundamentos dogmáticos essenciais para o caso sob análise.
              </div>
            </div>

            <button class="minerva-night-vision-btn w-full py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-blue-900 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer mt-auto shadow-xs" id="minerva-night-vision-btn">
              ${renderIcon(Eye, { className: 'w-4 h-4 text-blue-900' })}
              <span>Ativar Visão Noturna</span>
            </button>
          </div>
        </aside>

        <!-- BOTÃO FLUTUANTE DISCRETO (TRIGGER MINERVA) -->
        <button
          class="minerva-trigger-btn fixed bottom-6 right-6 w-11 h-11 bg-blue-900 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-40 cursor-pointer"
          id="minerva-hud-avatar"
          title="Minerva — Consultoria Dogmática"
          aria-label="Abrir Consultoria Minerva"
        >
          <span class="minerva-trigger-icon" id="minerva-trigger-icon">
            ${renderIcon(Sparkles, { className: 'w-5 h-5 text-white' })}
          </span>
        </button>
      </div>
    `;

    this.avatarEl = document.getElementById('minerva-hud-avatar');
    this.bubbleEl = document.getElementById('minerva-bubble');
    this.backdropEl = document.getElementById('minerva-drawer-backdrop');
    this.closeBtnEl = document.getElementById('minerva-close-btn');
    this.bubbleTextEl = document.getElementById('minerva-bubble-text');
    this.bubbleSubtextEl = document.getElementById('minerva-bubble-subtext');
    this.nightVisionBtnEl = document.getElementById('minerva-night-vision-btn');

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.avatarEl?.addEventListener('click', () => {
      if (this.bubbleEl?.classList.contains('visible')) {
        this.hideBubble();
      } else {
        this.showBubble();
      }
    });

    this.closeBtnEl?.addEventListener('click', () => {
      this.hideBubble();
    });

    this.backdropEl?.addEventListener('click', () => {
      this.hideBubble();
    });

    this.nightVisionBtnEl?.addEventListener('click', e => {
      e.stopPropagation();
      if (this.onNightVisionCallback) {
        this.onNightVisionCallback();
      }
    });
  }

  public setEmotion(
    emotion: MinervaEmotion,
    message: string,
    subMessage?: string,
    autoResetMs: number = 0
  ): void {
    this.currentEmotion = emotion;

    if (this.bubbleTextEl) {
      this.bubbleTextEl.textContent = message;
    }

    if (this.bubbleSubtextEl) {
      this.bubbleSubtextEl.textContent = subMessage || '';
      const subContainer = document.getElementById('minerva-subtext-container');
      if (subContainer) {
        subContainer.style.display = subMessage ? 'flex' : 'none';
      }
    }

    const statusLabel = document.getElementById('minerva-status-label');
    if (statusLabel) {
      const labels: Record<MinervaEmotion, string> = {
        idle: 'Em prontidão para consultoria',
        scanning: 'Analisando institutos dogmáticos...',
        triumph: 'Solução jurídica validada com precisão!',
        nullity_alarm: 'Alerta: vício insanável de legalidade detectado!',
        night_vision: 'Visão Noturna ativa: teses e normas em destaque'
      };
      statusLabel.textContent = labels[emotion] || labels.idle;
    }

    const triggerIconEl = document.getElementById('minerva-trigger-icon');
    const drawerIconEl = document.getElementById('minerva-drawer-icon-container');

    if (triggerIconEl) {
      if (emotion === 'triumph') {
        triggerIconEl.innerHTML = renderIcon(CheckCircle2, { className: 'w-5 h-5 text-white' });
      } else if (emotion === 'nullity_alarm') {
        triggerIconEl.innerHTML = renderIcon(AlertTriangle, { className: 'w-5 h-5 text-white' });
      } else if (emotion === 'night_vision') {
        triggerIconEl.innerHTML = renderIcon(Eye, { className: 'w-5 h-5 text-white' });
      } else {
        triggerIconEl.innerHTML = renderIcon(Sparkles, { className: 'w-5 h-5 text-white' });
      }
    }

    if (drawerIconEl) {
      if (emotion === 'triumph') {
        drawerIconEl.className =
          'w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs';
        drawerIconEl.innerHTML = renderIcon(CheckCircle2, { className: 'w-5 h-5 text-white' });
      } else if (emotion === 'nullity_alarm') {
        drawerIconEl.className =
          'w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs';
        drawerIconEl.innerHTML = renderIcon(AlertTriangle, { className: 'w-5 h-5 text-white' });
      } else if (emotion === 'night_vision') {
        drawerIconEl.className =
          'w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0 shadow-xs';
        drawerIconEl.innerHTML = renderIcon(Eye, { className: 'w-5 h-5 text-white' });
      } else {
        drawerIconEl.className =
          'w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0 shadow-xs';
        drawerIconEl.innerHTML = renderIcon(Sparkles, { className: 'w-5 h-5 text-white' });
      }
    }

    if (this.resetTimer) {
      window.clearTimeout(this.resetTimer);
      this.resetTimer = null;
    }

    if (autoResetMs > 0) {
      this.resetTimer = window.setTimeout(() => {
        this.setEmotion('idle', 'Consultoria Dogmática em prontidão para novas análises.');
      }, autoResetMs);
    }
  }

  public showBubble(): void {
    if (this.bubbleEl) {
      this.bubbleEl.classList.remove('translate-x-full');
      this.bubbleEl.classList.add('translate-x-0', 'visible');
    }
    if (this.backdropEl) {
      this.backdropEl.classList.remove('opacity-0', 'pointer-events-none');
      this.backdropEl.classList.add('opacity-100', 'pointer-events-auto');
    }
  }

  public hideBubble(): void {
    if (this.bubbleEl) {
      this.bubbleEl.classList.remove('translate-x-0', 'visible');
      this.bubbleEl.classList.add('translate-x-full');
    }
    if (this.backdropEl) {
      this.backdropEl.classList.remove('opacity-100', 'pointer-events-auto');
      this.backdropEl.classList.add('opacity-0', 'pointer-events-none');
    }
  }

  public showBubbleBriefly(durationMs: number = 5000): void {
    this.showBubble();
    window.setTimeout(() => {
      if (this.currentEmotion === 'idle') {
        this.hideBubble();
      }
    }, durationMs);
  }

  public setNightVisionCallback(cb: () => void): void {
    this.onNightVisionCallback = cb;
  }
}

export const minervaPet = new MinervaPet();

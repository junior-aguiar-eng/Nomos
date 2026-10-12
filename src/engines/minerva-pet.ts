export type MinervaEmotion = 'idle' | 'scanning' | 'triumph' | 'nullity_alarm' | 'night_vision';

export class MinervaPet {
  private avatarEl: HTMLElement | null = null;
  private bubbleEl: HTMLElement | null = null;
  private backdropEl: HTMLElement | null = null;
  private closeBtnEl: HTMLElement | null = null;
  private bubbleTextEl: HTMLElement | null = null;
  private bubbleSubtextEl: HTMLElement | null = null;
  private nightVisionBtnEl: HTMLElement | null = null;
  private leftPupilEl: SVGElement | null = null;
  private rightPupilEl: SVGElement | null = null;

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
        <div class="minerva-drawer-backdrop" id="minerva-drawer-backdrop"></div>

        <!-- PAINEL RETRÁTIL / GAVETA LATERAL À DIREITA -->
        <aside class="minerva-drawer" id="minerva-bubble" aria-label="Consultoria Dogmática Minerva">
          <div class="minerva-drawer-header">
            <div class="minerva-name-tag">
              <span class="minerva-status-dot"></span> Minerva • Consultoria Dogmática
            </div>
            <button class="minerva-close-btn" id="minerva-close-btn" title="Fechar painel" aria-label="Fechar">
              ✕
            </button>
          </div>

          <div class="minerva-drawer-body">
            <div class="minerva-drawer-emblem-area">
              <div class="minerva-drawer-seal">
                <svg class="minerva-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="30,8 70,8 92,30 92,70 70,92 30,92 8,70 8,30" stroke="var(--border-subtle)" stroke-width="2" fill="var(--bg-secondary)"/>
                  <path d="M50 18C36 18 28 28 28 48C28 68 38 82 50 82C62 82 72 68 72 48C72 28 64 18 50 18Z" stroke="var(--accent-primary)" stroke-width="2" fill="none"/>
                  <polyline points="28,26 20,14 36,20" stroke="var(--accent-primary)" stroke-width="2" fill="none"/>
                  <polyline points="72,26 80,14 64,20" stroke="var(--accent-primary)" stroke-width="2" fill="none"/>
                  <circle cx="39" cy="40" r="10" stroke="var(--accent-secondary)" stroke-width="1.5" fill="var(--bg-primary)"/>
                  <circle id="minerva-pupil-left" class="minerva-pupil" cx="39" cy="40" r="3.5" fill="var(--accent-primary)"/>
                  <circle cx="61" cy="40" r="10" stroke="var(--accent-secondary)" stroke-width="1.5" fill="var(--bg-primary)"/>
                  <circle id="minerva-pupil-right" class="minerva-pupil" cx="61" cy="40" r="3.5" fill="var(--accent-primary)"/>
                  <polygon points="50,44 46,54 54,54" stroke="var(--accent-primary)" stroke-width="1.5" fill="none"/>
                  <line x1="36" y1="64" x2="64" y2="64" stroke="var(--accent-secondary)" stroke-width="1.5"/>
                  <line x1="50" y1="60" x2="50" y2="76" stroke="var(--accent-secondary)" stroke-width="1.5"/>
                  <line x1="42" y1="76" x2="58" y2="76" stroke="var(--accent-secondary)" stroke-width="1.5"/>
                </svg>
              </div>
              <div class="minerva-drawer-status-label" id="minerva-status-label">
                Em prontidão para consultoria dogmática
              </div>
            </div>

            <div class="minerva-bubble-text" id="minerva-bubble-text">
              Compêndio Doutrinário ativo. Estude as seções com rigor ou consulte o Blueprint Sistêmico para correlacionar os institutos.
            </div>

            <div class="minerva-bubble-subtext" id="minerva-bubble-subtext">
              A Visão Noturna destaca os fundamentos dogmáticos essenciais para o caso sob análise.
            </div>

            <button class="minerva-night-vision-btn" id="minerva-night-vision-btn">
              👁️ Ativar Visão Noturna
            </button>
          </div>
        </aside>

        <!-- BOTÃO DISCRETO DE ATIVAÇÃO NO CANTO INFERIOR DIREITO -->
        <button
          class="minerva-trigger-btn emotion-idle"
          id="minerva-hud-avatar"
          title="Minerva — Consultoria Dogmática"
          aria-label="Abrir Consultoria Minerva"
        >
          <span class="minerva-trigger-icon">🏛️</span>
          <span class="minerva-trigger-label">Minerva</span>
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
    this.leftPupilEl = document.getElementById('minerva-pupil-left') as unknown as SVGElement;
    this.rightPupilEl = document.getElementById('minerva-pupil-right') as unknown as SVGElement;

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    window.addEventListener('mousemove', (e: MouseEvent) => {
      this.updateEyesLookingAt(e.clientX, e.clientY);
    });

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

  private updateEyesLookingAt(mouseX: number, mouseY: number): void {
    if (!this.avatarEl || !this.leftPupilEl || !this.rightPupilEl) return;

    const rect = this.avatarEl.getBoundingClientRect();
    const avatarCenterX = rect.left + rect.width / 2;
    const avatarCenterY = rect.top + rect.height / 2;

    const dx = mouseX - avatarCenterX;
    const dy = mouseY - avatarCenterY;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(2.5, Math.hypot(dx, dy) / 50);

    const pupilOffsetX = Math.cos(angle) * distance;
    const pupilOffsetY = Math.sin(angle) * distance;

    this.leftPupilEl.setAttribute('transform', `translate(${pupilOffsetX}, ${pupilOffsetY})`);
    this.rightPupilEl.setAttribute('transform', `translate(${pupilOffsetX}, ${pupilOffsetY})`);
  }

  public setEmotion(
    emotion: MinervaEmotion,
    message: string,
    subMessage?: string,
    autoResetMs: number = 0
  ): void {
    this.currentEmotion = emotion;

    if (this.avatarEl) {
      this.avatarEl.className = `minerva-trigger-btn emotion-${emotion}`;
    }

    if (this.bubbleTextEl) {
      this.bubbleTextEl.textContent = message;
    }

    if (this.bubbleSubtextEl) {
      this.bubbleSubtextEl.textContent = subMessage || '';
      this.bubbleSubtextEl.style.display = subMessage ? 'block' : 'none';
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
    this.bubbleEl?.classList.add('visible');
    this.backdropEl?.classList.add('visible');
  }

  public hideBubble(): void {
    this.bubbleEl?.classList.remove('visible');
    this.backdropEl?.classList.remove('visible');
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

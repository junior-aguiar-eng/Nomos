import { UserProgressState, CaseResolutionRecord, PublicRank, AxisId } from '../types/nomos';
import { PRACTICAL_AXES } from '../data/axes';
import { PRACTICE_CASES_DATA } from '../data/practice-cases';

const STORAGE_KEY = 'nomos_studio_state_v1';

export class StateManager {
  private state: UserProgressState;
  private listeners: Array<(state: UserProgressState) => void> = [];

  constructor() {
    this.state = this.loadState();
  }

  private getDefaultState(): UserProgressState {
    const initialScores: Record<
      AxisId,
      { resolvedCount: number; totalCount: number; accuracyPercentage: number }
    > = {
      'axis-1': { resolvedCount: 0, totalCount: 2, accuracyPercentage: 0 },
      'axis-2': { resolvedCount: 0, totalCount: 2, accuracyPercentage: 0 },
      'axis-3': { resolvedCount: 0, totalCount: 2, accuracyPercentage: 0 },
      'axis-4': { resolvedCount: 0, totalCount: 2, accuracyPercentage: 0 }
    };

    return {
      currentUniverse: 'administrativo',
      currentRank: 'Estagiário de Direito',
      totalXp: 0,
      axisScores: initialScores,
      resolutions: [],
      bookmarkedConceptIds: [],
      theme: 'crystal-light',
      soundEnabled: true
    };
  }

  private loadState(): UserProgressState {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return { ...this.getDefaultState(), ...JSON.parse(data) };
      }
    } catch (e) {
      console.warn('Erro ao carregar estado do LocalStorage:', e);
    }
    return this.getDefaultState();
  }

  private saveState(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      this.notifyListeners();
    } catch (e) {
      console.warn('Erro ao salvar estado no LocalStorage:', e);
    }
  }

  public subscribe(listener: (state: UserProgressState) => void): () => void {
    this.listeners.push(listener);
    listener(this.state);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state));
  }

  public getState(): UserProgressState {
    return { ...this.state };
  }

  public toggleTheme(): void {
    this.state.theme = this.state.theme === 'crystal-light' ? 'deep-cyber-dark' : 'crystal-light';
    this.saveState();
  }

  public setTheme(theme: 'crystal-light' | 'deep-cyber-dark'): void {
    this.state.theme = theme;
    this.saveState();
  }

  public toggleBookmark(conceptId: string): void {
    if (this.state.bookmarkedConceptIds.includes(conceptId)) {
      this.state.bookmarkedConceptIds = this.state.bookmarkedConceptIds.filter(
        id => id !== conceptId
      );
    } else {
      this.state.bookmarkedConceptIds.push(conceptId);
    }
    this.saveState();
  }

  public recordCaseResolution(record: CaseResolutionRecord): void {
    // Substitui se já existia resolução para o mesmo caso ou adiciona novo
    const existingIdx = this.state.resolutions.findIndex(r => r.caseId === record.caseId);
    if (existingIdx >= 0) {
      this.state.resolutions[existingIdx] = record;
    } else {
      this.state.resolutions.push(record);
    }

    // Recalcula XP total
    this.state.totalXp = this.state.resolutions.reduce((acc, r) => acc + r.xpEarned, 0);

    // Atualiza Rank da Carreira
    this.state.currentRank = this.calculateRank(this.state.totalXp);

    // Recalcula scores por Eixo
    PRACTICAL_AXES.forEach(axis => {
      const axisCases = PRACTICE_CASES_DATA.filter(c => c.axisId === axis.id);
      const axisResolutions = this.state.resolutions.filter(r => r.axisId === axis.id);
      const successes = axisResolutions.filter(r => r.success).length;

      this.state.axisScores[axis.id] = {
        resolvedCount: axisResolutions.length,
        totalCount: axisCases.length,
        accuracyPercentage:
          axisResolutions.length > 0 ? Math.round((successes / axisResolutions.length) * 100) : 0
      };
    });

    this.saveState();
  }

  public calculateRank(xp: number): PublicRank {
    if (xp >= 1000) return 'Conselheiro / Magistrado';
    if (xp >= 550) return 'Procurador do Estado';
    if (xp >= 220) return 'Assessor Jurídico';
    return 'Estagiário de Direito';
  }

  public getNextRankThreshold(): { nextRank: string; targetXp: number; remainingXp: number } {
    const xp = this.state.totalXp;
    if (xp < 220) return { nextRank: 'Assessor Jurídico', targetXp: 220, remainingXp: 220 - xp };
    if (xp < 550) return { nextRank: 'Procurador do Estado', targetXp: 550, remainingXp: 550 - xp };
    if (xp < 1000)
      return { nextRank: 'Conselheiro / Magistrado', targetXp: 1000, remainingXp: 1000 - xp };
    return { nextRank: 'Topo da Carreira', targetXp: 1000, remainingXp: 0 };
  }

  public generateMarkdownDossier(): string {
    const dateStr = new Date().toLocaleDateString('pt-BR');
    let md = `# NOMOS — Studio Jurídico: Dossiê de Carreira & Caderno de Erros\n`;
    md += `*Gerado em: ${dateStr}*\n\n`;
    md += `## 1. Sumário Executivo de Desempenho\n`;
    md += `- **Cargo Atual**: ${this.state.currentRank}\n`;
    md += `- **Reputação Doutrinária (XP)**: ${this.state.totalXp} XP\n`;
    md += `- **Casos Concluídos**: ${this.state.resolutions.length} de ${PRACTICE_CASES_DATA.length}\n\n`;

    md += `## 2. Precisão por Macro-Eixo Prático\n`;
    PRACTICAL_AXES.forEach(axis => {
      const stats = this.state.axisScores[axis.id];
      md += `- **[Eixo ${axis.number}] ${axis.title}**: ${stats.accuracyPercentage}% de precisão (${stats.resolvedCount}/${stats.totalCount} casos)\n`;
    });
    md += `\n`;

    md += `## 3. Caderno de Tropeços & Lições Doutrinárias\n`;
    const failures = this.state.resolutions.filter(r => !r.success);
    if (failures.length === 0) {
      md += `*Nenhum vício ou tropeço registrado até o momento. Excelente precisão técnica!*\n\n`;
    } else {
      failures.forEach((f, idx) => {
        const c = PRACTICE_CASES_DATA.find(cs => cs.id === f.caseId);
        md += `### ${idx + 1}. [${c?.caseNumber || f.caseId}] ${c?.title || 'Caso Prático'}\n`;
        md += `- **Papel**: ${c?.assignedRole || 'Público'}\n`;
        md += `- **Veredito**: ${f.verdictTitle}\n`;
        md += `- **Fundamentação Técnica**: ${f.technicalFeedback}\n\n`;
      });
    }

    md += `## 4. Casos Solucionados com Rigor Técnico\n`;
    const successes = this.state.resolutions.filter(r => r.success);
    successes.forEach((s, idx) => {
      const c = PRACTICE_CASES_DATA.find(cs => cs.id === s.caseId);
      md += `### ${idx + 1}. [${c?.caseNumber || s.caseId}] ${c?.title || 'Caso Prático'}\n`;
      md += `- **Veredito**: ${s.verdictTitle}\n`;
      md += `- **Síntese Técnica**: ${s.technicalFeedback}\n\n`;
    });

    return md;
  }
}

export const stateManager = new StateManager();

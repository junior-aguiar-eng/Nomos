export interface DoctrineSection {
  id: string;
  number: string;
  title: string;
  content: string[];
  keyTheses?: string[];
  statutoryBasis?: string[];
}

export interface DoctrineTopic {
  id: string;
  number: number;
  axisId: 'axis-1' | 'axis-2' | 'axis-3' | 'axis-4';
  title: string;
  subtitle: string;
  analyticalEmenta: string;
  readingTimeMinutes: number;
  conteudoMarkdown?: string;
  sections?: DoctrineSection[];
  relatedCaseId?: string;
  relatedConceptId?: string;
}

// Arquivo esvaziado de livros doutrinários estáticos para garantir bundle frontend ultraleve (< 500 KB).
// Os dados agora são ingeridos via PostgreSQL e servidos assincronamente sob demanda pela API REST (/api/temas).
export const DOCTRINE_LIBRARY_DATA: DoctrineTopic[] = [];

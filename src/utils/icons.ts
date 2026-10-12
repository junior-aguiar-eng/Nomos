import type { IconNode } from 'lucide';
import {
  Shield,
  TrendingUp,
  Scale,
  BookOpen,
  ClipboardList,
  GraduationCap,
  Briefcase,
  Landmark,
  Download,
  Printer,
  Eye,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Check,
  X,
  Sparkles,
  Layers,
  FileCheck,
  FileText,
  HelpCircle,
  Award,
  Sun,
  Moon,
  Settings,
  Star,
  Bookmark
} from 'lucide';

export interface IconOptions {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export function renderIcon(icon: IconNode, options: IconOptions = {}): string {
  const { className = 'w-4 h-4', size = 16, strokeWidth = 2 } = options;
  const children = icon
    .map(([tag, attrs]) => {
      const attrStr = Object.entries(attrs)
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
      return `<${tag} ${attrStr}></${tag}>`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="${className}">${children}</svg>`;
}

export function getRankIcon(rank: string, className = 'w-5 h-5'): string {
  switch (rank) {
    case 'Estagiário de Direito':
      return renderIcon(GraduationCap, { className });
    case 'Assessor Jurídico':
      return renderIcon(Briefcase, { className });
    case 'Procurador do Estado':
      return renderIcon(Landmark, { className });
    case 'Conselheiro / Magistrado':
      return renderIcon(Scale, { className });
    default:
      return renderIcon(Award, { className });
  }
}

export function getAxisIcon(axisId: string, className = 'w-4 h-4'): string {
  switch (axisId) {
    case 'axis-1':
      return renderIcon(Layers, { className });
    case 'axis-2':
      return renderIcon(Shield, { className });
    case 'axis-3':
      return renderIcon(TrendingUp, { className });
    case 'axis-4':
      return renderIcon(Scale, { className });
    default:
      return renderIcon(FileText, { className });
  }
}

export {
  Shield,
  TrendingUp,
  Scale,
  BookOpen,
  ClipboardList,
  GraduationCap,
  Briefcase,
  Landmark,
  Download,
  Printer,
  Eye,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Check,
  X,
  Sparkles,
  Layers,
  FileCheck,
  FileText,
  HelpCircle,
  Award,
  Sun,
  Moon,
  Settings,
  Star,
  Bookmark
};

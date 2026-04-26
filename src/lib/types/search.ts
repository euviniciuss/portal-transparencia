export type CategoryType = 'saude' | 'educacao' | 'servidores' | 'contratos' | 'obras' | 'transferencias' | 'dados-abertos' | 'seguranca' | 'receitas';

export interface ExpenseDetail {
  id: string;
  recipient: string;
  amount: number;
  date: string; // ISO format YYYY-MM-DD
  year: number;
  month: number;
  description: string;
  category: CategoryType;
  subCategory?: string;
  status: 'empenhado' | 'liquidado' | 'pago' | 'cancelado';
}

export interface CategoryInsights {
  title: string;
  mainValue: number;
  statusText: string;
  representationPercent: number;
  perCapitaImpact: number;
  annualVariation: number;
  distributionTitle: string;
  distribution: {
    label: string;
    amount: number;
  }[];
}

export interface CategorySummary {
  type: CategoryType | 'global';
  title: string;
  description: string;
  icon: string;
  insights?: CategoryInsights;
  totalAmount?: number;
  count?: number;
}

export interface SearchResult {
  query: string;
  category?: CategoryType;
  totalResults: number;
  items: ExpenseDetail[];
}

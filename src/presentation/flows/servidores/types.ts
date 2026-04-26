import { ServantDetail, SalaryCompositionData, SalaryHistoryEntry } from '@lib/types/servants';

export interface ServantSearchFormProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  defaultValue?: string;
}

export interface ServantCardProps {
  servant: ServantDetail;
  defaultExpanded?: boolean;
}

export interface SalaryCompositionProps {
  salary: SalaryCompositionData;
}

export interface SalaryHistoryChartProps {
  history: SalaryHistoryEntry[];
}

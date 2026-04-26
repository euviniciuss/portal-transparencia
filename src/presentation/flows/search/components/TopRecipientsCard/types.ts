import { ExpenseDetail, CategorySummary } from '@lib/types/search';

export interface TopRecipientsCardProps {
  data: ExpenseDetail[];
  activeCategory?: CategorySummary;
}

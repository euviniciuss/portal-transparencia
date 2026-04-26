/** Employment bond type for a public servant */
export type EmploymentType = 'efetivo' | 'comissionado' | 'temporario';

/** A single month's salary record */
export interface SalaryHistoryEntry {
  month: number;
  year: number;
  grossSalary: number;
  netSalary: number;
}

/** Breakdown of a salary into components */
export interface SalaryCompositionData {
  baseSalary: number;
  gratuities: number;
  discounts: number;
}

/** Full public servant detail */
export interface ServantDetail {
  id: string;
  name: string;
  position: string;
  level: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  salary: SalaryCompositionData;
  netSalary: number;
  history: SalaryHistoryEntry[];
}

/** Form values for servant search */
export interface ServantSearchFormValues {
  query: string;
}

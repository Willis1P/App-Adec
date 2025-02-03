export interface Transaction {
  id: string;
  type: 'TITHE' | 'OFFERING' | 'EXPENSE' | 'INCOME';
  amount: number;
  date: Date;
  memberId?: string;
  department?: string;
  description: string;
}

export interface FinancialReport {
  totalTithes: number;
  totalOfferings: number;
  totalExpenses: number;
  totalIncome: number;
  balance: number;
  transactions: Transaction[];
}
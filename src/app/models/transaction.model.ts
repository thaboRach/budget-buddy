export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'Income' | 'Expense';
  amount: number;
  notes?: string;
}

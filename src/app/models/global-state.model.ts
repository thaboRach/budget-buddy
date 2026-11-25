import { Transaction } from './transaction.model';

export interface GlobalState {
  transactions: Transaction[];
}

import { Service, inject } from '@angular/core';
import { HttpService } from '../http-service/http-service';
import type { Transaction } from '../../../models/transaction.model';

@Service()
export class TransactionsService {
  private readonly httpService = inject(HttpService);

  getAllTransactions() {
    return this.httpService.get<Transaction[]>('/transactions');
  }

  submitTransaction(transaction: Omit<Transaction, 'id'>) {
    return this.httpService.post<Omit<Transaction, 'id'>>('/transactions', transaction);
  }

  updateTransaction(transaction: Transaction) {
    return this.httpService.put<Transaction>(`/transactions/${transaction.id}`, transaction);
  }
}

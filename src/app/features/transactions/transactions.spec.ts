import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { Transaction } from '../../models/transaction.model';
import { TransactionsService } from '../../shared/services/transactions/transactions-service';
import { Transactions } from './transactions';

describe('Transactions', () => {
  let component: Transactions;
  const updateTransaction = vi.fn((transaction: Transaction) => of(transaction));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TransactionsService,
          useValue: {
            getAllTransactions: () => of([]),
            updateTransaction,
          },
        },
      ],
    });

    updateTransaction.mockClear();
    component = TestBed.runInInjectionContext(() => new Transactions());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates the transaction when an inline row edit is committed', () => {
    const transaction: Transaction = {
      id: '1',
      date: '2026-06-01',
      description: 'Groceries',
      category: 'Food',
      type: 'Expense',
      amount: 25,
    };

    component.onTransactionChanged(transaction);

    expect(updateTransaction).toHaveBeenCalledWith(transaction);
  });
});

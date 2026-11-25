import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Transaction } from '../../models/transaction.model';
import { Table } from '../../shared/components/table/table';
import { ColumnConfiguration, GridEditingConfiguration } from 'apex-grid';
import { TransactionsService } from '../../shared/services/transactions/transactions-service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [Table, RouterLink],
  selector: 'app-transactions',
  styleUrl: './transactions.scss',
  templateUrl: './transactions.html',
})
export class Transactions {
  private readonly transactionsService = inject(TransactionsService);

  readonly transactions = toSignal(this.transactionsService.getAllTransactions(), {
    initialValue: [] as Transaction[],
  });

  readonly saveError = signal<string | null>(null);

  columns: ColumnConfiguration<Transaction>[] = [
    { key: 'id', headerText: 'ID', type: 'string' },
    { key: 'date', headerText: 'Date', type: 'date', editable: true },
    { key: 'description', headerText: 'Description', type: 'string', editable: true },
    { key: 'category', headerText: 'Category', type: 'string', editable: true },
    {
      key: 'type',
      headerText: 'Type',
      editable: true,
      type: 'select',
      options: ['Income', 'Expense'],
    },
    {
      key: 'amount',
      headerText: 'Amount',
      type: 'currency',
      editable: true,
      currency: 'ZAR',
      locale: 'en-ZA',
    },
    { key: 'notes', headerText: 'Notes', editable: true },
  ];

  editingConfig: GridEditingConfiguration = {
    enabled: true,
    mode: 'row',
    trigger: 'click',
  };

  onTransactionChanged(transaction: Transaction): void {
    this.saveError.set(null);
    this.transactionsService.updateTransaction(transaction).subscribe({
      error: (error: unknown) => {
        console.error('Failed to update transaction', error);
        this.saveError.set('Unable to save this transaction. Please try again.');
      },
    });
  }
}

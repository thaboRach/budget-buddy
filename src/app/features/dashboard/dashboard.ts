import { Component, computed, inject } from '@angular/core';
import { TransactionsService } from '../../shared/services/transactions/transactions-service';
import { InfoCard } from '../../shared/components/info-card/info-card';
import { DonutChart } from '../../shared/components/donut-chart/donut-chart';
import { Transaction } from '../../models/transaction.model';
import { Table } from '../../shared/components/table/table';
import { ColumnConfiguration } from 'apex-grid';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [InfoCard, DonutChart, Table],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  firstName: string = 'Test';
  private readonly transactionsService = inject(TransactionsService);

  readonly transactions = toSignal(this.transactionsService.getAllTransactions(), {
    initialValue: [] as Transaction[],
  });

  topTransactions = computed(() => this.transactions().slice(0, 5));

  totalIncome = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'Income')
      .reduce((total, t) => total + t.amount, 0),
  );

  totalExpenses = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'Expense')
      .reduce((total, t) => total + t.amount, 0),
  );

  balance = computed(() => this.totalIncome() - this.totalExpenses());

  quickViewItems = computed(() => [
    {
      title: 'Total Income',
      value: this.totalIncome(),
    },
    {
      title: 'Total Expenses',
      value: this.totalExpenses(),
    },
    {
      title: 'Balance',
      value: this.balance(),
    },
  ]);

  categorySpending = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'Expense')
      .reduce(
        (acc, t) => {
          const existing = acc.find((item) => item.category === t.category);
          if (existing) {
            existing.amount += t.amount;
          } else {
            acc.push({ category: t.category, amount: t.amount });
          }
          return acc;
        },
        [] as { category: string; amount: number }[],
      ),
  );

  categoryLabels = computed(() => [
    ...new Set(this.categorySpending().map(({ category }) => category)),
  ]);
  categoryAmounts = computed(() =>
    this.categoryLabels().map((category) =>
      this.categorySpending()
        .filter((item) => item.category === category)
        .reduce((total, item) => total + item.amount, 0),
    ),
  );

  tableColumns: ColumnConfiguration<Transaction>[] = [
    { key: 'id', headerText: 'ID', type: 'string' },
    { key: 'date', headerText: 'Date', type: 'string' },
    { key: 'description', headerText: 'Description', type: 'string' },
    { key: 'category', headerText: 'Category', type: 'string' },
    { key: 'type', headerText: 'Type', type: 'string' },
    { key: 'amount', headerText: 'Amount', type: 'number' },
    { key: 'notes', headerText: 'Notes' },
  ];
}

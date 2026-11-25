import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { Transactions } from './features/transactions/transactions';
import { Budget } from './features/budget/budget';
import { NewTransaction } from './features/new-transaction/new-transaction';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    title: 'Dashboard',
  },
  {
    path: 'transactions',
    component: Transactions,
    title: 'Transactions',
  },
  {
    path: 'budget',
    component: Budget,
    title: 'Budget',
  },
  {
    path: 'transactions/new',
    component: NewTransaction,
    title: 'Add Transaction',
  },
];

import { TestBed } from '@angular/core/testing';
import { Transaction } from '../../../models/transaction.model';
import { Table } from './table';

describe('Table', () => {
  let component: Table<Transaction>;

  beforeEach(() => {
    component = TestBed.runInInjectionContext(() => new Table<Transaction>());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the edited row after a committed row edit', () => {
    const transaction: Transaction = {
      id: '1',
      date: '2026-06-01',
      description: 'Groceries',
      category: 'Food',
      type: 'Expense',
      amount: 25,
    };
    const emittedRows: Transaction[] = [];
    component.rowValueChanged.subscribe((row) => emittedRows.push(row));

    component.onRowEditStarted(new Event('rowEditStarted'));
    component.onValueChanged(
      new CustomEvent('cellValueChanged', { detail: { data: transaction } }),
    );
    component.onRowEditEnded(
      new CustomEvent('rowEditEnded', { detail: { committed: true, rowIndex: 0 } }),
    );

    expect(emittedRows).toEqual([transaction]);
  });

  it('does not emit the edited row when the row edit is discarded', () => {
    const emittedRows: Transaction[] = [];
    component.rowValueChanged.subscribe((row) => emittedRows.push(row));

    component.onRowEditStarted(new Event('rowEditStarted'));
    component.onValueChanged(
      new CustomEvent('cellValueChanged', {
        detail: {
          data: {
            id: '1',
            date: '2026-06-01',
            description: 'Groceries',
            category: 'Food',
            type: 'Expense',
            amount: 25,
          },
        },
      }),
    );
    component.onRowEditEnded(
      new CustomEvent('rowEditEnded', { detail: { committed: false, rowIndex: 0 } }),
    );

    expect(emittedRows).toEqual([]);
  });
});

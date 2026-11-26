import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {
  form,
  FormField,
  required,
  min,
  max,
  minLength,
  maxLength,
  pattern,
  FormRoot,
} from '@angular/forms/signals';
import { Transaction } from '../../models/transaction.model';
import { TransactionsService } from '../../shared/services/transactions/transactions-service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaskDirective } from 'ngx-mask';

interface TransactionData {
  description: string;
  category: string;
  type: Transaction['type'] | '';
  amount: number;
  date: string;
  notes: string;
}

const EMPTY_TRANSACTION: TransactionData = {
  description: '',
  category: '',
  type: '',
  amount: 0,
  date: '',
  notes: '',
};

@Component({
  imports: [
    FormField,
    FormRoot,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    NgxMaskDirective,
  ],
  providers: [provideNativeDateAdapter()],
  selector: 'app-new-transaction',
  styleUrl: './new-transaction.scss',
  templateUrl: './new-transaction.html',
})
export class NewTransaction {
  private readonly transactionsService = inject(TransactionsService);
  private readonly router = inject(Router);

  newTransactionModel = signal<TransactionData>({ ...EMPTY_TRANSACTION });
  transactionTypes = [
    { value: 'Income', label: 'Income' },
    { value: 'Expense', label: 'Expense' },
  ];

  newTransactionForm = form(
    this.newTransactionModel,
    (schemaPath) => {
      // Description
      required(schemaPath.description, { message: 'Description is required' });
      minLength(schemaPath.description, 3, {
        message: 'Description must be at least 3 characters',
      });
      maxLength(schemaPath.description, 50, {
        message: 'Description must be at most 50 characters',
      });
      pattern(schemaPath.description, /^[a-zA-Z0-9 ]*$/, {
        message: 'Description can only contain alphanumeric characters and spaces',
      });
      // Category
      required(schemaPath.category, { message: 'Category is required' });
      minLength(schemaPath.category, 3, { message: 'Category must be at least 3 characters' });
      maxLength(schemaPath.category, 50, { message: 'Category must be at most 50 characters' });
      pattern(schemaPath.category, /^[a-zA-Z0-9 ]*$/, {
        message: 'Category can only contain alphanumeric characters and spaces',
      });
      // Type
      required(schemaPath.type, { message: 'Type is required' });
      // Amount
      required(schemaPath.amount, { message: 'Amount is required' });
      min(schemaPath.amount, 1, { message: 'Amount must be at least R1.00' });
      max(schemaPath.amount, 99999999999, {
        message: 'Amount must be less than or equal to 9999999999',
      });
      // Date
      required(schemaPath.date, { message: 'Date is required' });

      // Notes
      minLength(schemaPath.notes, 3, { message: 'Notes must be at least 3 characters' });
      maxLength(schemaPath.notes, 150, { message: 'Notes must be at most 150 characters' });
      pattern(schemaPath.notes, /^[a-zA-Z0-9 ]*$/, {
        message: 'Notes can only contain alphanumeric characters and spaces',
      });
    },
    {
      submission: {
        action: async (field) => {
          try {
            await firstValueFrom(
              this.transactionsService.submitTransaction(
                field().value() as Omit<Transaction, 'id'>,
              ),
            );
            this.newTransactionForm().reset({ ...EMPTY_TRANSACTION });
            this.router.navigate(['/transactions']);
            return undefined;
          } catch {
            return [{ kind: 'server', message: 'Could not save transaction' }];
          }
        },
      },
    },
  );
}

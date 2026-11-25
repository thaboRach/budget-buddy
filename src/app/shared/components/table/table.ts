import { Component, CUSTOM_ELEMENTS_SCHEMA, input, output } from '@angular/core';
import {
  ApexCellValueChangedEvent,
  ApexGrid,
  ApexRowEditEndedEvent,
  ColumnConfiguration,
  GridEditingConfiguration,
} from 'apex-grid';

ApexGrid.register();

@Component({
  imports: [],
  selector: 'app-table',
  styleUrl: './table.scss',
  templateUrl: './table.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Table<T extends object> {
  data = input.required<T[]>();
  columns = input.required<ColumnConfiguration<T>[]>();
  editingConfig = input<GridEditingConfiguration>();
  rowValueChanged = output<T>();

  private editedRow: T | undefined;

  onValueChanged(event: Event): void {
    this.editedRow = (event as CustomEvent<ApexCellValueChangedEvent<T>>).detail.data;
  }

  onRowEditStarted(_event: Event): void {
    this.editedRow = undefined;
  }

  onRowEditEnded(event: Event): void {
    const { committed } = (event as CustomEvent<ApexRowEditEndedEvent>).detail;
    const editedRow = this.editedRow;
    this.editedRow = undefined;

    if (committed && editedRow) {
      this.rowValueChanged.emit(editedRow);
    }
  }
}

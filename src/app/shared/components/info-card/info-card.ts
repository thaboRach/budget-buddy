import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-info-card',
  styleUrl: './info-card.scss',
  templateUrl: './info-card.html',
})
export class InfoCard {
  title = input.required<string>();
  value = input.required<number>();
}

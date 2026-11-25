import { Component, input, output } from '@angular/core';
import { Icon } from '../../shared/components/icon/icon';
import { RouterModule } from '@angular/router';

@Component({
  imports: [Icon, RouterModule],
  selector: 'app-side-bar',
  styleUrl: './side-bar.scss',
  templateUrl: './side-bar.html',
})
export class SideBar {
  fullName = input.required<string>();
  closeRequested = output<void>();

  sideBarItems = [
    { title: 'Dashboard', path: '/' },
    { title: 'Transactions', path: '/transactions' },
    { title: 'Budget', path: '/budget' },
  ];
}

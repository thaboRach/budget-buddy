import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from './features/side-bar/side-bar';
import { Icon } from './shared/components/icon/icon';

@Component({
  imports: [RouterOutlet, SideBar, Icon],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-dashboard');
  readonly sidebarOpen = signal(false);

  closeSidebar() {
    this.sidebarOpen.set(false);
  }
}

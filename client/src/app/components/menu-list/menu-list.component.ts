import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>menu-list works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuListComponent { }

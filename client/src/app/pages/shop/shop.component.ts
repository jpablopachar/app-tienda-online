import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>shop works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent { }

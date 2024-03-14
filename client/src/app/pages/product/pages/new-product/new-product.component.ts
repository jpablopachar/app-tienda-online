import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './new-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProductComponent { }

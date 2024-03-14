import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './update-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateProductComponent { }

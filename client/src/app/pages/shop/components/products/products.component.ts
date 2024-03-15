import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { RouterModule } from '@angular/router'
import { Product } from '@app/models/server'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './products.component.html',
  styles: `
    .cards {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin:0 ;
      padding: 0;

      &__item{
        display: flex;
        padding: 1rem;
      }
    }

    .mat-class {
      max-width: 400px;
    }

    mat-card img {
      object-fit: cover;
      width: 400px;
      height: 73%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  @Input() products!: Product[] | undefined;
}

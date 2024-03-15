import { CommonModule } from '@angular/common'
import { HttpParams } from '@angular/common/http'
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core'
import { Dictionaries } from '@app/models/client/dictionary'
import { Pagination } from '@app/models/server'
import { SpinnerComponent } from '@app/shared'
import * as fromRoot from '@app/store'
import * as fromDictionaries from '@app/store/dictionary'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { FilterComponent, ProductsComponent } from './components'
import * as fromProducts from './store/products'

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FilterComponent, ProductsComponent, SpinnerComponent],
  template: `
    <div class="container">
      <div class="filter">
        @if ($dictionaries()) {
        <app-filter [dictionaries]="$dictionaries()"></app-filter>
        }
      </div>
      <div class="productos">
        @if (pagination$ | async; as pagination) {
          <app-products [products]="pagination.data"></app-products>
        }
      </div>
    </div>
    @if ($loading()) {
      <app-spinner></app-spinner>
    }
  `,
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent implements OnInit {
  public $loading: WritableSignal<boolean | null>;
  public $dictionaries: WritableSignal<Dictionaries | null>;

  public pagination$!: Observable<Pagination>;

  public params: HttpParams;

  private _storeRoot: Store<fromRoot.State>;
  private _store: Store<fromProducts.ProductsState>;

  constructor() {
    this._storeRoot = inject(Store);
    this._store = inject(Store);

    this.$loading = signal(null);
    this.$dictionaries = signal(null);

    this.params = new HttpParams();
  }

  ngOnInit(): void {
    this.$loading.set(
      this._store.selectSignal(fromProducts.selectGetShopLoading)()
    );

    this.pagination$ = this._store.select(fromProducts.selectGetShop) as Observable<Pagination>;

    this.$dictionaries.set(
      this._storeRoot.selectSignal(fromDictionaries.selectGetDictionaries)()
    );

    this.params = this.params.set('pageIndex', 1);
    this.params = this.params.set('pageSize', 10);

    this._store.dispatch(
      fromProducts.getProductsAction({
        paginationRequest: this.params,
        paramsUrl: this.params.toString(),
      })
    );
  }
}

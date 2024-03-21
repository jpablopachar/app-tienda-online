import { CommonModule } from '@angular/common'
import { HttpParams } from '@angular/common/http'
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core'
import { Dictionaries } from '@app/models/client/dictionary'
import { Pagination } from '@app/models/server'
import { SpinnerComponent } from '@app/shared'
import * as fromRoot from '@app/store'
import * as fromDictionaries from '@app/store/dictionary'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import {
  FilterComponent,
  ProductsComponent,
  SearchComponent,
} from './components'
import { PaginatorComponent } from './components/paginator/paginator.component'
import * as fromProducts from './store/products'

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    FilterComponent,
    ProductsComponent,
    SpinnerComponent,
    SearchComponent,
    PaginatorComponent
  ],
  template: `
    <div class="container">
      <div class="filter">
        @if (dictionaries$ | async; as dictionaries) {
          <app-filter [dictionaries]="dictionaries"></app-filter>
        }
      </div>
      <div class="pagination">
        @if (pagination$ | async; as pagination) {
          <app-paginator [pagination]="pagination"></app-paginator>
        }
      </div>
      <div class="buscador">
        <app-search></app-search>
      </div>
      <div class="productos">
        @if (pagination$ | async; as pagination) {
        <app-products [products]="pagination.data"></app-products>
        }
      </div>
    </div>
    @if (loading$ | async) {
      <app-spinner></app-spinner>
    }
  `,
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent implements OnInit {
  public loading$!: Observable<boolean | null>;
  public dictionaries$!: Observable<Dictionaries | null>;
  public pagination$!: Observable<Pagination>;

  private _params: HttpParams;

  private _storeRoot: Store<fromRoot.State>;
  private _store: Store<fromProducts.ProductsState>;

  constructor() {
    this._storeRoot = inject(Store);
    this._store = inject(Store);

    this._params = new HttpParams();
  }

  ngOnInit(): void {
    this.loading$ = this._store.select(fromProducts.selectGetShopLoading);

    this.pagination$ = this._store.select(
      fromProducts.selectGetShop
    ) as Observable<Pagination>;

    this.dictionaries$ = this._storeRoot.select(fromDictionaries.selectGetDictionaries);

    this._params = this._params.set('pageIndex', 1);
    this._params = this._params.set('pageSize', 10);

    this._store.dispatch(
      fromProducts.getProductsAction({
        paginationRequest: this._params,
        paramsUrl: this._params.toString(),
      })
    );
  }
}

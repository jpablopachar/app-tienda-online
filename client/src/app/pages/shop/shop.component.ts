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
import * as fromRoot from '@app/store'
import * as fromDictionaries from '@app/store/dictionary'
import { Store } from '@ngrx/store'
import { FilterComponent } from './components'
import * as fromProducts from './store/products'

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FilterComponent],
  template: `
    <div class="container">
      <div class="filter">
        @if ($dictionaries()) {
        <app-filter [dictionaries]="$dictionaries()"></app-filter>
        }
      </div>
    </div>
  `,
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent implements OnInit {
  public $loading: WritableSignal<boolean | null>;
  public $dictionaries: WritableSignal<Dictionaries | null>;
  public $pagination: WritableSignal<Pagination | null>;

  public params: HttpParams;

  private _storeRoot: Store<fromRoot.State>;
  private _store: Store<fromProducts.ProductsState>;

  constructor() {
    this._storeRoot = inject(Store);
    this._store = inject(Store);

    this.$loading = signal(null);
    this.$dictionaries = signal(null);
    this.$pagination = signal(null);

    this.params = new HttpParams();
  }

  ngOnInit(): void {
    this.$loading.set(
      this._store.selectSignal(fromProducts.selectGetShopLoading)()
    );

    this.$pagination.set(
      this._store.selectSignal(fromProducts.selectGetShop)()
    );

    this.$dictionaries.set(
      this._storeRoot.selectSignal(fromDictionaries.selectGetDictionaries)()
    );

    this.params = this.params.set('pageIndex', 1);
    this.params = this.params.set('pageSize', 10);

    this._store.dispatch(
      fromProducts.getProducts({
        paginationRequest: this.params,
        paramsUrl: this.params.toString(),
      })
    );
  }
}

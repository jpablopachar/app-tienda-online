import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, inject, signal } from '@angular/core'
import { Dictionaries } from '@app/models/client/dictionary'
// import { DictionariesState, selectGetDictionaries } from '@app/store/dictionary'
// import { UserState } from '@app/store/user'
import * as fromRoot from '@app/store'
import * as fromDictionaries from '@app/store/dictionary'
import { Store } from '@ngrx/store'
import { FilterComponent } from './components/filter/filter.component'

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    FilterComponent
  ],
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
  private _storeRoot: Store<fromRoot.State>;
  // private _store: Store<DictionariesState>;

  constructor() {
    // this._storeRoot = inject(Store<UserState>);
    this._storeRoot = inject(Store);

    this.$loading = signal(null);
    this.$dictionaries = signal(null);
  }

  ngOnInit(): void {
    this.$dictionaries.set(this._storeRoot.selectSignal(fromDictionaries.selectGetDictionaries)());
  }
}

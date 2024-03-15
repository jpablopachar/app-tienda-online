import { CommonModule } from '@angular/common'
import { HttpParams } from '@angular/common/http'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatListModule, MatSelectionListChange } from '@angular/material/list'
import { ControlItem } from '@app/models/client'
import { Dictionaries } from '@app/models/client/dictionary'
import { ControlEntities, FormFieldComponent } from '@app/shared'
import { UserState } from '@app/store/user'
import { Store } from '@ngrx/store'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent, MatListModule],
  templateUrl: './filter.component.html',
  styles: `
    @import "styles/mixins.scss";

    .filter {
      @include card;
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  @Input() dictionaries!: Dictionaries | null;

  public form: FormGroup;
  public controls!: ControlEntities;
  public items: ControlItem[];
  public $categories: WritableSignal<ControlItem[] | null>;
  public $brands: WritableSignal<ControlItem[] | null>;
  public $paginatorParams: WritableSignal<HttpParams | null>;

  private _destroy: Subject<any>;
  private _formBuilder: FormBuilder;
  private _store: Store<UserState>;

  constructor() {
    this._formBuilder = inject(FormBuilder);
    this._store = inject(Store);

    this.items = [
      { value: 'nameAsc', label: 'Nombre' },
      { value: 'priceAsc', label: 'Precio' },
      { value: 'descriptionAsc', label: 'Descripción' },
    ];

    this.form = this._formBuilder.group({
      // sort: [null, { updateOn: 'change', validators: [] }],
      category: null,
      brand: null,
    });

    this.$categories = signal(null);
    this.$brands = signal(null);
    this.$paginatorParams = signal(null);

    this._destroy = new Subject<any>();
  }

  ngOnInit(): void {
    // this._store.pipe(takeUntil(this._destroy))
    // this.$paginatorParams.set(this._store.selectSignal(selectG))
    // this.$paginatorParams.set(this._store.selectSignal()());
    this.$categories.set(this.dictionaries?.categories.controlItems as ControlItem[]);

    this.$brands.set(this.dictionaries?.brands.controlItems as ControlItem[]);
  }

  public onCategorySelectionChange(event: MatSelectionListChange): void {
    console.log(event);
  }

  public onBrandSelectionChange(event: MatSelectionListChange): void {
    console.log(event);
  }
}

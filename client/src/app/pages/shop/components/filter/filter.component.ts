import { CommonModule } from '@angular/common'
import { HttpParams } from '@angular/common/http'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatListModule, MatSelectionListChange } from '@angular/material/list'
import { ControlItem } from '@app/models/client'
import { Dictionaries } from '@app/models/client/dictionary'
import {
  ControlEntities,
  FormFieldComponent,
  SelectComponent,
} from '@app/shared'
import * as fromRoot from '@app/store'
import { Store, select } from '@ngrx/store'
import { Subject, takeUntil } from 'rxjs'
import * as fromProducts from '../../store/products'

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent,
    MatListModule,
    SelectComponent,
  ],
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
export class FilterComponent implements OnInit, OnDestroy {
  @Input() dictionaries!: Dictionaries | null;

  public form: FormGroup;
  public controls!: ControlEntities;
  public items: ControlItem[];
  public $categories: WritableSignal<ControlItem[] | null>;
  public $brands: WritableSignal<ControlItem[] | null>;
  public $paginatorParams: WritableSignal<HttpParams | null | undefined>;

  private _destroy: Subject<any>;
  private _formBuilder: FormBuilder;
  private _store: Store<fromRoot.State>;

  constructor() {
    this._formBuilder = inject(FormBuilder);
    this._store = inject(Store);

    this.items = [
      { value: 'nameAsc', label: 'Nombre' },
      { value: 'priceAsc', label: 'Precio' },
      { value: 'descriptionAsc', label: 'Descripción' },
    ];

    this.form = this._formBuilder.group({
      sort: [null, { updateOn: 'change', validators: [] }],
      category: null,
      brand: null,
    });

    this.$categories = signal(null);
    this.$brands = signal(null);
    this.$paginatorParams = signal(null);

    this._destroy = new Subject<any>();
  }

  ngOnInit(): void {
    this._store
      .pipe(takeUntil(this._destroy))
      .pipe(select(fromProducts.selectPaginationRequest))
      .subscribe((data: HttpParams | null): void => {
        console.log('paginatorParams', data);
        this.$paginatorParams.set(data);
      });

    console.log('paginatorParams', this.$paginatorParams());

    this.$categories.set(
      this.dictionaries?.categories.controlItems as ControlItem[]
    );

    this.$brands.set(this.dictionaries?.brands.controlItems as ControlItem[]);

    this.controls = {
      sort: {
        items: this.items,
        changed: (): void => {
          this.$paginatorParams.set(this.$paginatorParams()?.delete('sort'));

          this.$paginatorParams.set(
            this.$paginatorParams()?.set('sort', this.form.value.sort)
          );

          this._store.dispatch(
            fromProducts.getProductsAction({
              paginationRequest: this.$paginatorParams() as HttpParams,
              paramsUrl: this.$paginatorParams()?.toString() as string,
            })
          );

          console.log('change', this.$paginatorParams());
        },
      },
    };
  }

  public onCategorySelectionChange(event: MatSelectionListChange): void {
    this.$paginatorParams.set(this.$paginatorParams()?.delete('category'));

    this.$paginatorParams.set(
      this.$paginatorParams()?.set('category', this.form.get('category')?.value)
    );

    this._store.dispatch(
      fromProducts.getProductsAction({
        paginationRequest: this.$paginatorParams() as HttpParams,
        paramsUrl: this.$paginatorParams()?.toString() as string,
      })
    );
  }

  public onBrandSelectionChange(event: MatSelectionListChange): void {
    this.$paginatorParams.set(this.$paginatorParams()?.delete('brand'));

    this.$paginatorParams.set(
      this.$paginatorParams()?.set('brand', this.form.get('brand')?.value)
    );

    this._store.dispatch(
      fromProducts.getProductsAction({
        paginationRequest: this.$paginatorParams() as HttpParams,
        paramsUrl: this.$paginatorParams()?.toString() as string,
      })
    );
  }

  ngOnDestroy(): void {
    this._destroy.next(null);
    this._destroy.complete();
  }
}

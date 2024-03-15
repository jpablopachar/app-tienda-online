import { CommonModule } from '@angular/common'
import { HttpParams } from '@angular/common/http'
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ButtonComponent, FormFieldComponent, InputComponent } from '@app/shared'
import * as fromRoot from '@app/store'
import { Store, select } from '@ngrx/store'
import { Subject, takeUntil } from 'rxjs'
import * as fromProducts from '../../store/products'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent,
    InputComponent,
    ButtonComponent,
  ],
  template: `
    <form
      [formGroup]="form"
      autocomplete="off"
      (submit)="onSubmit()"
      (keyup.enter)="onSubmit()"
    >
      <div class="form__textfield">
        <app-form-field
          label=""
          [control]="form.controls['search']"
          [isInline]="false"
        >
          <app-input formControlName="search"> </app-input>
        </app-form-field>
      </div>
      <div class="form__actions">
        <app-button type="submit"> Buscar </app-button>
      </div>
    </form>
  `,
  styles: `
    .form {
      display: flex;

      &__textfield {
        display: inline-flex;
      }

      &__actions {
        display:inline-flex;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  private _$paginatorParams!: HttpParams | null | undefined;

  private _destroy: Subject<any>;
  private _formBuilder: FormBuilder;
  private _store: Store<fromRoot.State>;

  constructor() {
    this._formBuilder = inject(FormBuilder);
    this._store = inject(Store);

    this.form = this._formBuilder.group({
      search: [null, { updateOn: 'change', validators: [] }],
    });

    this._destroy = new Subject();
  }

  ngOnInit(): void {
    this._store
      .pipe(takeUntil(this._destroy))
      .pipe(select(fromProducts.selectPaginationRequest))
      .subscribe((data: HttpParams | null): void => {
        this._$paginatorParams = data;
      });

  }

  public onSubmit(): void {
    const value = this.form.value;

    this._$paginatorParams = this._$paginatorParams?.delete('search');

    this._$paginatorParams = this._$paginatorParams?.delete('pageIndex');

    this._$paginatorParams = this._$paginatorParams?.set('pageIndex', 1);

    if (value.search !== null && value.search.trim() !== '') {
      this._$paginatorParams = this._$paginatorParams?.set(
        'search',
        value.search.trim()
      );
    }

    this._store.dispatch(
      fromProducts.getProductsAction({
        paginationRequest: this._$paginatorParams as HttpParams,
        paramsUrl: this._$paginatorParams?.toString() as string,
      })
    );
  }

  ngOnDestroy(): void {
    this._destroy.next(null);
    this._destroy.complete();
  }
}

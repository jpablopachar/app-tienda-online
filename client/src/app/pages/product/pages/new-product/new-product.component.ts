import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal
} from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { ControlItem } from '@app/models/client'
import { Dictionaries } from '@app/models/client/dictionary'
import {
  ButtonComponent,
  ControlEntities,
  FormFieldComponent,
  InputComponent,
  SelectComponent,
  SpinnerComponent,
  UserPhotoComponent,
  markFormGroupTouched,
  regex,
  regexErrors,
} from '@app/shared'
import { FilesUploadComponent } from '@app/shared/popups/files-upload/files-upload.component'
import * as fromRoot from '@app/store'
import * as fromDictionaries from '@app/store/dictionary'
import { Store } from '@ngrx/store'
import * as fromProduct from '../../store/product'

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserPhotoComponent,
    FilesUploadComponent,
    FormFieldComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    SpinnerComponent,
  ],
  templateUrl: './new-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProductComponent implements OnInit {
  public $loading: WritableSignal<boolean | null>;
  public $dictionaries: WritableSignal<null>;

  public form: FormGroup;
  public regexErrors: { [key: string]: string };

  public controls!: ControlEntities;

  private _store: Store<fromRoot.State>;
  private _formBuilder: FormBuilder;

  private _categories!: ControlItem[];
  private _brand!: ControlItem[];

  constructor() {
    this._store = inject(Store);
    this._formBuilder = inject(FormBuilder);

    this.$loading = signal(null);
    this.$dictionaries = signal(null);

    this.form = this._formBuilder.group({
      name: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      description: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      stock: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.pattern(regex.number)],
        },
      ],
      price: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.pattern(regex.number)],
        },
      ],
      photoURL: [null],
      category: null,
      brand: null,
    });

    this.regexErrors = regexErrors;
  }

  ngOnInit(): void {
    this._store
      .select(fromDictionaries.selectGetDictionaries)
      .subscribe((data: Dictionaries | null): void => {
        if (data) {
          this._categories = data.categories.controlItems as ControlItem[];
          this._brand = data.brands.controlItems as ControlItem[];

          this.controls = {
            category: {
              items: this._categories,
              changed: (): void => {},
            },
            brand: {
              items: this._brand,
              changed: (): void => {},
            },
          };
        }
      });

    this.controls = {
      category: {
        items: this._categories,
        changed: (): void => {},
      },
      brand: {
        items: this._brand,
        changed: (): void => {},
      },
    };
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.$loading.set(
        this._store.selectSignal(fromProduct.selectGetProductLoading)()
      );

      const value = this.form.value;

      const product: fromProduct.ProductCreateRequest = {
        name: value.name,
        description: value.description,
        stock: value.stock,
        price: value.price,
        image: value.photoURL,
        categoryId: value.category,
        brandId: value.brand,
      };

      this._store.dispatch(fromProduct.createProduct({ product }));
    } else {
      markFormGroupTouched(this.form);
    }
  }

  public onFilesChanged(url: any): void {
    if (url) {
      this.form.controls['photoURL'].setValue(url);
    }
  }
}

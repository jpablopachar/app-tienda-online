import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import { ControlItem, ProductForm } from '@app/models/client'
import { Dictionaries } from '@app/models/client/dictionary'
import { Product } from '@app/models/server'
import {
  ButtonComponent,
  ControlEntities,
  FilesUploadDirective,
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
import * as fromProductForm from '../../store/product-form'
import { MapperService } from './services'

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserPhotoComponent,
    FilesUploadComponent,
    FilesUploadDirective,
    FormFieldComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    SpinnerComponent,
  ],
  templateUrl: './update-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateProductComponent implements OnInit {
  public $loading: WritableSignal<boolean | null>;
  public $dictionaries: WritableSignal<null>;

  public form: FormGroup;
  public regexErrors: { [key: string]: string };

  public controls!: ControlEntities;

  private _store: Store<fromRoot.State>;
  private _formBuilder: FormBuilder;
  private _cdr: ChangeDetectorRef;
  private _router: ActivatedRoute;
  private _mapperService: MapperService;

  private _categories!: ControlItem[];
  private _brand!: ControlItem[];

  constructor() {
    this._store = inject(Store);
    this._formBuilder = inject(FormBuilder);
    this._cdr = inject(ChangeDetectorRef);
    this._router = inject(ActivatedRoute);
    this._mapperService = inject(MapperService);

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

    this._store
      .select(fromProductForm.selectGetProductForm)
      .subscribe((productForm: ProductForm): void => {
        if (productForm.name) {
          const value: ProductForm = productForm;

          console.log('value', value);

          this.form.patchValue(value);
          this.form.updateValueAndValidity();
          this._cdr.detectChanges();
        }
      });

    this._store
      .select(fromProduct.selectGetProduct)
      .subscribe((product: Product | null): void => {
        if (product) {
          const productForm: ProductForm =
            this._mapperService.productToForm(product);

          this._store.dispatch(fromProductForm.setForm({ productForm }));
        }
      });

    this._router.params.subscribe((param: Params): void => {
      const id = param['id'];

      this._store.dispatch(fromProduct.getProduct({ id }));
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.$loading.set(
        this._store.selectSignal(fromProduct.selectGetProductLoading)()
      );

      this._router.params.subscribe((param: Params): void => {
        const value = this.form.value;

        const product: fromProduct.ProductUpdateRequest = {
          id: param['id'],
          name: value.name,
          description: value.description,
          stock: value.stock,
          price: value.price,
          image: value.photoURL,
          categoryId: value.category,
          brandId: value.brand,
        };

        const id = param['id'];

        this._store.dispatch(fromProduct.updateProduct({ id, product }));
      });
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

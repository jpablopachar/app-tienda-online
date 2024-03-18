import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, signal } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ButtonComponent, FormFieldComponent, InputComponent, SelectComponent, SpinnerComponent, UserPhotoComponent } from '@app/shared'
import { FilesUploadComponent } from '@app/shared/popups/files-upload/files-upload.component'
/* import * as fromDictionaries from '@app/store/dictionary';
import * as fromRoot from '@app/store';
import * as fromProduct from '../../store/product'; */

@Component({
  selector: 'app-update-product',
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
    SpinnerComponent
  ],
  templateUrl: './update-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateProductComponent implements OnInit {
  public $loading: WritableSignal<boolean | null>;
  public $dictionaries: WritableSignal<null>;

  public form: FormGroup;

  constructor() {
    this.$loading = signal(null)
    this.$dictionaries = signal(null)
  }
}

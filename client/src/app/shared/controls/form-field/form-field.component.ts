import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { AbstractControl } from '@angular/forms'

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="form-field"
      [class.form-field_error]="hasError()"
      [class.form-field_inline]="isInline"
    >
      <label class="form-field__label" for="">
        {{ label }}
        @if (required) {
          <span class="form-field__req">*</span>
        }
      </label>
      <div class="form-field__control">
        <ng-content></ng-content>
        <div class="form-field__error">
          @if (control && errorKey) {
            @switch (errorKey) {
              @case ('min') {
                <span>Mínimo{{ control.errors ? control.errors[errorKey].min : 0 }}</span>
              }
              @case ('max') {
                <span>Máximo{{ control.errors ? control.errors[errorKey].max : 100000 }}</span>
              }
              @case ('required') {
                <span>Esta caja de texto es obligatoria</span>
              }
              @case ('requiredtrue') {
                <span>Esta caja de texto es obligatoria</span>
              }
              @case ('minlength') {
                <span>cantidad de caracteres minima{{ control.errors ? control.errors[errorKey].requiredLength : 0 }}</span>
              }
              @case ('maxlength') {
                <span>cantidad de caracteres maxima{{ control.errors ? control.errors[errorKey].requiredLength : 0 }}</span>
              }
              @case ('pattern') {
                @if (patternError) {
                  <span>{{ patternError }}</span>
                } @else {
                  <span>La expresión regular no tiene coincidencia</span>
                }
              }
            }
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
  @Input() label!: string;
  @Input() required!: boolean;
  @Input() isInline!: boolean;
  @Input() control!: AbstractControl;
  @Input() patternError!: string;

  constructor() {
    this.isInline = true;
  }

  public hasError(): boolean {
    return this.control && this.control.invalid && this.control.touched;
  }

  public get errorKey(): string | null {
    return (
      this.control && this.control.errors && Object.keys(this.control.errors)[0]
    );
  }
}

import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
  forwardRef,
  signal,
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input
      type="text"
      class="app-input"
      [value]="value()"
      [placeholder]="placeholder || ''"
      [attr.disabled]="isDisabled() ? true : null"
      (keyup)="onKeyup($event)"
      (blur)="onBlur()"
    />
  `,
  styles: `
    @import "styles/colors.scss";

    :host-context(.form-field_error) {
      input {
        border: 1px solid $error
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof InputComponent => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder!: string;

  @Output() changed: EventEmitter<string>;

  public value: WritableSignal<string>;
  public isDisabled: WritableSignal<boolean>;

  constructor() {
    this.changed = new EventEmitter<string>();

    this.value = signal('');
    this.isDisabled = signal(false);
  }

  private propagateChange: any = (): void => {};
  private propagateTouched: any = (): void => {};

  public writeValue(value: string): void {
    this.value.set(value);
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  public onKeyup(event: Event): void {
    const { target } = event;

    this.value.set((target as HTMLInputElement).value);

    this.propagateChange(this.value());

    this.changed.emit(this.value());
  }

  public onBlur(): void {
    this.propagateTouched();
  }
}

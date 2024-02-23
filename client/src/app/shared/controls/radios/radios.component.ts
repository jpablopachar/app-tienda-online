import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
  forwardRef,
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { ControlItem, Value } from '@app/models/client'

@Component({
  selector: 'app-radios',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="radios">
      @for (item of items; track item.value) {
        <label class="radio" [class.radio_disabled]="isDisabled">
          {{ item.label }}
          <input
            type="radio"
            class="radio__input"
            [value]="item.value"
            [attr.disabled]="isDisabled() ? true : null"
            [checked]="isChecked(item.value)"
            (change)="onChanged(item.value)"
          />
          <span class="radio__checkmark"></span>
        </label>
      }
    </div>
  `,
  styleUrl: './radios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof RadiosComponent => RadiosComponent),
      multi: true,
    },
  ],
})
export class RadiosComponent implements ControlValueAccessor {
  @Input() items!: ControlItem[];

  @Output() changed: EventEmitter<Value>;

  public value!: WritableSignal<Value>;
  public isDisabled!: WritableSignal<boolean>;

  constructor() {
    this.changed = new EventEmitter<Value>();
  }

  private propagateChange: any = (): void => {};

  public writeValue(value: Value): void {
    this.value.set(value);
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(): void {}

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  public onChanged(value: Value): void {
    this.value.set(value);

    this.propagateChange(value);

    this.changed.emit(value);
  }

  public isChecked(value: Value): boolean {
    return this.value() === value;
  }
}

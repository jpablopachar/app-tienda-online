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
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="checkboxes">
      @for (item of items; track item.value) {
        <div>
          <label class="checkbox" [class.checkbox_disabled]="isDisabled()">
            {{ item.label }}
            <input
              type="checkbox"
              class="checkbox__input"
              [value]="item.value"
              [attr.disabled]="isDisabled() ? true : null"
              [checked]="isChecked(item.value)"
              (change)="onChanged(item.value, $event)"
            />
            <span class="checkbox__checkmark"></span>
          </label>
        </div>
      }
    </div>
  `,
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        (): typeof CheckboxComponent => CheckboxComponent
      ),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() items!: ControlItem[];

  @Output() changed: EventEmitter<Value[]>;

  public value!: WritableSignal<Value[]>;
  public isDisabled!: WritableSignal<boolean>;

  constructor() {
    this.changed = new EventEmitter<Value[]>();
  }

  private propagateChange: any = () => {};

  writeValue(value: Value[]): void {
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): void {}

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onChanged(value: Value, checked: Event): void {
    const { target } = checked;
    const resultado: boolean = (target as HTMLInputElement).checked;

    const selected: Value[] = this.getSelected(value, resultado);

    this.value.set(selected);

    this.propagateChange(selected);

    this.changed.emit(selected);
  }

  private getSelected(value: Value, checked: boolean): Value[] {
    const selected: Value[] = this.value() ? [...this.value()] : [];

    if (checked) {
      if (!selected.includes(value)) {
        selected.push(value);
      }
    } else {
      const index: number = selected.indexOf(value);

      selected.splice(index, 1);
    }

    return selected.length ? selected : [];
  }

  isChecked(value: Value): boolean {
    return this.value() && this.value().includes(value);
  }
}

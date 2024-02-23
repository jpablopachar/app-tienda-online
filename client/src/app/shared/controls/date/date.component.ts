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
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker'
import { Value } from '@app/models/client'

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule],
  template: `
    <div class="date">
      <input
        class="app-input"
        type="text"
        readonly
        [matDatepicker]="picker"
        (dateChange)="onChanged($event)"
        (click)="picker.open()"
        [attr.disabled]="isDisabled() ? true : null"
        [value]="inputValue"
        [min]="min"
        [max]="max"
        placeholder="{{ placeholder || 'Seleccione una fecha' }}"
      />
      <mat-datepicker-toggle matSuffix [for]="picker" disabled="isDisabled">
      </mat-datepicker-toggle>
      <mat-datepicker #picker (closed)="onClosed()"></mat-datepicker>
    </div>
  `,
  styles: `
    @import "styles/colors";

    .date {
      display: inline-flex;
    }

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
      useExisting: forwardRef((): typeof DateComponent => DateComponent),
      multi: true,
    },
  ],
})
export class DateComponent implements ControlValueAccessor {
  @Input() placeholder!: string;
  @Input() min!: Date;
  @Input() max!: Date;

  @Output() changed: EventEmitter<Value>;
  @Output() closed: EventEmitter<void>;

  public value!: WritableSignal<Value>;
  public isDisabled!: WritableSignal<boolean>;

  public get inputValue(): Date | null {
    return this.value() ? new Date(this.value() as string) : null;
  }

  constructor() {
    this.changed = new EventEmitter<Value>();
    this.closed = new EventEmitter<void>();
  }

  private propagateChange: any = (): void => {};

  private propagateTouched: any = (): void => {};

  public writeValue(value: Value): void {
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

  public onChanged(event: MatDatepickerInputEvent<Date>): void {
    const value = event.value ? event.value.getTime() : new Date().getTime();

    this.value.set(value);

    this.propagateChange(value);

    this.changed.emit(value);
  }

  public onClosed(): void {
    this.propagateTouched();

    this.closed.emit();
  }
}

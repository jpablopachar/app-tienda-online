import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core'
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { ControlItem, Value } from '@app/models/client'
import {
  Observable,
  Subject,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  takeUntil,
} from 'rxjs'
import { HighlightPipe } from './pipes/highlight.pipe'

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatAutocompleteModule, HighlightPipe],
  template: `
    <div class="autocomplete">
      <input
        class="app-input"
        type="text"
        #search
        [placeholder]="placeholder || 'Ingrese una búsqueda'"
        [formControl]="formControl"
        [matAutocomplete]="auto"
        (blur)="onBlur()"
      />
      <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn">
        @for (option of options$ | async; track option.value) {
          <mat-option [value]="option">
            <div class="option">
              <div class="option__icon" *ngIf="option.icon">
                <span [ngClass]="option.icon.cssClass"></span>
              </div>
              <div
                class="option__label"
                [innerHtml]="option.label | appHighlight : search.value"
              ></div>
            </div>
          </mat-option>
        }
      </mat-autocomplete>
    </div>
  `,
  styles: `
    @import "styles/colors";

    .autocomplete {
      position: relative;

      &__options {
        position: absolute;
      }
    }

    .option {
      display: flex;
      align-items: center;

      &__icon{
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
      }
    }

    :host-context(.form-field_error){
      input {
        border: 1px solid $error;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        (): typeof AutocompleteComponent => AutocompleteComponent
      ),
      multi: true,
    },
  ],
})
export class AutocompleteComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @Input() items!: ControlItem[];
  @Input() placeholder!: string;

  @Output() changed: EventEmitter<Value>;

  private _destroy: Subject<any>;

  public formControl: FormControl;
  public options$!: Observable<ControlItem[]>;

  constructor() {
    this.changed = new EventEmitter<Value>();

    this.formControl = new FormControl();
    this._destroy = new Subject<any>();
  }

  ngOnInit(): void {
    this.options$ = this.formControl.valueChanges.pipe(
      startWith(''),
      filter(
        (value): boolean =>
          typeof value === 'string' || typeof value === 'object'
      ),
      map((value) => (typeof value === 'string' ? value : value.label)),
      map((label): ControlItem[] =>
        label ? this.filter(label) : this.items.slice()
      )
    );

    this.formControl.valueChanges
      .pipe(takeUntil(this._destroy), distinctUntilChanged())
      .subscribe((item): void => {
        const value = typeof item === 'object' ? item.value : '';

        this.propagateChange(value);

        this.changed.emit(value);
      });
  }

  ngOnDestroy(): void {
    this._destroy.next('');
    this._destroy.complete();
  }

  private filter(value: string): ControlItem[] {
    const filterValue: string = value.toLowerCase();

    return this.items.filter((items: ControlItem): boolean =>
      items.label.toLowerCase().includes(filterValue)
    );
  }

  private propagateChange: any = (): void => {};
  private propagateTouched: any = (): void => {};

  public writeValue(value: Value): void {
    const selectedOption: ControlItem | undefined = this.items.find(
      (item: ControlItem): boolean => item.value === value
    );

    this.formControl.setValue(selectedOption);
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  public displayFn(item?: ControlItem): string {
    return item ? item.label : '';
  }

  public onBlur(): void {
    this.propagateTouched();
  }
}

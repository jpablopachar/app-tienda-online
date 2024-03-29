import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import {
  ButtonComponent,
  FormFieldComponent,
  InputComponent,
  PasswordComponent,
  SpinnerComponent,
  markFormGroupTouched,
  regex,
  regexErrors,
} from '@app/shared'
import {
  EmailPasswordCredentials,
  UserState,
  selectGetLoading,
  signInEmailAction,
} from '@app/store/user'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent,
    InputComponent,
    PasswordComponent,
    ButtonComponent,
    SpinnerComponent,
  ],
  template: `
    <div class="app-page">
      <div class="app-page__header">
        <h1>Login</h1>
      </div>
      <form
        [formGroup]="form"
        (submit)="login()"
        (keyup.enter)="login()"
        novalidate
        autocomplete="off"
      >
        <div class="app-page__content">
          <app-form-field
            label="E-Mail"
            [required]="true"
            [control]="form.controls['email']"
            [isInline]="false"
            [patternError]="regexErrors.email"
          >
            <app-input formControlName="email"></app-input>
          </app-form-field>
          <app-form-field
            label="Password"
            [required]="true"
            [control]="form.controls['password']"
            [isInline]="false"
            [patternError]="regexErrors.password"
          >
            <app-password formControlName="password"></app-password>
          </app-form-field>
        </div>
        <div class="app-page__footer">
          <app-button type="submit">Enviar</app-button>
        </div>
      </form>

      @if (loading$ | async) {
        <app-spinner></app-spinner>
      }
    </div>
  `,
  styles: `
    .app-page {
      max-width: 500px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public loading$!: Observable<boolean | null>;

  public form: FormGroup;
  public regexErrors = regexErrors;

  private _formBuilder: FormBuilder;
  private _store: Store<UserState>;

  constructor() {
    this._formBuilder = inject(FormBuilder);
    this._store = inject(Store);

    this.form = this._formBuilder.group({
      email: [
        null,
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.maxLength(128),
            Validators.pattern(regex.email),
          ],
        },
      ],
      password: [
        null,
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern(regex.password),
          ],
        },
      ],
    });
  }

  public ngOnInit(): void {
    // this.$loading.set(this._store.selectSignal(selectGetLoading)());
    this.loading$ = this._store.select(selectGetLoading);
  }

  public login(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      const credentials: EmailPasswordCredentials = {
        email,
        password,
      };

      this._store.dispatch(signInEmailAction({ credentials }));
    } else {
      markFormGroupTouched(this.form);
    }
  }
}

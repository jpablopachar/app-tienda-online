import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
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
  UserCreateRequest,
  UserState,
  selectGetLoading,
  signUpEmailAction,
} from '@app/store/user'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-registration',
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
  templateUrl: './registration.component.html',
  styles: `
    @import "styles/colors.scss";

    .app-page {
      max-width: 500px;
    }

    .error {
      opacity: 0;
      font-size: 12px;
      color: $error;
      padding: 4px 0 16px 0;

      &_active{
        opacity: 1;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  public loading$!: Observable<boolean | null>;

  public form!: FormGroup;
  public regexErrors = regexErrors;

  private _formBuilder: FormBuilder;
  private _store: Store<UserState>;

  constructor() {
    this._formBuilder = inject(FormBuilder);
    this._store = inject(Store);

    this.form = this._formBuilder.group(
      {
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
        username: [
          null,
          {
            updateOn: 'blur',
            validators: [Validators.required],
          },
        ],
        name: [
          null,
          {
            updateOn: 'blur',
            validators: [Validators.required],
          },
        ],
        lastName: [
          null,
          {
            updateOn: 'blur',
            validators: [Validators.required],
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
        passwordRepeat: [
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
      },
      { validator: this._repeatPasswordValidator }
    );
  }

  public ngOnInit(): void {
    this.loading$ = this._store.select(selectGetLoading);
  }

  public register(): void {
    if (this.form.valid) {
      const { email, password, name, lastName, username } = this.form.value;

      const user: UserCreateRequest = {
        email,
        password,
        name,
        lastName,
        username,
      };

      this._store.dispatch(signUpEmailAction({ user }));
    } else {
      markFormGroupTouched(this.form);
    }
  }

  private _repeatPasswordValidator(
    group: FormGroup
  ): { [key: string]: boolean } | null {
    const password = group.get('password');
    const passwordRepeat = group.get('passwordRepeat');

    return passwordRepeat?.value && password?.value !== passwordRepeat.value
      ? { repeat: true }
      : null;
  }
}

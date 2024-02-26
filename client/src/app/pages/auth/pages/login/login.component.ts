import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { regexErrors } from '@app/shared'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `<p>login works!</p>`,
  styles: `
    .app-page {
      max-width: 500px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public form!: FormGroup;
  public regexErrors = regexErrors;

  public loading$!: Observable<boolean | null>;

  private _formBuilder: FormBuilder;

  constructor() {
    this._formBuilder = inject(FormBuilder);
  }
}

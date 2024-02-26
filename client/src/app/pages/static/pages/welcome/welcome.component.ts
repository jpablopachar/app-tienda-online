import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="app-page">
      <div class="app-page__header">
        <h1>Bienvenido a nuestro portal</h1>
      </div>
      <div class="app-page__content">
        <p>Esta aplicación esta construida con Angular 17</p>
        <p>
          Puede ser integrado con cualquier backend como Firebase, NET Core, Java, Python, Node, PHP
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {}

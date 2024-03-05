import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { RouterModule } from '@angular/router'
import { User } from '@app/models/server'

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatListModule],
  template: `
    <mat-nav-list>
      <a
        mat-list-item
        (click)="closeMenu()"
        routerLink="/"
      >
        <mat-icon>home</mat-icon>
        <span class="navegacion-list-label">Home</span>
      </a>
      @if (isAuthorized) {
        <a
          mat-list-item
          (click)="closeMenu()"
          routerLink="inmueble/nuevo"
        >
          <mat-icon>add</mat-icon>
          <span class="navegacion-list-label">Nuevo Inmueble</span>
        </a>
        <a
          mat-list-item
          (click)="closeMenu()"
          routerLink="inmueble/list"
        >
          <mat-icon>add</mat-icon>
          <span class="navegacion-list-label">Inmuebles</span>
        </a>
        <a
          mat-list-item
          (click)="onSignOut()"
          (click)="closeMenu()"
        >
          <mat-icon>logout</mat-icon>
          <span class="navegacion-list-label">Salir Sesion</span>
        </a>
      } @else {
        <a
          mat-list-item
          (click)="closeMenu()"
          routerLink="auth/login"
        >
          <mat-icon>login</mat-icon>
          <span class="navegacion-list-label">Inicio Sesion</span>
        </a>
        <a
          mat-list-item
          (click)="closeMenu()"
          routerLink="auth/registration"
        >
          <mat-icon>how_to_register</mat-icon>
          <span class="navegacion-list-label">Registrar</span>
        </a>
      }
      <a mat-list-item (click)="closeMenu()">
        <mat-icon>contact_support</mat-icon>
        <span class="navegacion-list-label">Contacto</span>
      </a>
    </mat-nav-list>
  `,
  styles: `
    .navegacion-list-label {
      display: inline-block;
      padding-left: 6px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuListComponent {
  @Input() isAuthorized!: boolean | null;
  @Input() user!: User | null;

  @Output() menuToggle: EventEmitter<void>;
  @Output() signOut: EventEmitter<void>;

  constructor() {
    this.menuToggle = new EventEmitter();
    this.signOut = new EventEmitter();
  }

  public closeMenu(): void {
    this.menuToggle.emit();
  }

  onSignOut(): void {
    this.signOut.emit();
  }
}

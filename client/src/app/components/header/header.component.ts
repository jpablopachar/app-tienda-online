import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { RouterModule } from '@angular/router'
import { User } from '@app/models/server'
import { ButtonComponent } from '@app/shared'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Output() menuClicked: EventEmitter<void>;
  @Output() signOut: EventEmitter<void>;

  @Input() isAuthorized!: boolean | null;
  @Input() user!: User | null;

  constructor() {
    this.menuClicked = new EventEmitter<void>();
    this.signOut = new EventEmitter<void>();
  }

  public onClicked(): void {
    this.menuClicked.emit();
  }

  public onSignOut(): void {
    this.signOut.emit();
  }
}

import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material/snack-bar'

export interface Notification {
  message: string;
}

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  template: `<span>{{ data.message }}</span>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Notification) {}
}

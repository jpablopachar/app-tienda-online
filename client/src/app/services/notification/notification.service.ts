import { Injectable, inject } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { NotificationComponent } from './components/notification/notification.component'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _snackBar: MatSnackBar;

  constructor() {
    this._snackBar = inject(MatSnackBar);
  }

  public error(message: string): void {
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: 3000,
      data: { message },
      panelClass: ['mat-snackbar_error'],
    });
  }

  public success(message: string): void {
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: 3000,
      data: { message },
      panelClass: ['mat-snackbar_success'],
    });
  }
}

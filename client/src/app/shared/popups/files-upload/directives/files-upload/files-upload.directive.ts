import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
  inject,
} from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { FilesUploadComponent } from '../../files-upload.component'

@Directive({
  selector: '[appFilesUpload]',
  standalone: true,
})
export class FilesUploadDirective {
  @Input() multiple!: boolean;
  @Input() crop!: boolean;

  @Output() changed: EventEmitter<string | string[]>;

  private _dialog: MatDialog;

  constructor() {
    this._dialog = inject(MatDialog);

    this.changed = new EventEmitter<string | string[]>();
  }

  @HostListener('click', ['event']) onClick() {
    this.openDialog();
  }

  private openDialog(): void {
    const dialogRef: MatDialogRef<FilesUploadComponent, any> =
      this._dialog.open(FilesUploadComponent, {
        width: '550px',
        height: '500px',
        data: {
          multiple: this.multiple,
          crop: this.crop,
        },
      });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('REsult', result);
      this.changed.emit(result || null);
    });
  }
}

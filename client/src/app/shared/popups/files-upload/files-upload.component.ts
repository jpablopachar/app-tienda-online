import { CommonModule } from '@angular/common'
import {
  ChangeDetectorRef,
  Component,
  Inject,
  WritableSignal,
  inject
} from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog'
import { CropperComponent, UploadComponent } from './components'
import { DropZoneDirective } from './directives'

export interface DialogData {
  multiple: boolean;
  crop: boolean;
}

@Component({
  selector: 'app-files-upload',
  standalone: true,
  imports: [CommonModule, DropZoneDirective, CropperComponent, UploadComponent],
  templateUrl: './files-upload.component.html',
  styleUrl: './files-upload.component.scss'
})
export class FilesUploadComponent {
  public isHovering?: WritableSignal<boolean>;
  public files: File[];
  public filesUrls: string[];
  public imageFile!: File | undefined;
  public isError!: boolean;

  private _dialogRef: MatDialogRef<FilesUploadComponent>;
  private _cdr: ChangeDetectorRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this._dialogRef = inject(MatDialogRef<FilesUploadComponent>);
    this._cdr = inject(ChangeDetectorRef);

    this.files = [];
    this.filesUrls = [];
  }

  public toggleHover(event: boolean): void {
    this.isHovering?.set(event);
  }

  public onDrop(files: FileList): void {
    this._dropGeneral(files);
  }

  public onDropFile(event: FileList | any): void {
    this._dropGeneral(event.target.files);
  }

  public onUploadComplete(url: string): void {
    this.filesUrls.push(url);

    this._cdr.detectChanges();
  }

  public onComplete(): void {
    const res: string | string[] = this.data.multiple
      ? this.filesUrls
      : this.filesUrls[0];

    this._dialogRef.close(res);
  }

  public onClose(): void {
    this._dialogRef.close();
  }

  public onCrop(file: File): void {
    this.imageFile = undefined

    this.files.push(file);
  }

  private _dropGeneral(files: FileList): void {
    this.isError = false;

    if (this.data.crop && files.length > 1) {
      this.isError = true;

      return;
    }

    if (this.data.crop && files.length === 1 && files.item(0)?.type.split('/')[0] === 'image') {
      this.imageFile = files.item(0) as File;

      return;
    }

    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i) as File);
    }
  }
}

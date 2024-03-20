import { CommonModule } from '@angular/common'
import {
  Component,
  Inject,
  WritableSignal,
  inject,
  signal
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
  styleUrl: './files-upload.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesUploadComponent {
  public isHovering?: WritableSignal<boolean>;
  public files: WritableSignal<File[]> = signal([]);
  public filesUrls: WritableSignal<string[]> = signal([]);
  public imageFile!: File | undefined;
  public isError!: boolean;

  private _dialogRef: MatDialogRef<FilesUploadComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this._dialogRef = inject(MatDialogRef<FilesUploadComponent>);
  }

  toggleHover(event: boolean): void {
    this.isHovering?.set(event);
  }

  onDrop(files: FileList): void {
    this._dropGeneral(files);
  }

  onDropFile(event: FileList | any): void {
    this._dropGeneral(event.target.files);
  }

  onUploadComplete(url: string): void {
    this.filesUrls.update((urls: string[]): string[] => [...urls, url]);
  }

  onComplete(): void {
    const res: string | string[] = this.data.multiple
      ? this.filesUrls()
      : this.filesUrls()[0];

    this._dialogRef.close(res);
  }

  onClose(): void {
    this._dialogRef.close();
  }

  onCrop(file: File): void {
    this.imageFile = undefined

    this.files.update((files: File[]): File[] => [...files, file]);
  }

  private _dropGeneral(files: FileList): void {
    this.isError = false;

    if (this.data.crop && files.length === 1 && files.item(0)?.type.split('/')[0] === 'image') {
      this.imageFile = files.item(0) as File;

      return;
    }

    for (let i = 0; i < files.length; i++) {
      this.files.update((currentFile: File[]): File[] => [...currentFile, files.item(i) as File]);
    }

    console.log(files);
  }
}

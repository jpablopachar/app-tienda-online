import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesUploadComponent {
  public $isHovering: WritableSignal<boolean | null>;
  public $files: WritableSignal<File[]>;
  public $filesUrls: WritableSignal<string[]>;
  public $imageFile: WritableSignal<File | undefined>;
  public $isError: WritableSignal<boolean | null>;

  private _dialogRef: MatDialogRef<FilesUploadComponent>;
  private _cdr: ChangeDetectorRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this._dialogRef = inject(MatDialogRef<FilesUploadComponent>);
    this._cdr = inject(ChangeDetectorRef);

    this.$isHovering = signal(null);
    this.$files = signal([]);
    this.$filesUrls = signal([]);
    this.$imageFile = signal(undefined);
    this.$isError = signal(false);
  }

  public toggleHover(event: boolean): void {
    this.$isHovering?.set(event);
  }

  public onDrop(files: FileList): void {
    this._dropGeneral(files);
  }

  public onDropFile(event: FileList | any): void {
    this._dropGeneral(event.target.files);
  }

  public onUploadComplete(url: string): void {
    this.$filesUrls.update((file: string[]): string[] => [...file, url]);

    this._cdr.detectChanges();
  }

  public onComplete(): void {
    const res: string | string[] = this.data.multiple
      ? this.$filesUrls()
      : this.$filesUrls()[0];

    this._dialogRef.close(res);
  }

  public onClose(): void {
    this._dialogRef.close();
  }

  public onCrop(file: File): void {
    this.$imageFile.set(undefined);

    this.$files.update((currentFile: File[]) => [...currentFile, file]);
  }

  private _dropGeneral(files: FileList): void {
    this.$isError.set(false);

    if (this.data.crop && files.length > 1) {
      this.$isError.set(true);

      return;
    }

    if (this.data.crop && files.length === 1 && files.item(0)?.type.split('/')[0] === 'image') {
      this.$imageFile.set(files.item(0) as File);

      return;
    }

    for (let i = 0; i < files.length; i++) {
      this.$files.update((currentFile: File[]): File[] => [...currentFile, files.item(i) as File]);
    }
  }
}

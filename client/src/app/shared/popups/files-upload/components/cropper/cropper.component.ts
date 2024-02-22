import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ImageCroppedEvent } from 'ngx-image-cropper'
// import { dataURLtoFile } from '../../../../utils'

@Component({
  selector: 'app-cropper',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './cropper.component.html'
})
export class CropperComponent {
  @Input() imageFile!: File;

  @Output() changed: EventEmitter<File>;

  public croppedImage!: string;

  constructor() {
    this.changed = new EventEmitter<File>();
  }

  public imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64 as string;
  }

  /* public onCrop() {
      const file = dataURLtoFile(this.croppedImage, this.imageFile);
      this.changed.emit(file);
  } */
}

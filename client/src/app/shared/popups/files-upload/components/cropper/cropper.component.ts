import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper'
import { dataURLtoFile } from '../../utils'

@Component({
  selector: 'app-cropper',
  standalone: true,
  imports: [CommonModule, ImageCropperModule],
  templateUrl: './cropper.component.html',
  styles: `
    @import 'styles/colors';

    .cropper {
      &__content {
        height: 260px;
      }

      &__actions {
        display: flex;
        justify-content: center;
      }
    }

    .button {
      color : $primary;
      &:hover {
        color: $primary-dark;
        cursor: pointer;
      }
    }
  `,
})
export class CropperComponent {
  @Input() imageFile!: File | null;

  @Output() changed: EventEmitter<File>;

  public croppedImage!: string;

  constructor() {
    this.changed = new EventEmitter<File>();
  }

  public imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64 as string;
  }

  public onCrop(): void {
    const file = dataURLtoFile(this.croppedImage, this.imageFile);

    this.changed.emit(file);
  }
}

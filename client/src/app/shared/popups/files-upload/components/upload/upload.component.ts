import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styles: `
    @import 'styles/colors';

    .upload {
      padding: 12px;
      border-radius: 4px;
      background: rgba(0,0,0,0.05);
      margin-top: 12px;

      &__progress {
        width: 100%;
        &::-webkit-progress-value {
          transition: width 0.1s ease;
        }
      }

      &__info {
        display: flex;
        justify-content: space-between;
      }

    }

    .button {
      display: inline-block;
      margin: 2px 4px;
    }

    .app-a { margin-right: 0; }
  `
})
export class UploadComponent {}

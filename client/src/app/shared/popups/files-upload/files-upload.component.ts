import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-files-upload',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './files-upload.component.html',
  styleUrl: './files-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesUploadComponent { }

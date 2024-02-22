import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core'
import { DomSanitizer, SafeStyle } from '@angular/platform-browser'

@Component({
  selector: 'app-user-photo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="photo" [style.backgroundImage]="safePhotoURL"></div>
  `,
  styles: `
    @import 'styles/colors';

    .photo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: $secondary;
      background-size: cover;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPhotoComponent {
  @Input() photoURL!: string;

  private _sanitizer: DomSanitizer;

  constructor() {
    this._sanitizer = inject(DomSanitizer);
  }

  get safePhotoURL(): SafeStyle | null {
    return this.photoURL
      ? this._sanitizer.bypassSecurityTrustStyle(`url(${this.photoURL})`)
      : null;
  }
}

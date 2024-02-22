import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { ThemePalette } from '@angular/material/core'
import {
  MatProgressSpinnerModule,
  ProgressSpinnerMode,
} from '@angular/material/progress-spinner'

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="wrapper">
      <div class="spinner">
        <mat-progress-spinner
          [color]="color"
          [mode]="mode"
        ></mat-progress-spinner>
      </div>
    </div>
  `,
  styles: `
    .wrapper {
      position: absolute;
      top:0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: 99;
      background: rgba(255,255,255,0.65);
      border-radius: 8px;
    }

    .spinner {
      width: 100px;
      height: 100px;
      left: calc(50% - 50px);
      top: calc(50% - 50px);
      position: relative;
    }
  `,
})
export class SpinnerComponent {
  color: ThemePalette;
  mode: ProgressSpinnerMode;

  constructor() {
    this.color = 'primary';
    this.mode = 'indeterminate';
  }
}

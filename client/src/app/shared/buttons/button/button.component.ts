import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

export type ButtonType = 'button' | 'submit';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],
    template: `
        <button class="app-button" [type]="type">
            <ng-content></ng-content>
        </button>
    `,
    styles: ``
})
export class ButtonComponent {
    @Input() type: ButtonType;

    constructor() {
        this.type = 'button';
    }
}

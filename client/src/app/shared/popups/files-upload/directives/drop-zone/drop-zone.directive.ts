import { Directive, EventEmitter, HostListener, Output } from '@angular/core'

@Directive({
  selector: '[appDropZone]',
  standalone: true,
})
export class DropZoneDirective {
  @Output() dropped: EventEmitter<FileList>;
  @Output() hovered: EventEmitter<boolean>;

  constructor() {
    this.dropped = new EventEmitter<FileList>();
    this.hovered = new EventEmitter<boolean>();
  }

  @HostListener('drop', ['$event']) onDrop($event: any): void {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event']) onDragOver($event: any): void {
    $event.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event']) onDragLeave($event: any): void {
    $event.preventDefault();
    this.hovered.emit(false);
  }
}

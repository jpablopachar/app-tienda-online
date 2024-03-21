import { CommonModule } from '@angular/common'
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  WritableSignal,
  inject,
  signal
} from '@angular/core'
import { Storage, StorageError, StorageReference, UploadTask, UploadTaskSnapshot, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage'
import { Observable, Subject, of } from 'rxjs'
import { FileSizePipe } from '../../pipes'

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FileSizePipe],
  templateUrl: './upload.component.html',
  styles: `
    @import "styles/colors.scss";

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
export class UploadComponent implements OnInit, OnDestroy {
  @Input() file!: File;

  @Output() completed: EventEmitter<string>;

  private _cdr: ChangeDetectorRef;
  private _storage: Storage;
  private _destroy: Subject<void>;

  public task!: UploadTask;
  public percentage!: Observable<number>;
  public snapshot$!: Observable<UploadTaskSnapshot | undefined>;

  public $downloadURL!: WritableSignal<string | null>;

  constructor() {
    this.completed = new EventEmitter<string>();
    this._destroy = new Subject<void>();

    this.$downloadURL = signal(null);

    this._cdr = inject(ChangeDetectorRef);
    this._storage = inject(Storage);
  }

  ngOnInit(): void {
    this._startUpload();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  private _startUpload(): void {
    const path = `${this.file.type.split('/')[0]}/${Date.now()}_${
      this.file.name
    }`;
    const storageRef: StorageReference = ref(this._storage, path);

    this.task = uploadBytesResumable(storageRef, this.file);

    this.task.on('state_changed', (snapshot: UploadTaskSnapshot): void => {
      const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      this.snapshot$ = of(snapshot);
      this.percentage = of(progress);

      this._cdr.detectChanges();
    }, (error: StorageError): void => {
      console.error('Se ha producido un error: ', error);
    }, async (): Promise<void> => {
      const url: string = await getDownloadURL(storageRef);

      this.$downloadURL.set(url);
      this._cdr.detectChanges();

      this.completed.emit(this.$downloadURL() as string);
      
    })
  }
}

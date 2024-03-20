import { CommonModule } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  WritableSignal,
  inject
} from '@angular/core'
import { Storage, StorageReference, UploadTask, UploadTaskSnapshot, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage'
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
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input() file!: File;

  @Output() completed: EventEmitter<string>;

  private _storage: Storage;
  private _destroy;

  public task!: UploadTask;
  public percentage!: Observable<number>;
  public snapshot$!: Observable<UploadTaskSnapshot | undefined>;
  public downloadURL!: WritableSignal<string>;

  constructor() {
    this.completed = new EventEmitter<string>();
    this._destroy = new Subject<void>();

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

    // this.task = this._storage.upload(path, this.file);
    this.task = uploadBytesResumable(storageRef, this.file);

    this.task.on('state_changed', (snapshot) => {
      const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.percentage = of(progress);
      console.log('Progreso: ', progress);
    }, (error) => {
      console.error('Error: ', error);
    }, async () => {
      console.log('Completado');
      const url = await getDownloadURL(storageRef);
      console.log('URL del archivo: ', url);
    })
    /* this.percentage$ = this.task.percentageChanges();
    this.snapshot$ = this.task.snapshotChanges() as Observable<
      UploadTaskSnapshot | undefined
    >;

    this.snapshot$
      .pipe(
        takeUntil(this._destroy),
        finalize(async (): Promise<void> => {
          const storageRefObservable$: Observable<any> =
            storageRef.getDownloadURL();

          this.downloadURL.set(await lastValueFrom(storageRefObservable$));

          this.completed.emit(this.downloadURL());
        })
      )
      .subscribe(); */
  }
}

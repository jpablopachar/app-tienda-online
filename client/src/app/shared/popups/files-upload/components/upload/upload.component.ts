import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  WritableSignal,
  inject,
} from '@angular/core'
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage'
import { UploadTaskSnapshot } from '@angular/fire/storage'
import { Observable, Subject, finalize, lastValueFrom, takeUntil } from 'rxjs'
import { FileSizePipe } from '../../pipes'

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FileSizePipe],
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input() file!: File;

  @Output() completed: EventEmitter<string>;

  private _storage: AngularFireStorage;
  private _destroy;

  public task!: AngularFireUploadTask;
  public percentage$!: Observable<number | undefined>;
  public snapshot$!: Observable<UploadTaskSnapshot | undefined>;
  public downloadURL!: WritableSignal<string>;

  constructor() {
    this.completed = new EventEmitter<string>();
    this._destroy = new Subject<void>();

    this._storage = inject(AngularFireStorage);
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
    const storageRef: AngularFireStorageReference = this._storage.ref(path);

    this.task = this._storage.upload(path, this.file);
    this.percentage$ = this.task.percentageChanges();
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
      .subscribe();
  }
}

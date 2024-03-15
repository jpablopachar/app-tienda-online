import { CommonModule } from '@angular/common'
import { HttpParams } from '@angular/common/http'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  WritableSignal,
  inject,
  signal,
} from '@angular/core'
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { Pagination } from '@app/models/server'
import * as fromRoot from '@app/store'
import { Store, select } from '@ngrx/store'
import { Subject, takeUntil } from 'rxjs'
import * as fromProducts from '../../store/products'

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  template: `
    <mat-paginator
      (page)="paginatorEvent($event)"
      #matPaginator
      [pageSize]="pageSize()"
      [pageSizeOptions]="pages()"
      [length]="pageCount()"
    >
    </mat-paginator>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;

  @Input() pagination!: Pagination;

  public pageCount: WritableSignal<number>;
  public pageSize: WritableSignal<number>;
  public pages: WritableSignal<number[]>;

  private _store: Store<fromRoot.State>;
  private _paginatorParams!: HttpParams | null;
  private _destroy: Subject<any>;

  constructor() {
    this._store = inject(Store);

    this.pageCount = signal(0);
    this.pageSize = signal(10);
    this.pages = signal([1, 2, 5, 10]);

    this._destroy = new Subject();
  }

  ngOnInit(): void {
    this._store
      .pipe(takeUntil(this._destroy))
      .pipe(select(fromProducts.selectPaginationRequest))
      .subscribe((data: HttpParams | null): void => {
        this._paginatorParams = data;
      });

    this._store
      .pipe(takeUntil(this._destroy))
      .pipe(select(fromProducts.selectGetShop))
      .subscribe((data: Pagination | null): void => {
        this.pageSize.set(data?.pageSize as number);
        this.pageCount.set(data?.pageCount as number);

        if (this.matPaginator) {
          this.matPaginator.pageIndex = data?.pageIndex as number;
        }
      });
  }

  public paginatorEvent(event: PageEvent): void {
    this._paginatorParams = this._paginatorParams!.delete('pageIndex');
    this._paginatorParams = this._paginatorParams.delete('pageSize');

    this._paginatorParams = this._paginatorParams.set(
      'pageIndex',
      event.pageIndex + 1
    );
    this._paginatorParams = this._paginatorParams.set(
      'pageSize',
      event.pageSize
    );

    this._store.dispatch(
      fromProducts.getProductsAction({
        paginationRequest: this._paginatorParams,
        paramsUrl: this._paginatorParams.toString(),
      })
    );
  }

  ngOnDestroy(): void {
    this._destroy.next(null);
    this._destroy.complete();
  }
}

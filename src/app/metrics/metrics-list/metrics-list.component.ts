import {Component, OnDestroy} from '@angular/core';
import {Metrics, MetricsService} from '../../metrics.service';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';

@Component({
  selector: 'app-body-metrics',
  templateUrl: './metrics-list.component.html',
  styleUrls: ['./metrics-list.component.scss']
})
export class MetricsListComponent implements OnDestroy {
  private readonly unsubscribe$ = new Subject<boolean>();
  metrics: Observable<Metrics[]>;
  displayedColumns: string[] = ['id', 'date', 'view'];
  isLoading = true;

  constructor(private metricsService: MetricsService) {
    this.metrics = of(true).pipe(
      switchMap(() => this.metricsService.getData()),
      tap(() => this.isLoading = false)
    );
  }

  remove(id) {
    this.metricsService.delete(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}

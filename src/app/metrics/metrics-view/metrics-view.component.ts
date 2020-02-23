import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MetricsService} from '../../metrics.service';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-metrics-view',
  templateUrl: './metrics-view.component.html',
  styleUrls: ['./metrics-view.component.scss']
})
export class MetricsViewComponent {
  metrics$;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private metricsService: MetricsService
  ) {
    this.metrics$ = this.route.params.pipe(
      switchMap(params => this.metricsService.get(params.id)),
      tap(() => this.isLoading = false)
    );
  }

}

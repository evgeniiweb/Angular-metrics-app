import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MetricsService} from '../../metrics.service';
import {switchMap, tap} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-metrics-edit',
  templateUrl: './metrics-edit.component.html',
  styleUrls: ['./metrics-edit.component.scss']
})
export class MetricsEditComponent implements OnInit, OnDestroy {
  metricsForm;
  metrics;
  updateSubscription;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private metricsService: MetricsService
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        return this.metricsService.get(params.id);
      }),
      tap(() => this.isLoading = false),
    ).subscribe((metrics: any) => {
      this.metrics = metrics;
      this.metricsForm = new FormGroup({
        height: new FormControl(metrics.height),
        weight: new FormControl(metrics.weight),
        neck: new FormControl(metrics.neck),
        shoulders: new FormControl(metrics.shoulders),
        chest: new FormControl(metrics.chest),
        biceps: new FormGroup({
          left: new FormControl(metrics.biceps.left),
          right: new FormControl(metrics.biceps.right)
        }),
        forearm: new FormGroup({
          left: new FormControl(metrics.forearm.left),
          right: new FormControl(metrics.forearm.right)
        }),
        waist: new FormControl(metrics.waist),
        hips: new FormControl(metrics.hips),
        thigh: new FormGroup({
          left: new FormControl(metrics.thigh.left),
          right: new FormControl(metrics.thigh.right)
        }),
        calf: new FormGroup({
          left: new FormControl(metrics.calf.left),
          right: new FormControl(metrics.calf.right)
        })
      });
    });
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  onSubmit() {
    this.updateSubscription = this.metricsService.update({
      ...this.metrics,
      height: this.metricsForm.value.height,
      weight: this.metricsForm.value.weight,
      neck: this.metricsForm.value.neck,
      shoulders: this.metricsForm.value.shoulders,
      chest: this.metricsForm.value.chest,
      biceps: {
        left: this.metricsForm.value.biceps.left,
        right: this.metricsForm.value.biceps.right,
      },
      forearm: {
        left: this.metricsForm.value.forearm.left,
        right: this.metricsForm.value.forearm.right,
      },
      waist: this.metricsForm.value.waist,
      hips: this.metricsForm.value.hips,
      thigh: {
        left: this.metricsForm.value.thigh.left,
        right: this.metricsForm.value.thigh.right,
      },
      calf: {
        left: this.metricsForm.value.calf.left,
        right: this.metricsForm.value.calf.right,
      }
    }).subscribe(() => {
      this.router.navigate(['/metrics/list']).then();
    });
  }
}

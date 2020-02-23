import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MetricsService} from '../../metrics.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-metrics-create',
  templateUrl: './metrics-create.component.html',
  styleUrls: ['./metrics-create.component.scss'],
  providers: [MetricsService]
})
export class MetricsCreateComponent {
  metricsForm = new FormGroup({
    height: new FormControl(''),
    weight: new FormControl(''),
    neck: new FormControl(''),
    shoulders: new FormControl(''),
    chest: new FormControl(''),
    biceps: new FormGroup({
      left: new FormControl(''),
      right: new FormControl('')
    }),
    forearm: new FormGroup({
      left: new FormControl(''),
      right: new FormControl('')
    }),
    waist: new FormControl(''),
    hips: new FormControl(''),
    thigh: new FormGroup({
      left: new FormControl(''),
      right: new FormControl('')
    }),
    calf: new FormGroup({
      left: new FormControl(''),
      right: new FormControl('')
    })
  });

  constructor(
    private router: Router,
    private metricsService: MetricsService
  ) {
  }

  onSubmit() {
    if (this.metricsForm.invalid) {
      return;
    }

    const metrics = {
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
      },
      date: new Date()
    };

    this.metricsService.create(metrics).subscribe(() => {
      this.metricsForm.reset();
      this.router.navigate(['/metrics/list']).then();
    });
  }
}

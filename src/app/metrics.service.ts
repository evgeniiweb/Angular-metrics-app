import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

export interface Metrics {
  height: string;
  weight: string;
  neck: string;
  shoulders: string;
  chest: string;
  biceps: object;
  forearm: object;
  waist: string;
  hips: string;
  thigh: object;
  calf: object;
  date: Date;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  private readonly refresh$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {
  }

  getData(): Observable<Metrics[]> {
    return this.refresh$.pipe(
      switchMap(() => this.http.get<Metrics[]>(`${environment.server}/metrics`))
    );
  }

  create(metrics: Metrics): Observable<Metrics> {
    return this.http.post<Metrics>(`${environment.server}/metrics`, metrics)
      .pipe(
        tap(() => {
          this.refresh$.next(true);
        })
      );
  }

  get(id: number): Observable<Metrics> {
    return this.http.get<Metrics>(`${environment.server}/metrics/${id}`)
      .pipe(
        tap(() => this.refresh$.next(true))
      );
  }

  update(metrics: Metrics): Observable<Metrics> {
    return this.http.patch<Metrics>(`${environment.server}/metrics/${metrics.id}`, metrics)
      .pipe(
        tap(() => this.refresh$.next(true))
      );
  }

  delete(id: number): Observable<Metrics> {
    return this.http.delete<Metrics>(`${environment.server}/metrics/${id}`)
      .pipe(
        tap(() => this.refresh$.next(true))
      );
  }
}

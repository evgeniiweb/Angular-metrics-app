import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AboutComponent} from './about/about.component';
import {MetricsListComponent} from './metrics/metrics-list/metrics-list.component';
import {MetricsCreateComponent} from './metrics/metrics-create/metrics-create.component';
import {MetricsViewComponent} from './metrics/metrics-view/metrics-view.component';
import {MetricsEditComponent} from './metrics/metrics-edit/metrics-edit.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'about', component: AboutComponent},
  {path: 'metrics/list', component: MetricsListComponent},
  {path: 'metrics/create', component: MetricsCreateComponent},
  {path: 'metrics/:id/view', component: MetricsViewComponent},
  {path: 'metrics/:id/edit', component: MetricsEditComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

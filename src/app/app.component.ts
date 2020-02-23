import {Component} from '@angular/core';

interface NavigationLink {
  route: string;
  icon: string;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Body metrics';
  links: NavigationLink[] = [
    {route: '/dashboard', icon: 'dashboard', title: 'Dashboard'},
    {route: '/metrics/list', icon: 'notes', title: 'Metrics'},
    {route: '/about', icon: 'info', title: 'About'}
  ];
}

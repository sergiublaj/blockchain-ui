import { Component } from '@angular/core';
import { appConfig } from '../../core/app.config';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  title = appConfig.title;
}

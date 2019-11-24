import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './animations/nav.animation';
import { LoggerService } from './services/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit {
  title = 'rumdemo';
  navstate = false;
  constructor(private logService: LoggerService) {}
  animateRoute(outlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['title'];
  }
  ngOnInit(){
    this.logService.refreshData();
    this.logService.registerTimer();
  }
}

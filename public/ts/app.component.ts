import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {AboutComponent} from './about/about.component';
import {ExperimentsComponent} from './experiments/experiments.component';
import {HomeComponent} from './home/home.component';
import {StateService} from './common/state.service';

@Component({
  selector: 'app',
  templateUrl: '../../templates/app.component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [StateService]
})
@RouteConfig([
  {path: '/',            name: 'Home',        component: HomeComponent, useAsDefault: true },
  {path: '/about',       name: 'About',       component: AboutComponent },
  {path: '/experiments', name: 'Experiments', component: ExperimentsComponent }
])
export class AppComponent {}

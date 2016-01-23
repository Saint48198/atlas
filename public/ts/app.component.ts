import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {AboutComponent} from './about/about.component';
import {ExperimentsComponent} from './experiments/experiments.component';
import {HomeComponent} from './home/home.component';
import {RegionComponent} from './region/region.component';
import {CountryComponent} from './country/country.component';
import {RegionService} from './common/region.service';
import {CountryService} from './common/country.service';
import {WikipediaService} from './common/wikipedia.service';

@Component({
  selector: 'app',
  templateUrl: '../../templates/app.component.html',
  directives: [ ROUTER_DIRECTIVES ],
  providers: [RegionService, CountryService, WikipediaService]
})
@RouteConfig([
  { path: '/',            name: 'Home',        component: HomeComponent,        useAsDefault: true  },
  { path: '/about',       name: 'About',       component: AboutComponent                            },
  { path: '/experiments', name: 'Experiments', component: ExperimentsComponent                      },
  { path: '/region/:id',  name: 'Region',      component: RegionComponent                           },
  { path: '/country/:id', name: 'Country',     component: CountryComponent                          }
])
export class AppComponent {}

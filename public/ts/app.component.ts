import {Component}                              from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {Title}                                  from 'angular2/platform/browser';
import {AboutComponent}                         from './about/about.component';
import {HomeComponent}                          from './home/home.component';
import {RegionComponent}                        from './region/region.component';
import {CountryComponent}                       from './country/country.component';
import {RegionService}                          from './common/region.service';
import {CountryService}                         from './common/country.service';
import {WikipediaService}                       from './common/wikipedia.service';

@Component({
  selector: 'app',
  templateUrl: '../../templates/app.component.html',
  directives: [ ROUTER_DIRECTIVES ],
  providers: [RegionService, CountryService, WikipediaService, Title]
})
@RouteConfig([
  { path: '/',            name: 'Home',        component: HomeComponent,        useAsDefault: true  },
  { path: '/about',       name: 'About',       component: AboutComponent                            },
  { path: '/region/:id',  name: 'Region',      component: RegionComponent                           },
  { path: '/country/:id', name: 'Country',     component: CountryComponent                          }
])
export class AppComponent {
  constructor(router: Router, title: Title) {
    router.subscribe((url) => {
      const pageTitle = this.returnPageTitleFromUrl(url);

      title.setTitle("Atlas" + pageTitle);
    });
  }

  returnPageTitleFromUrl(url: String) {
    const urlData = url.split("/");
    const title = ": " + urlData[0].charAt(0).toUpperCase() + urlData[0].slice(1);

    return title;
  }
}

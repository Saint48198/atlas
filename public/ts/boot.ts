import {bootstrap}        from 'angular2/platform/browser'
import {ROUTER_PROVIDERS} from 'angular2/router';
import {Http} from 'angular2/http';
import {AppComponent}     from './app.component'

bootstrap(AppComponent, [
  ROUTER_PROVIDERS
]);

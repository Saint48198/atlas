import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class CountryService {
  countries: Array<any>;

  constructor(public http: Http) {}

  getCountry() {
    return this.http.get('/api/country');
  }
}

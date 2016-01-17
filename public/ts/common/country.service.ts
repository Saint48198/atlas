import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class CountryService {
  constructor(public http: Http) {}

  getCountry(regionCode?:string) {
    let url = '/api/country';

    if (regionCode) {
      url = url + '?region=' + regionCode;
    }

    return this.http.get(url);
  }
}

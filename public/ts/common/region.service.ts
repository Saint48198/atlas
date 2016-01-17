import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class RegionService {
  constructor(public http: Http) {}

  getRegion(code?:string) {
    let url = '/api/region';

    if (code) {
      url = url + '?code=' + code;
    }

    return this.http.get(url);
  }
}

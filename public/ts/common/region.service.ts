import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class RegionService {
  regions: Array<any>;

  constructor(public http: Http) {}

  getRegion() {
    return this.http.get('/api/region');
  }
}

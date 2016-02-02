import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Rx';

@Injectable()
export class WikipediaService {
  constructor(public http: Http) {}

  getData(query:string) {
    let url = '/api/wikipedia?name=' + encodeURIComponent(query);

    return this.http.get(url);
  }
}

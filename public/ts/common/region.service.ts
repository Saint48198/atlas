import {Injectable} from 'angular2/core';
import {Region} from './region.model';

declare var fetch: any;

@Injectable()
export class RegionService {
  private regions: Region[] = [];

  getRegions(): Region[] {
    var data = fetch('/api/region', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response)
      return response;
    });
    return data;
  };
}

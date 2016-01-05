import {Injectable} from 'angular2/core';
import {Region} from './region.model';
import {EasyFetch} from './easy-fetch'

@Injectable()
export class RegionService {
  private regions: Region[] = [];

  constructor() {
    let self = this;
    new EasyFetch().getJSON({
      url: '/api/region',
      cacheBusting: true
    }).then(function (data) {// on success
      self.regions =  data['resp'];
    }, function (error) {// on reject
      console.error('An error occured!');
      console.error(error.message ? error.message : error);
      self.regions = [];
    });
  }

  getRegions(): Region[] {
    return this.regions;
  }
}

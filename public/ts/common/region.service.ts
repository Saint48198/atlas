import {Injectable} from 'angular2/core';
import {Region} from './region.model';
import {EasyFetch} from './easy-fetch'

@Injectable()
export class RegionService {
  private regions: Region[] = [];

  constructor() {}

  fetch(successCallback:Function, errorCallback:Function) {
    let self = this;
    new EasyFetch().getJSON({
      url: '/api/region',
      cacheBusting: true
    }).then(function (data) {// on success
      self.regions =  data['resp'];

      if (successCallback) {
        successCallback.apply(self);
      }
    }, function (error) {// on reject
      console.error('An error occured!');
      console.error(error.message ? error.message : error);
      self.regions = [];

      if (errorCallback) {
        errorCallback.apply(self);
      }
    });
  }

  getRegions(): Region[] {
    return this.regions;
  }
}

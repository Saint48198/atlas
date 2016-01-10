import {Injectable} from 'angular2/core';
import {Region} from './region.model';
import {EasyFetch} from './easy-fetch'

@Injectable()
export class RegionService {
  private regions: Region[] = [];

  constructor() {}

  fetch(successCallback:Function, errorCallback:Function, id?:String) {
    let self = this;
    let url = '/api/region';

    if (id) {
      url = url + '?code=' + id;
    }

    new EasyFetch().getJSON({
      url: url,
      cacheBusting: true
    }).then(function (data) {// on success
      self.regions =  data['resp'];

      successCallback.apply(self);

    }, function (error) {// on reject
      console.error('An error occured!');
      console.error(error.message ? error.message : error);
      self.regions = [];

      errorCallback.apply(self);
    });

    return;
  }

  getRegion(): Region[] {
    return this.regions;
  }
}

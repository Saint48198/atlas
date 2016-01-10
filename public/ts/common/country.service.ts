import {Injectable} from 'angular2/core';
import {Country} from './country.model';
import {EasyFetch} from './easy-fetch'

@Injectable()
export class CountryService {
  private countries: Country[] = [];

  constructor() {}

  fetch(successCallback:Function, errorCallback:Function, id?:String, region?:String, code?: String) {
    let self = this;
    let url = '/api/country';

    if (region) {
      url = url + '?region=' + region;
    }

    if (id) {
      url = url + '?id=' + id;
    }

    if (code) {
      url = url + '?code=' + code;
    }

    new EasyFetch().getJSON({
      url: url,
      cacheBusting: true
    }).then(function (data) {// on success
      self.countries =  data['resp'];

      successCallback.apply(self);

    }, function (error) {// on reject
      console.error('An error occured!');
      console.error(error.message ? error.message : error);
      self.countries = [];

      errorCallback.apply(self);
    });

    return;
  }

  getCountry(): Country[] {
    return this.countries;
  }
}

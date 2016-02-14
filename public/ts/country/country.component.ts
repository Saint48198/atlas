import {Component, OnInit}                      from 'angular2/core';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {GoogleMapComponent}                     from '../common/google-map.component';
import {Country}                                from '../common/country.model';
import {CountryService}                         from '../common/country.service';
import {WikipediaService}                       from '../common/wikipedia.service';

declare var palette:any;

@Component({
  selector: 'country',
  directives: [ROUTER_DIRECTIVES, GoogleMapComponent],
  templateUrl: '../../templates/country/country.component.html',
})
export class CountryComponent implements OnInit {
  title: string = '';
  body:  string = '';
  country: Country;
  id: string;
  regionId: string;
  mapData = [];
  mapOptions = {};

  constructor(private _router: Router,
              private _routeParams: RouteParams,
              private _CountryService: CountryService,
              private _WikipediaService: WikipediaService) {

    this.id = _routeParams.get('id');
    this.mapOptions = {
      colorAxis:  {minValue: 0, maxValue: 0,  colors: [] },
      legend: 'none',
      backgroundColor: {fill:'#FFFFFF',stroke:'#FFFFFF' ,strokeWidth:0 },
      datalessRegionColor: '#f5f5f5',
      displayMode: 'regions',
      enableRegionInteractivity: 'true',
      resolution: 'countries',
      sizeAxis: {minValue: 1, maxValue:1,minSize:10,  maxSize: 10},
      region: this.id,
      keepAspectRatio: true,
      tooltip: {textStyle: {color: '#444444'}, trigger:'focus', isHtml: false}
    };


    _CountryService.getCountry(null, this.id).subscribe((res) => {
      const data = res.json()['resp'];

      this.mapData = data;
      this.country = data[0];
      this.title = this.country['displayName'];
      this.regionId = this.country['region'];

      this.getWikipediaData(_WikipediaService, this.country['name'])
    });


  }

  ngOnInit() {}

  ngAfterViewInit() {}

  getWikipediaData(service: WikipediaService, query: string) {
    service.getData(query).subscribe((res) => {
      this.body = res.json()['resp'][2][0];
    });
  }
}

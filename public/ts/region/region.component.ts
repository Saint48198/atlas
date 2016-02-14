import {Component, OnInit}    from 'angular2/core';
import {RouteParams, Router}  from 'angular2/router';
import {GoogleMapComponent}   from '../common/google-map.component';
import {Region}               from '../common/region.model';
import {Country}              from '../common/country.model';
import {RegionService}        from '../common/region.service';
import {CountryService}       from '../common/country.service';

declare var palette:any;

@Component({
  selector: 'region',
  providers: [RegionService, CountryService],
  templateUrl: '../../templates/region/region.component.html',
  bindings: [RegionService, CountryService],
  directives: [GoogleMapComponent]
})
export class RegionComponent implements OnInit {
  title: string = '';
  body:  string = 'Select a country using the map or from the list below.';
  countries: Array<Country> = [];
  id: string;
  mapOptions:Object = {};

  constructor(private _router: Router,
              private _routeParams: RouteParams,
              private _RegionService: RegionService,
              private _CountryService: CountryService) {


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

    const regionInfo = _RegionService.getRegion(this.id);
    const countriesInfo = _CountryService.getCountry(this.id);

    regionInfo.subscribe((res) => {
      this.title = res.json()['resp'][0]['name'];
    });

    countriesInfo.subscribe((res) => {
      this.countries = res.json()['resp'].map(function(obj) {
        return new Country(obj);
      });
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  onSelect(country:Country) {
    this._router.navigate( ['Country', { id: country['code2'] }] );
  }
}

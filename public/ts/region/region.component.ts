import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {GoogleMapComponent} from '../common/google-map.component';
import {Region} from '../common/region.model';
import {Country} from '../common/country.model';
import {RegionService} from '../common/region.service';
import {CountryService} from '../common/country.service';

const colorValues: Array<string> = ['#ffffff', '#ffffee', '#f0f0ee', '#daf2e9', '#d7dcdd', '#add8c8', '#bbccdd', '#79f2c4', '#aabbdd', '#8899aa', '#00b6e5', '#887711', '#229966', '#886611', '#3f7f67', '#0085a8', '#555577', '#3d494c', '#005566', '#005166', '#113388', '#113388', '#002833', '#002211', '#101111'];

@Component({
  selector: 'region',
  templateUrl: '../../templates/region/region.component.html'
})
export class RegionComponent implements OnInit {
  title: string = '';
  body:  string = 'Select a country using the map or from the list below.';
  countries: Array<Country>;
  id: string;
  promise: Promise<Function>;

  constructor(private _router: Router,
              private _routeParams: RouteParams,
              private _RegionService: RegionService,
              private _CountryService: CountryService) {


    this.id = _routeParams.get('id');

    let regionInfo = _RegionService.getRegion(this.id);
    let countriesInfo = _CountryService.getCountry(this.id);

    regionInfo.subscribe((res) => {
      this.title = res.json()['resp'][0]['name'];
    });

    countriesInfo.subscribe((res) => {
      this.countries = res.json()['resp'].map(function(obj) {
        return new Country(obj);
      });
      this.renderMap();
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  renderMap() {
    let options = {
      colorAxis:  {minValue: 0, maxValue: colorValues.length - 1,  colors: colorValues },
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

    let map = new GoogleMapComponent(options, this.countries, this._router);
    map.ngOnInit();
  }

  onSelect(country:Country) {
    this._router.navigate( ['Country', { id: country['code2'] }] );
  }
}

import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {GoogleMapComponent} from '../common/google-map.component';
import {Country} from '../common/country.model';
import {CountryService} from '../common/country.service';

const colorValues: Array<string> = ['#ffffee', '#ffffff', '#f0f0ee', '#daf2e9', '#d7dcdd', '#add8c8', '#bbccdd', '#79f2c4', '#aabbdd', '#8899aa', '#00b6e5', '#887711', '#229966', '#886611', '#3f7f67', '#0085a8', '#555577', '#3d494c', '#005566', '#005166', '#113388', '#113388', '#002833', '#002211', '#101111'];


@Component({
  selector: 'country',
  templateUrl: '../../templates/country/country.component.html'
})
export class CountryComponent implements OnInit {
  title: string = '';
  body:  string = 'This is the about about body';
  countries: Country[];
  id: string;

  constructor(
    private _router: Router,
    private _routeParams: RouteParams,
    private _CountryService: CountryService) {}

  ngOnInit() {
    this.id = this._routeParams.get('id');
    this._CountryService.fetch(
      () => {
        let country = this._CountryService.getCountry();
        this.title = country[0]['displayName'];
        this.renderMap(country);
      },
      () => {
        console.log('error');
      },
      null,
      null,
      this.id
    );
  }

  ngAfterViewInit() {
  }

  renderMap(data?: Array<Object>) {
    console.log(data);
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

    let map = new GoogleMapComponent(options, data, this._router);
    map.ngOnInit();
  }
}

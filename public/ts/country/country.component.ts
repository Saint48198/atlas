import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {GoogleMapComponent} from '../common/google-map.component';
import {Country} from '../common/country.model';
import {CountryService} from '../common/country.service';
import {WikipediaService} from '../common/wikipedia.service';

const colorValues: Array<string> = ['#ffffee', '#ffffff', '#f0f0ee', '#daf2e9', '#d7dcdd', '#add8c8', '#bbccdd', '#79f2c4', '#aabbdd', '#8899aa', '#00b6e5', '#887711', '#229966', '#886611', '#3f7f67', '#0085a8', '#555577', '#3d494c', '#005566', '#005166', '#113388', '#113388', '#002833', '#002211', '#101111'];


@Component({
  selector: 'country',
  templateUrl: '../../templates/country/country.component.html'
})
export class CountryComponent implements OnInit {
  title: string = '';
  body:  string = '';
  countries: Array<Country>;
  id: string;

  constructor(private _router: Router,
              private _routeParams: RouteParams,
              private _CountryService: CountryService,
              private _WikipediaService: WikipediaService) {

    this.id = _routeParams.get('id');
    _CountryService.getCountry(null, this.id).subscribe((res) => {
      this.countries = res.json()['resp'];
      this.title = this.countries[0]['displayName'];
      this.renderMap(this.countries);
      this.getWikipediaData(_WikipediaService, this.countries[0]['name'])
    });


  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  getWikipediaData(service: WikipediaService, query: string) {
    service.getData(query).subscribe((res) => {
      this.body = res.json()['resp'][2][0];
    });
  }

  renderMap(data?: Array<Object>) {
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

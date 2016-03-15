import {Component, OnInit}      from 'angular2/core';
import {Router}                 from 'angular2/router';
import {NgFor}                  from 'angular2/common';
import {GoogleMapComponent}     from '../common/google-map.component';
import {CountrySearchComponent} from '../common/country-search.component'
import {Region}                 from '../common/region.model';
import {RegionService}          from '../common/region.service';

declare var palette:any;

@Component({
  selector: 'home',
  providers: [RegionService],
  templateUrl: '../../templates/home/home.component.html',
  bindings: [RegionService],
  directives: [GoogleMapComponent, CountrySearchComponent]
})
export class HomeComponent {
  title:string = 'Atlas';
  body:string = 'Welcome to Atlas, the place you learn about the world.';
  regions:Array<Region> = [];
  mapOptions:Object = {};

  constructor(private _router:Router, private _RegionService:RegionService) {
    this.mapOptions = {
      colorAxis: {minValue: 0, maxValue: 0, colors: []},
      legend: 'none',
      backgroundColor: {fill: '#FFFFFF', stroke: '#FFFFFF', strokeWidth: 0},
      datalessRegionColor: '#f5f5f5',
      displayMode: 'regions',
      enableRegionInteractivity: 'true',
      resolution: 'subcontinents',
      sizeAxis: {minValue: 1, maxValue: 1, minSize: 10, maxSize: 10},
      region: 'world',
      keepAspectRatio: true,
      tooltip: {textStyle: {color: '#444444'}, trigger: 'focus', isHtml: false}
    };


    _RegionService.getRegion().subscribe((res) => {
      this.regions = res.json()['resp'].map(function (obj) {
        return new Region(obj);
      }).sort(function (a, b) {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();

        //sort string ascending
        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        return 0; //default return value (no sorting)
      });
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  onSelect(event:Event, region:Region) {
    event.preventDefault();
    this._router.navigate(['Region', {id: region['code']}]);
  }
}

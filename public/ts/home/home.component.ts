import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {NgFor} from 'angular2/common';
import {GoogleMapComponent} from '../common/google-map.component';
import {Region} from '../common/region.model';
import {RegionService} from '../common/region.service';

declare var palette:any;

@Component({
  selector: 'home',
  providers: [RegionService],
  templateUrl: '../../templates/home/home.component.html',
  bindings: [RegionService]
})
export class HomeComponent implements OnInit {
  title: string = 'Atlas';
  body:  string = 'Welcome to Atlas, the place you learn about the world.';
  regions: Array<Region>;

  constructor(private _router: Router, private _RegionService: RegionService) {
    _RegionService.getRegion().subscribe((res) => {
      this.regions = res.json()['resp'].map(function(obj) {
        return new Region(obj);
      }).sort(function(a, b){
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
      this.renderMap();
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  renderMap() {
    const colors = palette('tol-sq', this.regions.length).map((color) => {
      return '#' + color;
    });

    const options = {
      colorAxis:  {minValue: 0, maxValue: colors.length - 1,  colors: colors },
      legend: 'none',
      backgroundColor: {fill:'#FFFFFF',stroke:'#FFFFFF' ,strokeWidth:0 },
      datalessRegionColor: '#f5f5f5',
      displayMode: 'regions',
      enableRegionInteractivity: 'true',
      resolution: 'subcontinents',
      sizeAxis: {minValue: 1, maxValue:1,minSize:10,  maxSize: 10},
      region:'world',
      keepAspectRatio: true,
      tooltip: {textStyle: {color: '#444444'}, trigger:'focus', isHtml: false}
    };

    let map = new GoogleMapComponent(options, this.regions, this._router);
    map.ngOnInit();
  }

  onSelect(region: Region) {
    this._router.navigate( ['Region', { id: region['code'] }] );
  }
}

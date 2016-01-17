import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {NgFor} from 'angular2/common';
import {GoogleMapComponent} from '../common/google-map.component';
import {Region} from '../common/region.model';
import {RegionService} from '../common/region.service';

const colorValues: Array<string> = ['#ffffff', '#ffffee', '#f0f0ee', '#daf2e9', '#d7dcdd', '#add8c8', '#bbccdd', '#79f2c4', '#aabbdd', '#8899aa', '#00b6e5', '#887711', '#229966', '#886611', '#3f7f67', '#0085a8', '#555577', '#3d494c', '#005566', '#005166', '#113388', '#113388', '#002833', '#002211', '#101111'];

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
    var options = {
      colorAxis:  {minValue: 0, maxValue: colorValues.length - 1,  colors: colorValues },
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

    var map = new GoogleMapComponent(options, this.regions, this._router);
    map.ngOnInit();
  }

  onSelect(region: Region) {
    this._router.navigate( ['Region', { id: region['code'] }] );
  }
}

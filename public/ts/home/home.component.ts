import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {GoogleMapComponent} from '../common/google-map.component';
import {Region} from '../common/region.model';
import {RegionService} from '../common/region.service';

const colorValues: Array = ['#ffffff', '#ffffee', '#f0f0ee', '#daf2e9', '#d7dcdd', '#add8c8', '#bbccdd', '#79f2c4', '#aabbdd', '#8899aa', '#00b6e5', '#887711', '#229966', '#886611', '#3f7f67', '#0085a8', '#555577', '#3d494c', '#005566', '#005166', '#113388', '#113388', '#002833', '#002211', '#101111'];

@Component({
  selector: 'home',
  templateUrl: '../../templates/home/home.component.html'
})
export class HomeComponent {
  title: string = 'Atlas';
  body:  string = 'Welcome to Atlas, the place you learn about the world.';
  regions: Region[];

  constructor(private _RegionService: RegionService) {}

  ngOnInit() {
    this._RegionService.fetch(
      () => {
        this.renderMap();
      },
      () => {
        console.log('error');
      }
    );
  }

  ngAfterViewInit() {
  }

  renderMap() {
    console.log(this);
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

    var map = new GoogleMapComponent(options, this._RegionService.getRegions());
  }
}

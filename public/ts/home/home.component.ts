import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {GoogleMapComponent} from '../common/google-map.component';
import {Region} from '../common/region.model';
import {RegionService} from '../common/region.service';

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
    this.regions = this._RegionService.getRegions();
  }

  ngAfterViewInit() {
    var options = {
      colorAxis:  {minValue: 0, maxValue: 0,  colors: []},
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
    var map = new GoogleMapComponent(options, this.regions);
  }
}

import {Component} from 'angular2/core';

@Component({
  selector: 'region',
  templateUrl: '../../templates/region/region.component.html'
})
export class RegionComponent {
  title: string = 'Region Page';
  body:  string = 'This is the about about body';
}

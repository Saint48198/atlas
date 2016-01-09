import {Component} from 'angular2/core';

@Component({
  selector: 'about',
  templateUrl: '../../templates/about/about.component.html'
})
export class CountryComponent {
  title: string = 'About Page';
  body:  string = 'This is the about about body';
}

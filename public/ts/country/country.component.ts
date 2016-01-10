import {Component} from 'angular2/core';

@Component({
  selector: 'country',
  templateUrl: '../../templates/country/country.component.html'
})
export class CountryComponent {
  title: string = 'Country Page';
  body:  string = 'This is the about about body';
}

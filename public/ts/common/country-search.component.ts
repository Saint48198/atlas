import {Component, OnInit}  from 'angular2/core';
import {Router}             from 'angular2/router';


@Component({
  selector: 'countrySearch',
  templateUrl: '../../../templates/country-search/country-search.html'
})

export class CountrySearchComponent implements OnInit {
  options:Object;

  constructor(options:Object) {
    this.options = options;
  }

  ngOnInit() {

  }

  findCountries(country: String) {
    console.log(country);
  }
}

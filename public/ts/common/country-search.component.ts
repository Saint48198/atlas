import {Component, OnInit}    from 'angular2/core';
import {Router}               from 'angular2/router';
import {Country}              from '../common/country.model';
import {CountryService}       from '../common/country.service';


@Component({
  providers: [CountryService],
  selector: 'countrySearch',
  templateUrl: '../../../templates/country-search/country-search.html',
  bindings: [CountryService],
})

export class CountrySearchComponent implements OnInit {
  countries: Array<Country> = [];
  countrySerice: CountryService;
  action: any;
  interval: number = 2000;

  constructor(private _router: Router,
              private _CountryService: CountryService) {}

  ngOnInit() {}

  findCountries(query: String) {
    const countriesInfo = this._CountryService.getCountry(null, null, query);

    clearTimeout(this.action);

    if (query) {
      this.action = setTimeout(() => {
        countriesInfo.subscribe((res) => {
          this.countries = res.json()['resp'].map(function(obj) {
            return new Country(obj);
          });
        });
      }, this.interval);
    }
  }

  gotoCountry(country: String) {

  }

  onSelect(country: Country) {
    this._router.navigate( ['Country', { id: country['code2'] }] );
  }
}

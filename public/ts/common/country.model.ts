export class Country {
  id: number;
  name: string;
  displayName: string;
  code2: string;
  code3: string;
  num: string;
  region: string;

  constructor(countryInfo:Object) {
    this.id = countryInfo['id'];
    this.name = countryInfo['name'];
    this.displayName = countryInfo['displayName'];
    this.code2 = countryInfo['code2'];
    this.code3 = countryInfo['code3'];
    this.num = countryInfo['num'];
    this.region = countryInfo['region'];
  }
}

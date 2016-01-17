export class Region {
  name: string;
  code: string;

  constructor(data:Object) {
    this.name = data['name'];
    this.code = data['code'];
  }
}

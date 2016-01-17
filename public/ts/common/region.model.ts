export class Region {
  id: number;
  name: string;
  code: string;
  constructor(regionInfo:Object) {
    this.id = regionInfo['id'];
    this.name = regionInfo['name'];
    this.code = regionInfo['code'];
  }
}

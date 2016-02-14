import {Component, Input}  from 'angular2/core';
import {Router}     from 'angular2/router';
import {OnChanges} from "angular2/core";
import {runInThisContext} from "vm";

declare var google: any;
declare var palette:any;

@Component({
  selector: 'google-map',
  templateUrl: '../../../templates/google-map/google-map.html'
})
export class GoogleMapComponent implements OnChanges{
  colors: Array<any> = [];
  uOptions: Object = {};

  @Input() data: Array<any> = [];
  @Input() options: Object = {};

  // include the router param in the constructor in order to user navigate events on map clicks
  constructor(private _router: Router) {}


  // ngOnChange event is fired when the service is complete and has update the data input
  ngOnChanges() {
    if (this.data.length >  1) {
      this.colors = palette('tol-sq', this.data.length).map((color) => {
        return '#' + color;
      });

      this.options = this._updateOptions(this.colors);

      this._drawVisualization();
    } else if (this.data.length === 1) {
      this.colors = ['#f6851b'];
      this.options = this._updateOptions(this.colors);
      this._drawVisualization();
    }

  }

  private _drawVisualization() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
    data.addColumn('number', 'Value');
    data.addColumn({type:'string', role:'tooltip'});

    const ivalue = {};
    let type = 'Region';

    this.data.forEach((value, index) => {
      let code = value['code'];
      let name = value['name'];

      if (code === undefined) {
        code = value['code2'];
        type = 'Country';
      }

      data.addRows([[{v:code, f:name }, index, '']]);
      ivalue[code] = '';
    });

    let container = document.getElementById('container-map');
    if (container) {
      let map = new google.visualization.GeoChart(document.getElementById('container-map'));
      map.draw(data, this.options);

      google.visualization.events.addListener(map, 'regionClick', this._handleMapClick.bind(this, type));
    }
  }

  private _handleMapClick(type, e) {
    this._router.navigate([type, { id: e.region }]);
  }

  private _updateOptions(colors: Array<any>) {
    const uOptions = this.options;
    const colorAxis = this.options['colorAxis'];
    colorAxis['maxValue'] = this.data.length - 1;
    colorAxis['colors'] =  this.colors;

    uOptions['colorAxis'] = colorAxis;

    return uOptions;
  }
}

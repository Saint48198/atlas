import {Component, OnInit}  from 'angular2/core';
import {Router}             from 'angular2/router';

declare var google: any;

@Component({
  selector: 'map',
  templateUrl: '../../../templates/google-map/google-map.html'
})

export class GoogleMapComponent implements OnInit {
  options: Object;
  mapData: Array<Object>;

  constructor(
    options: Object,
    data: Array<Object>,
    private _router: Router) {
      this.options = options;
      this.mapData = data;
  }

  ngOnInit() {
    this.drawVisualization();
  }

  drawVisualization() {
    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
    data.addColumn('number', 'Value');
    data.addColumn({type:'string', role:'tooltip'});
    let ivalue = {};
    let type = 'Region';

    this.mapData.forEach((value, index) => {
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

      google.visualization.events.addListener(map, 'regionClick', this.handleMapClick.bind(this, type));
    }
  }

  handleMapClick(type, e) {
    this._router.navigate([type, { id: e.region }]);
  }
}

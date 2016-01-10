import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

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

    this.mapData.forEach((value, index) => {
      data.addRows([[{v:value['code'], f:value['name'] }, index, '']]);
      ivalue[value['code']] = '/region?id=' + value['code'];
    });

    let container = document.getElementById('container-map');
    if (container) {
      let map = new google.visualization.GeoChart(document.getElementById('container-map'));
      map.draw(data, this.options);

      google.visualization.events.addListener(map, 'regionClick', this.handleMapClick.bind(this));
    }
  }

  handleMapClick(e) {
    this._router.navigate(['Region', { id: e.region }]);
  }
}

import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

declare var google: any;

@Component({
  selector: 'map',
  templateUrl: '../../../templates/google-map/google-map.html'
})

export class GoogleMapComponent implements OnInit {
  options: {};
  mapData: {};

  constructor(
    options: Object,
    data: Object,
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

    this.mapData.forEach(function (value, index) {
      data.addRows([[{v:value.code, f:value.name }, index, '']]);
      ivalue[value.code] = '/region?id=' + value.code;
    });

    let chart = new google.visualization.GeoChart(document.getElementById('container-map'));
    chart.draw(data, this.options);

    google.visualization.events.addListener(chart, 'regionClick', this.handleMapClick.bind(this));
  }

  handleMapClick(e) {
    this._router.navigate(['Region', { id: e.region }]);
  }
}

import {Component, Input} from 'angular2/core';

declare var google: any;

@Component({
  selector: 'map',
  templateUrl: '../../../templates/google-map/google-map.html'
})

export class GoogleMapComponent {
  options: {};
  mapData: {};

  constructor(options: Object, data: Object) {
    this.options = options;
    this.mapData = data;
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
      ivalue[value.code] = '';
    });

    let chart = new google.visualization.GeoChart(document.getElementById('container-map'));
    chart.draw(data, this.options);
  }
}

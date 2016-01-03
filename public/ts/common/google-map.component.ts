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
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
    data.addColumn('number', 'Value');
    data.addColumn({type:'string', role:'tooltip'});

    var ivalue = {};

    console.log(this.mapData);

    var chart = new google.visualization.GeoChart(document.getElementById('container-map'));
    chart.draw(data, this.options);
  }
}

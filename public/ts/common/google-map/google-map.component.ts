import {Component, Input} from 'angular2/core';

declare var google: any;

@Component({
  selector: 'map',
  templateUrl: '../../../templates/google-map/google-map.html'
})

export class GoogleMapComponent {
  options: {};

  constructor(options: Object) {
    this.options = options;
    this.drawVisualization();
  }

  drawVisualization() {
    console.log("hello there");
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
    data.addColumn('number', 'Value');
    data.addColumn({type:'string', role:'tooltip'});

    var ivalue = {};
    var chart = new google.visualization.GeoChart(document.getElementById('container-map'));
    chart.draw(data, this.options);
  }
}

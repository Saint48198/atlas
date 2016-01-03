import {Component} from 'angular2/core';
import {GoogleMapComponent} from '../common/google-map/google-map.component';

@Component({
  selector: 'home',
  templateUrl: '../../templates/home/home.component.html'
})
export class HomeComponent {
  title: string = 'Home Page';
  body:  string = 'This is the about home body';

  constructor() {}

  ngAfterViewInit() {
    var map = new GoogleMapComponent({});
  }
}

/*
 <!-- google api -->
 <script src='http://www.google.com/jsapi'></script>
 <script type='text/javascript'>google.load('container-map', '1', {'packages': ['geochart']});
 google.setOnLoadCallback(drawVisualization);

 function drawVisualization() {var data = new google.visualization.DataTable();

 data.addColumn('string', 'Country');
 data.addColumn('number', 'Value');
 data.addColumn({type:'string', role:'tooltip'});var ivalue = new Array();

 var options = {
 backgroundColor: {fill:'#FFFFFF',stroke:'#FFFFFF' ,strokeWidth:0 },
 colorAxis:  {minValue: 0, maxValue: 0,  colors: []},
 legend: 'none',
 backgroundColor: {fill:'#FFFFFF',stroke:'#FFFFFF' ,strokeWidth:0 },
 datalessRegionColor: '#f5f5f5',
 displayMode: 'regions',
 enableRegionInteractivity: 'true',
 resolution: 'subcontinents',
 sizeAxis: {minValue: 1, maxValue:1,minSize:10,  maxSize: 10},
 region:'world',
 keepAspectRatio: true,
 width:600,
 height:400,
 tooltip: {textStyle: {color: '#444444'}, trigger:'focus', isHtml: false}
 };
 var chart = new google.visualization.GeoChart(document.getElementById('visualization'));
 chart.draw(data, options);
 }
 </script>
 */

import {Component} from 'angular2/core';

@Component({
  selector: 'content',
  templateUrl: '../../templates/experiments/experiments.component.html'
})
export class ExperimentsComponent {
  title: string = 'Experiments Page';
  body:  string = 'This is the about experiments body';
}

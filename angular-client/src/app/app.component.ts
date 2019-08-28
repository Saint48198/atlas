import { Component, OnInit } from '@angular/core';
import { PeopleService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public title: string = 'angular-client';
  public people: object[] = [];
  
  constructor (
    private _peopleSvc: PeopleService
  ) {}
  
  public ngOnInit (): void {
    this._peopleSvc.get().subscribe((people: any) => {
      console.log(people);
      
    });
  }
  
  public doAddPerson (name: string, age: string) {
    this._peopleSvc.add( { name, age }).subscribe((resp: any) => {
      console.log(resp);
    });
  }
}

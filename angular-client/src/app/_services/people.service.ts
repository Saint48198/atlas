import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PeopleService {
  static API: string = 'http://localhost:3000/api';
  
  constructor (
    private _http: HttpClient
  ) {}
  
  public get (): Observable<object> {
    return this._http.get(`${PeopleService.API}/users`);
  }
  
  public add (person: object): Observable<object> {
    return this._http.post(`${PeopleService.API}/users`, person);
  }
}

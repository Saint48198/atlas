import { Injectable, EventEmitter } from '@angular/core';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {

  public _state: InternalStateType = { };
  public stateStatus: EventEmitter<Object> = new EventEmitter();

  // already return a clone of the current state
  public get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  public set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : null;
  }

  public getProfileProperty(prop: any) {
    const profile = this.get('current_profile') || 'default';
    let settings = (typeof this.get('profile') !== 'undefined' && this.get('profile') !== null) &&
                    this.get('profile')[profile] &&
                    this.get('profile')[profile]['settings']
                    ? this.get('profile')[profile]['settings'] : [];

    if (settings && settings.length >= 1 && settings[0] && settings[0][prop]) {
        settings = settings[0];
        return settings[prop];
    }
    return this.get(prop);
  }

  public set(data: object) {
    // internally mutate our state
    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        this._state[prop] = data[prop];
      }
    }

    this.stateStatus.emit(this._state);
  }

  public clear() {
    this._state = {};
  }

  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}

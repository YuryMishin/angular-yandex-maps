import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private geoObjectSubject$ = new Subject();
  public geoObject$ = this.geoObjectSubject$.asObservable();

  geoObject: any;

  constructor() {
  }

  setGeoObject(data) {
    this.geoObject = data;
    this.geoObjectSubject$.next(data);
    console.log('WWWWWWWW: ', );
  }
}

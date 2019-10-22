import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {MapHelperService} from './map-helper.service';
declare var ymaps: any;
@Injectable({
  providedIn: 'root'
})
export class YamapService {

  private stepsExpandSubject = new ReplaySubject<any>(1);
  public stepsExpandSubject$ = this.stepsExpandSubject.asObservable();

  constructor(private mapHelper: MapHelperService) {
  }

  createRadiusGeoObject(coords) {
    const radiusGeoObject = new ymaps.GeoObject({
      geometry: {
        type: 'Circle',
        coordinates: coords
      }
    }, {
      fillColor: '#00C4FB',
      fillOpacity: 0.2,
      strokeColor: '#00C4FB',
      strokeOpacity: 0.8,
      strokeWidth: 1
    });
    radiusGeoObject.geometry.setRadius(50 * 1000); // radius set in metres
    return radiusGeoObject;

  }

  createCurveGeoObject(coords) {
    const curveCoords = this.mapHelper.getCurveCoordinates(coords);
    return new ymaps.GeoObject({
      geometry: {
        type: 'LineString',
        coordinates: curveCoords,
      },
    }, {
      strokeColor: '#222',
      strokeWidth: 4,
    });
  }

  createPointGeoObject(coords) {
    const iconContentClass = ymaps.templateLayoutFactory.createClass(
      '' +
      '<div>' +
      '   <p style="z-index: 100; font-size: 18px; width: 45px; margin-left: 10px">' +
      '       $[properties.iconContent]' +
      '</p>' +
      '</div>'
    );
    const icon = '../../../assets/img/icon-map-red.png';
    return new ymaps.GeoObject({
      geometry: {
        type: 'Point',
        coordinates: coords,
      },
      properties: {
        iconContent: 'POINT',
      }
    }, {
      iconLayout: 'default#imageWithContent',
      iconImageHref: icon,
      iconImageSize: [40, 40],
      iconImageOffset: [-20, -40],
      iconContentLayout: iconContentClass,
      iconContentOffset: [30, 0]
    });
  }
}

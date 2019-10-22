import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YamapService {

  private stepsExpandSubject = new ReplaySubject<any>(1);
  public stepsExpandSubject$ = this.stepsExpandSubject.asObservable();

  constructor() {
  }

  createRadiusGeoObject(point, maps) {
    const radiusGeoObject = new maps.GeoObject({
      geometry: {
        type: 'Circle',
        coordinates: point.coords
      }
    }, {
      fillColor: '#00C4FB',
      fillOpacity: 0.2,
      strokeColor: '#00C4FB',
      strokeOpacity: 0.8,
      strokeWidth: 1
    });
    radiusGeoObject.geometry.setRadius(point.radius * 1000); // radius set in metres
    return radiusGeoObject;

  }

  createCurveGeoObject(yaMap, coords, color) {
    return new yaMap.GeoObject({
      geometry: {
        type: 'LineString',
        coordinates: coords,
      },
    }, {
      strokeColor: color,
      strokeWidth: 4,
    });
  }

  createPointGeoObject(yaMap, name, coords) {
    // const iconContentClass = yaMap.templateLayoutFactory.createClass(
    //   '' +
    //   '<div>' +
    //   '   <p style="z-index: 10000; color: white; font-size: 18px; width: 75px;">' +
    //   '       $[properties.iconContent]' +
    //   '</p>' +
    //   '</div>'
    // );
    const icon = '../../../assets/img/icon-map-red.png';
    return new yaMap.GeoObject({
      geometry: {
        type: 'Point',
        coordinates: coords,
      },
      properties: {
        iconContent: 'POINT', // name,
      }
    }, {
      // iconLayout: 'default#imageWithContent',
      iconImageHref: icon,
      iconImageSize: [40, 40],
      iconImageOffset: [-20, -40],
      // iconContentLayout: iconContentClass,
      iconContentOffset: [30, 0]
    });
  }

  timer(ms) {
    return new Promise(res => setTimeout(res, ms));
  }
}

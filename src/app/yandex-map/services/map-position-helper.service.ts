import {Injectable} from '@angular/core';
import {MathHelperService} from './math-helper.service';
import {MapHelperService} from './map-helper.service';

@Injectable()
export class MapPositionHelperService {

  constructor(private mathHelper: MathHelperService,
              private mapHelper: MapHelperService) {
  }

  getZoomByDistance(distance) {
    if (distance < 300) {
      return 8;
    }
    if (300 <= distance && distance < 600) {
      return 7;
    }
    if (600 <= distance && distance < 900) {
      return 6;
    }
    if (900 <= distance && distance < 1400) {
      return 5;
    }
    if (1400 <= distance && distance < 3000) {
      return 4;
    }
    if (3000 <= distance) {
      return 3;
    }
  };

  getMapPositions(coords: any[]) {
    const leftBottom = {
      longitude: Number.MAX_VALUE,
      latitude: Number.MAX_VALUE
    }, rigthTop = {
      longitude: Number.MIN_VALUE,
      latitude: Number.MIN_VALUE
    };
    coords.forEach(coord => {
      const place = {
        longitude: coord[0],
        latitude: coord[1]
      };

      leftBottom.longitude = Math.min(leftBottom.longitude, place.longitude);
      leftBottom.latitude = Math.min(leftBottom.latitude, place.latitude);

      rigthTop.longitude = Math.max(rigthTop.longitude, place.longitude);
      rigthTop.latitude = Math.max(rigthTop.latitude, place.latitude);
    });
    const center = {
      longitude: this.mathHelper.getMean(leftBottom.longitude, rigthTop.longitude),
      latitude: this.mathHelper.getMean(leftBottom.latitude, rigthTop.latitude)
    };
    const distance = this.mapHelper.getDistance(leftBottom, rigthTop);
    const zoom = this.getZoomByDistance(distance);

    return {
      zoom: zoom,
      center: [center.longitude, center.latitude]
    };
  }
}

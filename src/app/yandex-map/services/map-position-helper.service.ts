import { Injectable } from '@angular/core';
import { MathHelperService } from './math-helper.service';
import { MapHelperService } from './map-helper.service';

@Injectable()
export class MapPositionHelperService {

    constructor(private mathHelper: MathHelperService,
                private mapHelper: MapHelperService) {
    }

    getZoomByRadius(radius) {
        if (radius <= 100) {return 8; }
        if (100 < radius && radius <= 200) {return 7; }
        if (200 < radius && radius <= 300) {return 6; }
    }

    getZoomByDistance(distance) {
        if (distance < 300) {return 8; }
        if (300 <= distance && distance < 600) {return 7; }
        if (600 <= distance && distance < 900) {return 6; }
        if (900 <= distance && distance < 1400) {return 5; }
        if (1400 <= distance && distance < 3000) {return 4; }
        if (3000 <= distance) {return 3; }
    };

    getZoomByDistance2(distance) {
        let zoom = 2;
        if (distance > 4000 && distance < 11000) {
            zoom = 3;
        }
        if (distance > 1000 && distance < 4000) {
            zoom = 5;
        }
        if (distance < 1000 && distance > 500) {
            zoom = 6;
        }
        if (distance < 500) {
            zoom = 8;
        }
        return zoom;
    }

    getMapPositions(parts) {
        const leftBottom = {
            longitude: Number.MAX_VALUE,
            latitude: Number.MAX_VALUE
        }, rigthTop = {
            longitude: Number.MIN_VALUE,
            latitude: Number.MIN_VALUE
        };
        parts.forEach(part => {
            const places = [part.iataFrom, part.iataTo];
            places.forEach(place => {
                if (place && place.coords) {
                    place = {
                        longitude: place.coords[0],
                        latitude: place.coords[1]
                    };

                    leftBottom.longitude = Math.min(leftBottom.longitude, place.longitude);
                    leftBottom.latitude = Math.min(leftBottom.latitude, place.latitude);

                    rigthTop.longitude = Math.max(rigthTop.longitude, place.longitude);
                    rigthTop.latitude = Math.max(rigthTop.latitude, place.latitude);
                }
            });
        });
        const center = {
            longitude: this.mathHelper.getMean(leftBottom.longitude, rigthTop.longitude),
            latitude: this.mathHelper.getMean(leftBottom.latitude, rigthTop.latitude)
        };
        const distance = this.mapHelper.getDistance(leftBottom, rigthTop);
        const zoom = this.getZoomByDistance(distance);
        const zoom2 = this.getZoomByDistance2(distance);

        return {
            zoom: zoom2,
            center: [center.longitude, center.latitude]
        };
    }
}

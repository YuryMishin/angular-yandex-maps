import { Injectable } from '@angular/core';
import { MathHelperService } from './math-helper.service';
import { MarkerInfo } from '../../../core/models/air.model';

@Injectable()
export class MapHelperService {

    constructor(private mathHelper: MathHelperService) {
    }

    getDistance(point1, point2) {
        const earthRadius = 6371.032;

        const lat1 = this.mathHelper.toRadian(point1.latitude);
        const lat2 = this.mathHelper.toRadian(point2.latitude);
        const long1 = this.mathHelper.toRadian(point1.longitude);
        const long2 = this.mathHelper.toRadian(point2.longitude);

        const a = Math.pow(Math.sin((lat1 - lat2) / 2), 2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((long1 - long2) / 2), 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadius * c;
    }

    getCurveCoordinates(part) {
        if (!part.iataFrom || !part.iataTo) {
            return undefined;
        }

        const partDetails = {
            from: this.getPartPointCoordinates(part.iataFrom),
            to: this.getPartPointCoordinates(part.iataTo),
            isFlyback: part.isFlyback
        };

        const STEP = 0.01,
            coordinates = [];

        const points = this.getCurveBasicPoints(partDetails.from, partDetails.to, partDetails.isFlyback);

        const x = [points.start.longitude, points.middle.longitude, points.end.longitude],
            y = [points.start.latitude, points.middle.latitude, points.end.latitude];

        for (let t = 0; t <= 1.01; t += STEP) {
            const longitude = this.mathHelper.getBezierCurvePoint(x[0], x[1], x[2], t),
                latitude = this.mathHelper.getBezierCurvePoint(y[0], y[1], y[2], t);

            coordinates.push([longitude, latitude]);
        }

        return coordinates;
    }

    getCurveBasicPoints(point1, point2, needInversion) {
        const higherPoint = (point1.latitude > point2.latitude) ? point1 : point2;
        const lowerPoint = (point1.latitude > point2.latitude) ? point2 : point1;

        const distance = this.getDistance(point1, point2);
        const curveOffset = needInversion ? (-1) * (distance / 250) : (distance / 250);

        const middlePoint = this.mathHelper.getOffsetCurveMiddle(lowerPoint, higherPoint, curveOffset);

        return {
            start: lowerPoint,
            middle: middlePoint,
            end: higherPoint
        };
    }

    getPartPointCoordinates(place: MarkerInfo) {
        return {
            longitude: place.coords[0],
            latitude: place.coords[1],
        };
    }
}

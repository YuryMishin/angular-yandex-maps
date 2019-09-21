import { Injectable } from '@angular/core';


@Injectable()
export class MathHelperService {

    constructor() {
    }

    getOffsetCurveMiddle(lower, higher, offset) {

        const middleOfLine = {
            longitude: this.getMean(higher.longitude, lower.longitude),
            latitude: this.getMean(higher.latitude, lower.latitude)
        };

        const k = (higher.longitude - lower.longitude) / (higher.latitude - lower.latitude);

        if (this.needOffsetLatitude(k)) {
            return {
                longitude: this.getOffsetMiddleLongitude(middleOfLine.latitude + offset, k, middleOfLine),
                latitude: middleOfLine.latitude + offset
            };
        } else {
            return {
                longitude: middleOfLine.longitude + offset,
                latitude: this.getOffsetMiddleLatitude(middleOfLine.longitude + offset, k, middleOfLine)
            };
        }
    }

    toRadian(angle) {
        return angle * Math.PI / 180;
    }

    getMean(a, b) {
        return Math.min(a, b) + ((Math.max(a, b) - Math.min(a, b)) / 2);
    }

    getBezierCurvePoint(a, b, c, t) {
        return (Math.pow((1 - t), 2) * a) + (2 * ((1 - t) * t) * b) + (Math.pow(t, 2) * c);
    }

    getOffsetMiddleLongitude(y, k, middle) {
        return ((y - (middle.latitude - (k * middle.longitude))) / k);
    }

    getOffsetMiddleLatitude(x, k, middle) {
        return ((k * x) + (middle.latitude - (k * middle.longitude)));
    }

    needOffsetLatitude(k) {
        return Math.abs(k) > 1;
    }
}


import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {YamapService} from './services/yamap.service';
import {MapPositionHelperService} from './services/map-position-helper.service';

declare var ymaps: any;

@Component({
  selector: 'app-yandex-map',
  templateUrl: './yandex-map.component.html',
  styleUrls: ['./yandex-map.component.less']
})
export class YandexMapComponent implements OnInit {

  constructor(private appService: AppService,
              private mapPosHelper: MapPositionHelperService,
              private yamapService: YamapService) {
  }


  geoObjectData;

  ngOnInit() {
    this.mapLoad();
    this.appService.geoObject$.subscribe(value => {
      this.geoObjectData = value;
      this.createGeoObject(value);
      console.log('EEEEE: ', );
    });
  }

  map;
  mapSource;

  mapLoad() {
    ymaps.load().then(maps => {
      this.mapSource = maps;
      this.map = new maps.Map('map', {
          center: [55.661574, 37.573856], // Moskow
          zoom: 6,
          controls: ['zoomControl']
        },
        {
          suppressObsoleteBrowserNotifier: true,
          yandexMapDisablePoiInteractivity: true,
          suppressMapOpenBlock: true
        });
    });
  }

  createGeoObject(data) {
    const type = data.type;
    let geoObject;

    const coords = [
      [parseInt(data.longitude, 10), parseInt(data.latitude, 10)],
      [parseInt(data.longitude_2, 10), parseInt(data.latitude_2, 10)]
    ];
    switch (type) {
      case 'Point': {
        geoObject = this.yamapService.createPointGeoObject(coords[0]);
        break;
      }
      case 'Line': {
        geoObject = this.yamapService.createCurveGeoObject(coords);
        break;
      }
      case 'Circle': {
        geoObject = this.yamapService.createRadiusGeoObject(coords[0]);
        break;
      }
      case 'Curve': {
        geoObject = this.yamapService.createRadiusGeoObject(coords);
        break;
      }
    }
    this.map.geoObjects.add(geoObject);
    let position;
    if (type === 'Point' || type === 'Circle') {
      this.map.setCenter(coords[0]);
      this.map.setZoom(8);
    } else {
      position = this.mapPosHelper.getMapPositions(coords);
      this.map.setCenter(position.center);
      this.map.setZoom(position.zoom);
    }
    console.log('POSiTION: '  , position);
  }


}

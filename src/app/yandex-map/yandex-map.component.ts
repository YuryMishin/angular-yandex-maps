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
    console.log('Coords: ', coords);
    switch (type) {
      case 'Point': {
        geoObject = this.yamapService.createPointGeoObject(this.map, 'Point22', coords[0]);
        break;
      }
      case 'Line': {
        geoObject = this.yamapService.createCurveGeoObject(this.map, 'Point22', coords);
        break;
      }
      case 'Radius': {
        geoObject = this.yamapService.createRadiusGeoObject(this.map, coords);
        break;
      }
    }
    // geoObject = this.yamapService.createPointGeoObject(this.mapSource, 'Point22', coords);
    this.map.geoObjects.add(geoObject);
    const position = this.mapPosHelper.getMapPositions(coords);
  }


}

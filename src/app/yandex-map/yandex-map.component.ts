import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {YamapService} from './services/yamap.service';

declare var ymaps: any;

@Component({
  selector: 'app-yandex-map',
  templateUrl: './yandex-map.component.html',
  styleUrls: ['./yandex-map.component.less']
})
export class YandexMapComponent implements OnInit {

  constructor(private appService: AppService,
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
    const type = 'Point'; // data.type;
    let geoObject;

    const coords = [parseInt(data.longitude, 10), parseInt(data.latitude, 10)];
    console.log('Coords: ', coords);
    // switch (type) {
    //   case 'Point': {
    //     geoObject = this.yamapService.createCityGeoObject(this.map, 'Point22', coords);
    //     break;
    //   }
    //   case 'Line': {
    //     geoObject = this.yamapService.createCurveGeoObject(this.map, 'Point22', coords);
    //     break;
    //   }
    //   case 'Radius': {
    //     geoObject = this.yamapService.createRadiusGeoObject(this.map, coords);
    //     break;
    //   }
    // }
    geoObject = this.yamapService.createCityGeoObject(this.mapSource, 'Point22', coords);
    console.log('GEOOBJEXCCT: ', geoObject);
    this.map.geoObjects.add(geoObject);
    console.log('232232323232323: ', );
  }


}

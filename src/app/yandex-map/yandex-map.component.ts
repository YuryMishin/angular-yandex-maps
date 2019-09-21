import {Component, OnInit} from '@angular/core';

declare var ymaps: any;

@Component({
  selector: 'app-yandex-map',
  templateUrl: './yandex-map.component.html',
  styleUrls: ['./yandex-map.component.less']
})
export class YandexMapComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    this.mapLoad();
  }

  map;

  mapLoad() {
    ymaps.load().then(maps => {
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



}

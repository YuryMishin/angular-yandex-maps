import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { YandexMapComponent } from './yandex-map/yandex-map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {MapPositionHelperService} from './yandex-map/services/map-position-helper.service';
import {MathHelperService} from './yandex-map/services/math-helper.service';
import {YamapService} from './yandex-map/services/yamap.service';
import {MapHelperService} from './yandex-map/services/map-helper.service';


@NgModule({
  declarations: [
    AppComponent,
    YandexMapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
  ],
  providers: [MapPositionHelperService, MathHelperService, YamapService, MapHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService) {
  }

  types = [
    {label: 'Point', value: 'Point'},
    {label: 'Curve', value: 'Curve'},
    {label: 'Line', value: 'Line'}];


  geoObjectForm: FormGroup = new FormGroup({
      type: new FormControl(this.types[0]),
      longitude: new FormControl(),
      latitude: new FormControl(),
      longitude_2: new FormControl(),
      latitude_2: new FormControl(),
    }
  );

  ngOnInit(): void {
  }

  create() {
    const result = this.geoObjectForm.getRawValue();
    this.appService.setGeoObject(result);
  }
}

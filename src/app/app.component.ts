import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor() {
  }

  selectedType = new FormControl('');

  types = [{label: 'Point', value: 'Point'}, {label: 'Curve', value: 'Curve'}, {label: 'Line', value: 'Line'}];

  ngOnInit(): void {

  }
}

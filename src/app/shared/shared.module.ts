import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    ReactiveFormsModule,

  ],
  exports: [
    InputTextModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }

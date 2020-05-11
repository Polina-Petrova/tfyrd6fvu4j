import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PopupComponent} from './popup/popup.component';
import {LoaderComponent} from './loader/loader.component';

@NgModule({
  declarations: [
    PopupComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PopupComponent,
    LoaderComponent,
  ]
})
export class SharedModule { }

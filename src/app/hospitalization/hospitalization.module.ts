import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HospitalizationComponent} from './pages/hospitalization.component';
import {HospitalizationPopupComponent} from './components/hospitalization-popup/hospitalization-popup.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    HospitalizationComponent,
    HospitalizationPopupComponent,
    HospitalizationPopupComponent,
  ],
  exports: [
    HospitalizationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class HospitalizationModule {
}

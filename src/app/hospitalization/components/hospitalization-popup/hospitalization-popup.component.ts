import {Component, OnInit} from '@angular/core';
import {HospitalizationModel} from '../../../core/models/hospitalization.model';
import {Doctor, Patient} from '../../services/hospitalization.service';

@Component({
  selector: 'app-hospitalization-popup',
  templateUrl: './hospitalization-popup.component.html',
  styleUrls: ['./hospitalization-popup.component.scss']
})
export class HospitalizationPopupComponent implements OnInit {

  public isShow = false;
  public hospitalization: HospitalizationModel;
  private doctor: Doctor;
  private patient: Patient;

  constructor() {
  }

  ngOnInit(): void {
  }

  open(hospitalization: HospitalizationModel, doctor: Doctor, patient: Patient) {
    this.isShow = true;
    this.hospitalization = hospitalization;
    this.doctor = doctor;
    this.patient = patient;
  }

  close() {
    this.isShow = false;
  }

  onCloseByOverlayClick(e: EventTarget) {
    if ((e as HTMLElement).classList.contains('popup__wrapper')) {
      this.close();
    }
  }
}

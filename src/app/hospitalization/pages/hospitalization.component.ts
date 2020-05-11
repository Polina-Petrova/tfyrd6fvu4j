import {Component, OnInit, ViewChild} from '@angular/core';
import {HospitalizationModel} from '../../core/models/hospitalization.model';
import {HospitalizationPopupComponent} from '../components/hospitalization-popup/hospitalization-popup.component';
import {HospitalizationFilter, HospitalizationService, HospitalizationSortType} from '../services/hospitalization.service';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-hospitalization',
  templateUrl: './hospitalization.component.html',
  styleUrls: ['./hospitalization.component.scss']
})
export class HospitalizationComponent implements OnInit {

  @ViewChild('hospitalizationPopup') hospitalizationPopup: HospitalizationPopupComponent;

  public formFilter = new FormGroup({
    // TODO: Добавить валидаторы
    doctorId: new FormControl(),
    patientId: new FormControl(),
    diagnosis: new FormControl(),
    dateStart: new FormControl(),
    dateEnd: new FormControl(),
  });

  public hospitalizationList: HospitalizationModel[];
  public isLoadHospitalizationList$ = this.hospitalizationService.getIsLoad();
  public currentPage = 1;
  public pagesCount$ = this.hospitalizationService.getPagesCount();
  public sortedType: HospitalizationSortType = HospitalizationSortType.id;
  public filter: HospitalizationFilter = {};

  constructor(
    private hospitalizationService: HospitalizationService,
  ) {
  }

  ngOnInit(): void {
    this.initForms();
    this.loadPage();
  }

  initForms() {
    this.formFilter.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((formValue) => {
      this.filter.doctorId = formValue.doctorId?.trim();
      this.filter.patientId = formValue.patientId?.trim();
      this.filter.diagnosis = formValue.diagnosis?.trim();
      this.filter.dateStart = formValue.dateStart ? (new Date(formValue.dateStart)) : null;
      this.filter.dateEnd = formValue.dateEnd ? (new Date(formValue.dateEnd)) : null;
      this.currentPage = 1;
      this.loadPage();
    });
  }

  onOpenPopup(hospitalization: HospitalizationModel) {
    if (window.getSelection()?.toString().length) {
      // TODO: решить с помощью UX
      return;
    }
    const doctor = this.hospitalizationService.getDoctorById(hospitalization.doctorId);
    const patient = this.hospitalizationService.getPatientById(hospitalization.patientId);
    this.hospitalizationPopup.open(hospitalization, doctor, patient);
  }

  onNextPage() {
    this.currentPage++;
    this.loadPage();
  }

  onPrevPage() {
    this.currentPage--;
    this.loadPage();
  }

  private loadPage() {
    this.hospitalizationService.getListWithParams(this.currentPage, this.sortedType, this.filter).subscribe((hospitalizationList) => {
      this.hospitalizationList = hospitalizationList;
    });
  }

  onSorted(sortedStr: string) {
    this.sortedType = sortedStr as HospitalizationSortType;
    this.loadPage();
  }

  onReset() {
    this.formFilter.reset();
  }
}


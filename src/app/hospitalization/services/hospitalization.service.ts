import {Injectable} from '@angular/core';
import {ApiHospitalizationService, mockDoctorList, mockPatientList} from '../../core/services/api/api-hospitalization.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {HospitalizationModel} from '../../core/models/hospitalization.model';
import {finalize, map, tap} from 'rxjs/operators';

const PAGE_SIZE = 10;

export interface HospitalizationFilter {
  doctorId?: number;
  patientId?: number;
  dateStart?: Date;
  dateEnd?: Date;
  diagnosis?: string;
}

export enum HospitalizationSortType {
  id = 'id',
  doctorId = 'doctorId',
  patientId = 'patientId',
  date = 'date',
  diagnosis = 'diagnosis',
}

export interface Doctor {
  id: number;
  name: string;
}

export interface Patient {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class HospitalizationService {

  private hospitalizationListForOutput = new BehaviorSubject<HospitalizationModel[]>([]);
  private hospitalizationList = new BehaviorSubject<HospitalizationModel[]>([]);
  private hospitalizationListFilteredAndSorted = new BehaviorSubject<HospitalizationModel[]>([]);
  private loadHospitalizationList$$: Subscription;
  private isLoadHospitalizationList = new BehaviorSubject<boolean>(false);

  constructor(
    private apiHospitalizationService: ApiHospitalizationService,
  ) {
  }

  getListWithParams(
    pageNumber: number,
    sortType: HospitalizationSortType = HospitalizationSortType.id,
    filter?: HospitalizationFilter
  ): Observable<HospitalizationModel[]> {
    this.getList().pipe(
      map(hospitalizationList => this.hospitalizationFilter(hospitalizationList, filter)),
      map(hospitalizationList => this.hospitalizationSort(hospitalizationList, sortType)),
      tap(hospitalizationList => this.hospitalizationListFilteredAndSorted.next(hospitalizationList)),
      map(hospitalizationList => this.hospitalizationPage(hospitalizationList, pageNumber)),
    ).subscribe(hl => this.hospitalizationListForOutput.next(hl));

    return this.hospitalizationListForOutput.asObservable();
  }

  // TODO: Вынести в отделный переиспользуемый pagination-service
  getPagesCount(): Observable<number> {
    return this.hospitalizationListFilteredAndSorted.asObservable().pipe(
      map(hospitalizationList => hospitalizationList.length / PAGE_SIZE),
      map(Math.ceil)
    );
  }

  // TODO: Скорее всего эти данные должны приходить с бэка, но для упрощения просто моковый справочник
  getPatientById(id: number): Patient {
    return mockPatientList.find(p => p.id === id);
  }

  getDoctorById(id: number): Doctor {
    return mockDoctorList.find(p => p.id === id);
  }

  getIsLoad(): Observable<boolean> {
    return this.isLoadHospitalizationList.asObservable();
  }

  private getList(): Observable<HospitalizationModel[]> {
    if (!this.loadHospitalizationList$$) {
      this.isLoadHospitalizationList.next(true);
      this.loadHospitalizationList$$ = this.apiHospitalizationService.loadHospitalizationList().pipe(
        finalize(() => this.isLoadHospitalizationList.next(false))
      ).subscribe((hl) => {
        this.hospitalizationList.next(hl);
      });
    }

    return this.hospitalizationList.asObservable();
  }

  private hospitalizationSort(list: HospitalizationModel[], sortType: HospitalizationSortType): HospitalizationModel[] {
    return list.sort((a, b) => {
      const key = sortType as string;
      const aValue = a[key];
      const bValue = b[key];
      if (sortType === 'diagnosis') {
        return (aValue as string).localeCompare(bValue);
      }
      return aValue - bValue;
    });
  }

  // TODO: Сделать более типизированным
  private hospitalizationFilter(list: HospitalizationModel[], filter?: HospitalizationFilter): HospitalizationModel[] {
    if (!filter) {
      return list;
    }

    for (const [k, v] of Object.entries(filter)) {
      if (!v) {
        continue;
      }
      list = list.filter(hospItem => {
        const searchValue = v;
        if (v instanceof Date) {
          const itemValueDate = hospItem.date;
          if (k === 'dateStart') {
            return itemValueDate.getTime() >= (v as Date).getTime();
          }
          if (k === 'dateEnd') {
            return itemValueDate.getTime() <= (v as Date).getTime();
          }
          return 0;
        }
        const itemValue = hospItem[k];
        return itemValue.toString().toLowerCase().includes(searchValue.toString().toLowerCase());
      });
    }
    return list;
  }

  private hospitalizationPage(list: HospitalizationModel[], pageNumber: number): HospitalizationModel[] {
    pageNumber = pageNumber >= 1 ? pageNumber : 1;
    const from = pageNumber * PAGE_SIZE - PAGE_SIZE;
    const to = pageNumber * PAGE_SIZE;
    return list.slice(from, to);
  }

}

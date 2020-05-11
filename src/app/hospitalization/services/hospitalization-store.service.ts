import {Injectable} from '@angular/core';
import {HospitalizationModel} from '../../core/models/hospitalization.model';
import {Observable} from 'rxjs';
import {ApiHospitalizationService} from '../../core/services/api/api-hospitalization.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalizationStoreService {

  private hospitalizationList: HospitalizationModel[];

  constructor(
    private apiHospitalizationService: ApiHospitalizationService,
  ) {
  }

  public loadList(): Observable<HospitalizationModel[]> {
    return this.apiHospitalizationService.loadHospitalizationList();
  }

}

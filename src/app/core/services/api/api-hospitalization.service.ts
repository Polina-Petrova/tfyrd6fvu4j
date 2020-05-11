import {Injectable} from '@angular/core';
import {ApiCoreService} from './api-core.service';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {HospitalizationModel} from '../../models/hospitalization.model';
import {Doctor, Patient} from '../../../hospitalization/services/hospitalization.service';

const METHOD_URL = '/hospitalization';

@Injectable({
  providedIn: 'root'
})
export class ApiHospitalizationService extends ApiCoreService {

  public loadHospitalizationList(): Observable<HospitalizationModel[]> {
    // return this.get(METHOD_URL + '/list');
    const mockApiHospitalizationRand = generateMockApiHospitalization(34);
    return of(mockApiHospitalizationRand).pipe(
      delay(4000)
    );
  }

}

const generateMockApiHospitalization = (count: number = 0): HospitalizationModel[] => {
  const resultList: HospitalizationModel[] = [];
  for (let i = 0; i < count; i++) {
    resultList.push({
      id: i + 1,
      doctorId: generateRandomDoctorId(),
      patientId: generateRandomPatientId(),
      date: generateRandomDate(),
      diagnosis: generateRandomDiagnosis()
    });
  }
  return resultList;
};

const generateRandomDoctorId = () => {
  const doctorIdList = mockDoctorList.map(v => v.id);
  const randIndex = Math.floor(Math.random() * doctorIdList.length);
  return doctorIdList[randIndex];
};

const generateRandomPatientId = () => {
  const patientIdList = mockPatientList.map(v => v.id);
  const randIndex = Math.floor(Math.random() * patientIdList.length);
  return patientIdList[randIndex];
};

const generateRandomDiagnosis = () => {
  const diagnosisList = ['Панкреотит', 'Дизбактериоз', 'Псориаз', 'Геморрой', 'Гепатит', 'Инсульт', 'Меланома кожи', 'Лактазная недостаточность', 'Подагра'];
  const randIndex = Math.floor(Math.random() * diagnosisList.length);
  return diagnosisList[randIndex];
};

const generateRandomDate = () => {
  const nowMs = (new Date()).getTime();
  const timeShiftRand = Math.random() * 60 * 24 * 60 * 60 * 1000;
  const randMs = nowMs - timeShiftRand;
  return new Date(randMs);
};

const mockApiHospitalization: HospitalizationModel[] = [
  {
    id: 164,
    doctorId: 187,
    patientId: 145,
    date: new Date(),
    diagnosis: 'Панкреотит'
  },
  {
    id: 165,
    doctorId: 852,
    patientId: 267,
    date: new Date(),
    diagnosis: 'Дизбактериоз'
  },
  {
    id: 166,
    doctorId: 377,
    patientId: 334,
    date: new Date(),
    diagnosis: 'Псориаз'
  }
];

export const mockDoctorList: Doctor[] = [
  {
    id: 836252,
    name: 'Аракелян А. Т.',
  },
  {
    id: 434343,
    name: 'Петров Д. И.',
  },
  {
    id: 681471,
    name: 'Иванова А. А.',
  },
  {
    id: 109742,
    name: 'Чайчук И. Г.',
  },
  {
    id: 105325,
    name: 'Афанасьева Г. Г.',
  },
  {
    id: 343523,
    name: 'Бураковский Р. Д.',
  },
  {
    id: 387523,
    name: 'Донская О. П.',
  },
  {
    id: 773523,
    name: 'Павлов К. И.',
  },
];

export const mockPatientList: Patient[] = [
  {
    id: 652397,
    name: 'Кадышева И. И.',
  },
  {
    id: 878683,
    name: 'Пылаев Н. К.',
  },
  {
    id: 234234,
    name: 'Никитин В. В.',
  },
  {
    id: 574575,
    name: 'Ростовская Е. Б.',
  },
  {
    id: 923580,
    name: 'Калинин О. О.',
  },
  {
    id: 501235,
    name: 'Чуваев К. А.',
  },
  {
    id: 501777,
    name: 'Атанасян А. Д.',
  },
  {
    id: 501888,
    name: 'Цукерберг Д. Д.',
  },
];

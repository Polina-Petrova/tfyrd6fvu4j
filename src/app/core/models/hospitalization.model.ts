
export interface HospitalizationModel {
  id: number;
  doctorId: number;
  patientId: number;
  date: Date;
  diagnosis: string;
}

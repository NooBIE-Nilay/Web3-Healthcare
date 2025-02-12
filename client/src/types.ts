export interface Patient {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  treatment: string;
  prescriptionImageUrl?: string;
  dateAdded: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
}
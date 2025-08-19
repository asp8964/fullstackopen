import patients from "../../data/patients";
import {
  Entry,
  EntryWithoutId,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types";
import { v1 as uuid } from "uuid";

// let patients = [...patientEntries];

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getEntryById = (id: string) => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addPatientEntry = (id: string, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  // console.log(newEntry);

  const patient = patients.find((p) => p.id === id);
  patient?.entries?.push(newEntry);
  // patients = patients.map((p) => (p.id === id ? patient : p));
  return newEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  getEntryById,
  addPatientEntry,
};

import patientEntries from "../../data/patients";
import patients from "../../data/patients";
import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
} from "../types";
import { v1 as uuid } from "uuid";

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

export default { getNonSensitiveEntries, addPatient };

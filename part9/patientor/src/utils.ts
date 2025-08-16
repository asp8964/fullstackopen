import z from "zod";
import { Gender } from "./types";

const newEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

// const isString = (text: unknown): text is string => {
//   return typeof text === "string" || text instanceof String;
// };

// const parseString = (text: unknown, label: string): string => {
//   if (!isString(text)) {
//     throw new Error(`Incorrect ${label}: ${text}`);
//   }
//   return text;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const parseDateOfBirth = (date: unknown): string => {
//   if (!isString(date) || !isDate(date)) {
//     throw new Error("Incorrect date of birth: " + date);
//   }
//   return date;
// };

// const isGender = (param: string): param is Gender => {
//   return Object.values(Gender)
//     .map((v) => v.toString())
//     .includes(param);
// };

// const parseGender = (gender: unknown): Gender => {
//   if (!isString(gender) || !isGender(gender)) {
//     throw new Error("Incorrect gender: " + gender);
//   }
//   return gender;
// };

// export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
//   if (!object || typeof object !== "object") {
//     throw new Error("Incorrect or missing data");
//   }

//   if (
//     "name" in object &&
//     "dateOfBirth" in object &&
//     "ssn" in object &&
//     "gender" in object &&
//     "occupation" in object
//   ) {
//     const newEntry: NewPatientEntry = {
//       name: parseString(object.name, "name"),
//       dateOfBirth: parseDateOfBirth(object.dateOfBirth),
//       ssn: parseString(object.ssn, "ssn"),
//       gender: parseGender(object.gender),
//       occupation: parseString(object.occupation, "occupation"),
//     };

//     return newEntry;
//   }

//   throw new Error("Incorrect data: some fields are missing");
// };

export default newEntrySchema;

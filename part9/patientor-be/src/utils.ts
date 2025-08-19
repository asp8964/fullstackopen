import z from "zod";
import { Gender, HealthCheckRating } from "./types";

const BaseEntrySchema = z.object({
  id: z.string().nonempty(),
  description: z.string().nonempty(),
  date: z.iso.date(),
  specialist: z.string().nonempty(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string().nonempty(),
  }),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().nonempty(),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

export const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

export const newEntrySchema = z.object({
  name: z.string().nonempty(),
  dateOfBirth: z.iso.date(),
  ssn: z.string().nonempty(),
  gender: z.enum(Gender),
  occupation: z.string().nonempty(),
  entries: z.array(EntrySchema).default([]),
});

export const EntryWithoutIdSchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema.omit({ id: true }),
  HospitalEntrySchema.omit({ id: true }),
  OccupationalHealthcareEntrySchema.omit({ id: true }),
]);

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

// export default newEntrySchema;

import type { Diagnosis, Entry } from "../../../types";
import HealthCheckEntryDetail from "./HealthCheckEntryDetail";
import HospitalEntryDetail from "./HospitalEntryDetail";
import OccupationalHealthcareEntryDetail from "./OccupationalHealthcareEntryDetail";

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetail entry={entry} diagnoses={diagnoses} />;
    case "Hospital":
      return <HospitalEntryDetail entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryDetail
          entry={entry}
          diagnoses={diagnoses}
        />
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;

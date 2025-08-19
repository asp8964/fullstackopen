import type { Diagnosis, Patient } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import EntryDetails from "./EntryDetails";
import EntryForm from "./EntryForm";
import { Box, Button } from "@mui/material";
import {
  useVisibilityDispatch,
  useVisibilityValue,
} from "../../hooks/useVisibility";
import { usePatientValue } from "../../hooks/usePatient";
import Notification from "../Notification";

interface PatientDetailProps {
  patient: Patient | null;
  diagnoses: Diagnosis[];
}

const AddButton = () => {
  const dispatch = useVisibilityDispatch();
  return (
    <Box sx={{ mt: 1, mb: 1 }}>
      <Button variant="contained" onClick={() => dispatch({ type: "CHANGE" })}>
        add new entry
      </Button>
    </Box>
  );
};

const PatientDetail = ({ diagnoses }: PatientDetailProps) => {
  const visibility = useVisibilityValue();
  const patient = usePatientValue();

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient.gender === "male" ? (
          <MaleIcon />
        ) : patient.gender === "female" ? (
          <FemaleIcon />
        ) : (
          <QuestionMarkIcon />
        )}
      </h2>

      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <Notification />
      <EntryForm diagnoses={diagnoses} />
      <div>
        {patient && patient.entries?.length !== 0 && (
          <>
            <h3>entries</h3>
            {patient?.entries?.map((entry) => (
              <EntryDetails
                key={entry.id}
                entry={entry}
                diagnoses={diagnoses}
              />
            ))}
          </>
        )}
      </div>
      {!visibility && <AddButton />}
    </div>
  );
};

export default PatientDetail;

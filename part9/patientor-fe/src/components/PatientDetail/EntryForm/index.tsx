import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import {
  useVisibilityDispatch,
  useVisibilityValue,
} from "../../../hooks/useVisibility";
import type { Diagnosis } from "../../../types";

const CancelButton = () => {
  const dispatch = useVisibilityDispatch();
  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => dispatch({ type: "CHANGE" })}
    >
      CANCEL
    </Button>
  );
};

const EntryForm = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  //   const [visibility, setVisibility] = useState(false);
  const visibility = useVisibilityValue();
  const [selected, setSelected] = useState("HealthCheck");
  //   console.log(selected);

  if (!visibility) {
    return null;
  }
  return (
    // <Box component="form" sx={{ border: "dashed", p: 1, mt: 1, mb: 1 }}>
    <Box
      sx={{
        border: "dashed",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 1,
        mt: 1,
        mb: 1,
      }}
    >
      <FormControl>
        <FormLabel id="new-entry-form-select">New entry</FormLabel>
        <RadioGroup
          row
          aria-labelledby="entry-form-select"
          name="entry-form-select"
          onChange={(e) => setSelected(e.target.value)}
          value={selected}
        >
          <FormControlLabel
            value="HealthCheck"
            control={<Radio />}
            label="Health Check"
          />
          <FormControlLabel
            value="Hospital"
            control={<Radio />}
            label="Hospital"
          />
          <FormControlLabel
            value="OccupationalHealthcare"
            control={<Radio />}
            label="Occupational Healthcare"
          />
        </RadioGroup>
      </FormControl>
      {selected === "HealthCheck" ? (
        <HealthCheckForm diagnoses={diagnoses}>
          <CancelButton />
        </HealthCheckForm>
      ) : selected === "Hospital" ? (
        <HospitalForm diagnoses={diagnoses}>
          <CancelButton />
        </HospitalForm>
      ) : selected === "OccupationalHealthcare" ? (
        <OccupationalHealthcareForm diagnoses={diagnoses}>
          <CancelButton />
        </OccupationalHealthcareForm>
      ) : null}
    </Box>
  );
};

export default EntryForm;

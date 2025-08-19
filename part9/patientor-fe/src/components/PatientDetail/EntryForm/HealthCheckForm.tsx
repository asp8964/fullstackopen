import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useField } from "../../../hooks/useField";
import { Dayjs } from "dayjs";
import { useState } from "react";
import patientService from "../../../services/patients";
import {
  HealthCheckRating,
  type Diagnosis,
  type HealthCheckEntry,
} from "../../../types";
import { usePatientDispatch, usePatientValue } from "../../../hooks/usePatient";
import { useVisibilityDispatch } from "../../../hooks/useVisibility";
import { useNotificationReset } from "../../../hooks/useNotification";
import axios from "axios";

const HealthCheckForm = ({
  children,
  diagnoses,
}: {
  children: React.ReactNode;
  diagnoses: Diagnosis[];
}) => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const { reset: dreset, ...description } = useField();
  const { reset: sReset, ...specialist } = useField();
  const { reset: rReset, ...rating } = useField();
  const [codes, setCodes] = useState<string[]>([]);
  const patient = usePatientValue();
  const patientDispatch = usePatientDispatch();
  const visibilityDispatch = useVisibilityDispatch();
  const notificationReset = useNotificationReset();
  const id = patient!.id;
  //   console.log(description.value, date?.format("YYYY-MM-DD"), specialist.value);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const values = event.target.value as string[];
    // console.log(values, codes);
    setCodes(values);
  };

  const handleEntry = async () => {
    if (!date) {
      notificationReset("date can not be null");
      return;
    }
    const rate = Number(rating.value);
    switch (rate) {
      case HealthCheckRating.Healthy:
      case HealthCheckRating.LowRisk:
      case HealthCheckRating.HighRisk:
      case HealthCheckRating.CriticalRisk:
        break;
      default:
        notificationReset(`Value of healthCheckRating incorrect: ${rate}`);
        return;
    }
    const newEntry: Omit<HealthCheckEntry, "id"> = {
      type: "HealthCheck",
      date: date.format("YYYY-MM-DD"),
      specialist: specialist.value,
      description: description.value,
      diagnosisCodes: codes,
      healthCheckRating: rate,
    };

    dreset();
    sReset();
    rReset();
    setDate(null);
    setCodes([]);
    visibilityDispatch({ type: "CHANGE" });

    patientService
      .addEntry(id, newEntry)
      .then((addedEntry) => {
        // console.log("added", addedEntry, patient);
        patient?.entries.push(addedEntry);
        patientDispatch({ type: "SET", payload: { ...patient! } });
      })
      .catch((error) => {
        console.log(error);

        if (axios.isAxiosError(error)) {
          notificationReset(
            error.response?.data.error
              .map(
                (e: { path: string[]; message: string }) =>
                  `${e.path[0]} ${e.message}`
              )
              .join(",")
          );
          return;
        }
        notificationReset(JSON.stringify(error));
      });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography sx={{ fontWeight: "bold" }}>New HealthCheck entry</Typography>
      <TextField
        required
        label="Description"
        variant="standard"
        fullWidth
        {...description}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Date" value={date} onChange={(v) => setDate(v)} />
      </LocalizationProvider>
      <TextField
        required
        label="Specialist"
        variant="standard"
        fullWidth
        {...specialist}
      />
      <TextField
        required
        label="Healthcheck rating"
        variant="standard"
        fullWidth
        {...rating}
      />
      <FormControl>
        <InputLabel id="demo-multiple-name-label">Diagnosis codes</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={codes}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          // MenuProps={MenuProps}
        >
          {diagnoses?.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ButtonGroup sx={{ display: "flex", justifyContent: "space-between" }}>
        {children}{" "}
        <Button
          variant="contained"
          color="inherit"
          type="submit"
          onClick={handleEntry}
        >
          Add
        </Button>
      </ButtonGroup>
    </Box>
  );
};
export default HealthCheckForm;

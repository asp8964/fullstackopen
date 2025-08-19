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
import type { Diagnosis, OccupationalHealthcareEntry } from "../../../types";
import type { Dayjs } from "dayjs";
import { useState } from "react";
import { useField } from "../../../hooks/useField";
import { useNotificationReset } from "../../../hooks/useNotification";
import { useVisibilityDispatch } from "../../../hooks/useVisibility";
import { usePatientDispatch, usePatientValue } from "../../../hooks/usePatient";
import patientService from "../../../services/patients";
import axios from "axios";

const OccupationalHealthcareForm = ({
  children,
  diagnoses,
}: {
  children: React.ReactNode;
  diagnoses: Diagnosis[];
}) => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const { reset: dreset, ...description } = useField();
  const { reset: sReset, ...specialist } = useField();
  const [codes, setCodes] = useState<string[]>([]);

  // const notificationDispatch = useNotificationDispatch();
  const notificationReset = useNotificationReset();
  const visibilityDispatch = useVisibilityDispatch();
  const patient = usePatientValue();
  const patientDispatch = usePatientDispatch();

  const { reset: eReset, ...employee } = useField();
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

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

    const newEntry: Omit<OccupationalHealthcareEntry, "id"> = {
      type: "OccupationalHealthcare",
      date: date.format("YYYY-MM-DD"),
      specialist: specialist.value,
      description: description.value,
      diagnosisCodes: codes,
      employerName: employee.value,
    };
    if (startDate && endDate) {
      newEntry.sickLeave = {
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
      };
    }

    dreset();
    sReset();
    eReset();
    setDate(null);
    setCodes([]);
    setStartDate(null);
    setEndDate(null);
    visibilityDispatch({ type: "CHANGE" });

    patientService
      .addEntry(patient!.id, newEntry)
      .then((addedEntry) => {
        console.log("added", addedEntry, patient);
        patient?.entries.push(addedEntry);
        patientDispatch({ type: "SET", payload: { ...patient! } });
      })
      .catch((error) => {
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
      <Typography sx={{ fontWeight: "bold" }}>New Hospital entry</Typography>
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
      <TextField
        required
        label="Employyee"
        variant="standard"
        fullWidth
        {...employee}
      />

      <Typography>Sick Leave</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", ml: 3, gap: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="start"
            value={startDate}
            onChange={(v) => setStartDate(v)}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="end"
            value={endDate}
            onChange={(v) => setEndDate(v)}
          />
        </LocalizationProvider>
      </Box>
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
export default OccupationalHealthcareForm;

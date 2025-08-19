import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import type { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetail from "./components/PatientDetail";
import diagnosisService from "./services/diagnoses";
import { usePatientDispatch, usePatientValue } from "./hooks/usePatient";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const patient = usePatientValue();
  const patientDispatch = usePatientDispatch();
  // const [patient, setPatient] = useState<Patient | null>(null);
  // const dispatch = usePatientDispatch();

  // console.log(patients);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();

    diagnosisService.getAll().then((data) => setDiagnoses(data));
  }, []);

  const patientMatch = useMatch("/patients/:id");

  useEffect(() => {
    // console.log(patientMatch);
    if (patientMatch && patientMatch.params.id) {
      patientService
        .getById(patientMatch?.params.id)
        .then((data) => patientDispatch({ type: "SET", payload: data }));
    }
  }, [patientDispatch, patientMatch]);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patients/:id"
            element={<PatientDetail patient={patient} diagnoses={diagnoses} />}
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;

import { useContext } from "react";
import PatientContext from "../context/PatientContext";

export const usePatientValue = () => {
  const PatientAndDispatch = useContext(PatientContext);
  if (!PatientAndDispatch) {
    throw new Error("PatientAndDispatch is null");
  }
  return PatientAndDispatch[0];
};

export const usePatientDispatch = () => {
  const PatientAndDispatch = useContext(PatientContext);
  if (!PatientAndDispatch) {
    throw new Error("PatientAndDispatch is null");
  }
  return PatientAndDispatch[1];
};

import { createContext, useReducer } from "react";
import type { Patient } from "../types";

type PatientContextType = [
  Patient | null,
  React.Dispatch<{ type: string; payload: Patient }>
];

const PatientReducer = (
  state: Patient | null,
  action: { type: string; payload: Patient }
) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    default:
      return state;
  }
};

const PatientContext = createContext<PatientContextType | null>(null);

export const PatientContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [patient, patientDispatch] = useReducer(PatientReducer, null);
  return (
    <PatientContext.Provider value={[patient, patientDispatch]}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContext;

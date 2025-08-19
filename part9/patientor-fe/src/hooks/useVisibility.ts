import { useContext } from "react";
import VisibilityContext from "../context/visibilityContext";

export const useVisibilityValue = () => {
  const visibilityAndDispatch = useContext(VisibilityContext);
  if (!visibilityAndDispatch) {
    throw new Error("visibilityAndDispatch is null");
  }
  return visibilityAndDispatch[0];
};

export const useVisibilityDispatch = () => {
  const visibilityAndDispatch = useContext(VisibilityContext);
  if (!visibilityAndDispatch) {
    throw new Error("visibilityAndDispatch is null");
  }
  return visibilityAndDispatch[1];
};

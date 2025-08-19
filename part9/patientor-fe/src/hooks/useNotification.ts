import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

export const useNotificationValue = () => {
  const NotificationAndDispatch = useContext(NotificationContext);
  if (!NotificationAndDispatch) {
    throw new Error("NotificationAndDispatch is null");
  }
  return NotificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const NotificationAndDispatch = useContext(NotificationContext);
  if (!NotificationAndDispatch) {
    throw new Error("PatientAndNotificationAndDispatchDispatch is null");
  }
  return NotificationAndDispatch[1];
};

export const useNotificationReset = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("Notification Context is null");
  }
  const [, dispatch] = context;
  return (text: string) => {
    dispatch({ type: "SET", payload: text });
    setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 5000);
  };
};
